/**
 * widget.ts — Feedback widget client controller（state machine + DOM）。
 *
 * 狀態：closed → form → (auth → [emailSent]) → (nickname) → sending → done|error
 *
 * 設計鐵律（隔離失敗域）：整個 init 包在 try/catch,任何 throw 都 swallow + 退成
 * github-only fallback,永遠不讓 feedback 的錯誤影響主站。lazy auth：先讓讀者打字,
 * 按送出才要求登入。draft 在 OAuth redirect 前存 sessionStorage,回來自動續。
 */
import { iconSvg } from '../../icons/taiwan-icons.mjs';
import type {
  FeedbackBackend,
  FeedbackType,
  FeedbackUser,
  MyFeedbackItem,
  OAuthProvider,
} from './types';
import { getStrings, type FeedbackStrings } from './i18n';
import { createBackend } from './backend';
import { track } from './track';
import {
  resolveBackendKind,
  GITHUB_NEW_ISSUE_URL,
  FEEDBACK_PROVIDERS,
} from '../../config/feedback.mjs';

const DRAFT_KEY = 'twmd_fb_pending_draft';

interface Ctx {
  lang: string;
  slug: string;
  category: string;
  title: string;
  url: string;
  pageKind: string;
}

interface DraftState {
  type: FeedbackType;
  body: string;
  correctInfo: string;
  quote?: string;
}

// OAuth redirect 會把 access_token / refresh_token 留在 URL fragment 或 query
// （2026-06-09 #1141 + 2026-06-16 #1160 兩次洩進 public issue），source_url 只留乾淨路徑。
// triage 端另有 redact + JWT regex gate（triage.test.mjs），這裡是第一道防線。
function sanitizeSourceUrl(href: string): string {
  const base = href.split('#')[0];
  try {
    const u = new URL(base);
    for (const k of [...u.searchParams.keys()]) {
      if (/token|code|auth|secret|session/i.test(k)) u.searchParams.delete(k);
    }
    return u.toString();
  } catch {
    return base;
  }
}

export async function initFeedbackWidget(): Promise<void> {
  try {
    const root = document.getElementById('twmd-feedback');
    if (!root) return;

    // OG / spore 截圖模式（?shot=1）不顯示 widget。
    if (document.documentElement.getAttribute('data-shot') === '1') {
      root.remove();
      return;
    }

    const kind = resolveBackendKind();
    if (kind === 'off') {
      root.remove();
      return;
    }

    const ctx: Ctx = {
      lang: root.dataset.lang || 'zh-TW',
      slug: root.dataset.slug || '',
      category: root.dataset.category || '',
      title: root.dataset.title || '',
      url: sanitizeSourceUrl(root.dataset.url || location.href),
      pageKind: root.dataset.pagekind || 'other',
    };
    const t = getStrings(ctx.lang);

    // github-only：純靜態,按鈕直接連 GitHub issue chooser,不載 backend。
    if (kind === 'github-only') {
      track('degraded', { reason: 'github-only' });
      renderGithubOnlyButton(root, t);
      return;
    }

    // mock / supabase：完整 widget。
    const widget = new Widget(root, ctx, t);
    widget.mount();

    // 文章頁特化：選字 → 浮藥丸 → 開 widget 帶 quote + 深連結 anchor。
    if (ctx.pageKind === 'article') {
      const { initSelectionAnnotation } = await import('./selection');
      initSelectionAnnotation(
        '[data-pagefind-body]',
        t.selectPill,
        ({ quote, anchorUrl }) => widget.openWithSelection(quote, anchorUrl),
      );
    }
  } catch (err) {
    // 任何意外 → 確保主站不受影響。
    console.warn('[feedback] init failed, hidden:', err);
  }
}

function renderGithubOnlyButton(root: HTMLElement, t: FeedbackStrings): void {
  root.innerHTML = '';
  const a = document.createElement('a');
  a.className = 'twmd-fb-fab';
  a.href = GITHUB_NEW_ISSUE_URL;
  a.target = '_blank';
  a.rel = 'noopener';
  a.textContent = '';
  a.insertAdjacentHTML('afterbegin', iconSvg('dna'));
  a.append(' ' + t.open);
  a.setAttribute('aria-label', t.open);
  root.appendChild(a);
}

class Widget {
  private backend: FeedbackBackend | null = null;
  private backendLoading = false;
  private user: FeedbackUser | null = null;
  private draft: DraftState = { type: 'content', body: '', correctInfo: '' };
  private panel!: HTMLElement;
  private open = false;
  /** 選文段標註（article 頁）。設了 → 表單顯示 quote，送出用 anchorUrl 當 source。 */
  private selection: { quote: string; anchorUrl: string } | null = null;
  /** 本 session 登入方式（GA submit 事件用）。 */
  private loginMethod = '';

  constructor(
    private root: HTMLElement,
    private ctx: Ctx,
    private t: FeedbackStrings,
  ) {
    this.draft.type = this.categoriesForPage()[0];
  }

  /** 依頁型決定類別集（順序 = 顯示順序，第一個 = 預設）。 */
  private categoriesForPage(): FeedbackType[] {
    switch (this.ctx.pageKind) {
      case 'article':
        return ['content', 'bug', 'newtopic'];
      case 'category':
        return ['newtopic', 'bug', 'idea'];
      case 'home':
        return ['newtopic', 'bug', 'idea'];
      case 'dashboard':
        return ['bug', 'idea'];
      case 'semiont':
        return ['idea', 'bug'];
      default:
        return ['idea', 'bug', 'newtopic'];
    }
  }

  private labelFor(type: FeedbackType): string {
    const s = this.t;
    if (type === 'newtopic' && this.ctx.pageKind === 'category')
      return s.typeNewArticle;
    return {
      content: s.typeContent,
      bug: s.typeBug,
      newtopic: s.typeNewtopic,
      idea: s.typeIdea,
    }[type];
  }

  private hintFor(type: FeedbackType): string {
    const s = this.t;
    if (type === 'newtopic' && this.ctx.pageKind === 'category')
      return s.typeNewArticleHint;
    return {
      content: s.typeContentHint,
      bug: s.typeBugHint,
      newtopic: s.typeNewtopicHint,
      idea: s.typeIdeaHint,
    }[type];
  }

  /** 選文段觸發：開面板 + 預填 content + quote + 深連結。 */
  openWithSelection(quote: string, anchorUrl: string): void {
    track('selection_pill', { page_kind: this.ctx.pageKind });
    track('open', { source: 'selection', page_kind: this.ctx.pageKind });
    this.selection = { quote, anchorUrl };
    this.draft = { type: 'content', body: '', correctInfo: '', quote };
    this.open = true;
    this.panel.hidden = false;
    this.ensureBackend();
    this.renderForm();
  }

  mount(): void {
    this.root.innerHTML = '';
    const fab = document.createElement('button');
    fab.type = 'button';
    fab.className = 'twmd-fb-fab';
    fab.textContent = '';
    fab.insertAdjacentHTML('afterbegin', iconSvg('dna'));
    fab.append(' ' + this.t.open);
    fab.setAttribute('aria-haspopup', 'dialog');
    fab.setAttribute('aria-label', this.t.open);
    fab.addEventListener('click', () => this.toggle());
    this.root.appendChild(fab);

    this.panel = document.createElement('div');
    this.panel.className = 'twmd-fb-panel';
    this.panel.setAttribute('role', 'dialog');
    this.panel.setAttribute('aria-modal', 'false');
    this.panel.setAttribute('aria-label', this.t.title);
    this.panel.hidden = true;
    this.root.appendChild(this.panel);

    // OAuth redirect 回來：有 pending draft → 自動續。
    this.resumeIfReturning();
  }

  private async ensureBackend(): Promise<FeedbackBackend | null> {
    if (this.backend || this.backendLoading) return this.backend;
    this.backendLoading = true;
    this.backend = await createBackend();
    this.backendLoading = false;
    if (this.backend) {
      try {
        this.user = await this.backend.currentUser();
      } catch {
        this.user = null;
      }
    }
    return this.backend;
  }

  private async resumeIfReturning(): Promise<void> {
    const raw = sessionStorage.getItem(DRAFT_KEY);
    if (!raw) return;
    await this.ensureBackend();
    if (!this.user) return; // 還沒登入成功,等使用者再點
    try {
      this.draft = JSON.parse(raw);
    } catch {
      sessionStorage.removeItem(DRAFT_KEY);
      return;
    }
    sessionStorage.removeItem(DRAFT_KEY);
    this.open = true;
    this.panel.hidden = false;
    this.afterAuth();
  }

  private async toggle(): Promise<void> {
    this.open = !this.open;
    this.panel.hidden = !this.open;
    if (this.open) {
      this.selection = null; // FAB 開啟 = 一般回饋（非選文段）
      track('open', { source: 'fab', page_kind: this.ctx.pageKind });
      this.renderForm(); // 先畫，避免等待
      await this.ensureBackend(); // 取回 this.user
      if (this.open) this.renderForm(); // 登入態確定後重畫（顯示「我的回報」入口）
    }
  }

  private close(): void {
    this.open = false;
    this.panel.hidden = true;
  }

  // ── render helpers ────────────────────────────────────────────────────────
  private header(title: string): string {
    return `<div class="twmd-fb-head"><strong>${esc(title)}</strong>
      <button type="button" class="twmd-fb-x" aria-label="${esc(this.t.close)}">×</button></div>`;
  }

  private wireClose(): void {
    this.panel
      .querySelector('.twmd-fb-x')
      ?.addEventListener('click', () => this.close());
  }

  private renderForm(): void {
    const t = this.t;
    const cats = this.categoriesForPage();
    const quoteBlock = this.selection
      ? `<div class="twmd-fb-quote"><span class="twmd-fb-quote-label">${esc(t.quoteLabel)}</span><blockquote>${esc(this.selection.quote)}</blockquote></div>`
      : '';
    this.panel.innerHTML =
      this.header(t.title) +
      `<div class="twmd-fb-body">
        <p class="twmd-fb-intro">${esc(t.intro)}</p>
        ${this.user ? `<button type="button" class="twmd-fb-link twmd-fb-mine-entry" data-mine>${esc(t.myFeedback)} →</button>` : ''}
        ${this.ctx.title ? `<p class="twmd-fb-about">${esc(t.about)} ${esc(this.ctx.title)}</p>` : ''}
        ${quoteBlock}
        <div class="twmd-fb-chips" role="radiogroup">
          ${cats
            .map(
              (val) =>
                `<button type="button" class="twmd-fb-chip${this.draft.type === val ? ' is-on' : ''}" data-type="${val}" role="radio" aria-checked="${this.draft.type === val}" title="${esc(this.hintFor(val))}">${esc(this.labelFor(val))}</button>`,
            )
            .join('')}
        </div>
        <p class="twmd-fb-hint" data-hint></p>
        <textarea class="twmd-fb-textarea" data-body placeholder="${esc(t.bodyPlaceholder)}">${esc(this.draft.body)}</textarea>
        <div data-correct hidden>
          <label class="twmd-fb-label">${esc(t.correctInfoLabel)}</label>
          <textarea class="twmd-fb-textarea twmd-fb-textarea--sm" data-correctinfo placeholder="${esc(t.correctInfoPlaceholder)}">${esc(this.draft.correctInfo)}</textarea>
        </div>
        <button type="button" class="twmd-fb-primary" data-submit disabled>${esc(t.submit)}</button>
      </div>`;
    this.wireClose();
    this.panel
      .querySelector('[data-mine]')
      ?.addEventListener('click', () => this.renderMyFeedback());

    const hintEl = this.panel.querySelector('[data-hint]') as HTMLElement;
    const bodyEl = this.panel.querySelector(
      '[data-body]',
    ) as HTMLTextAreaElement;
    const correctWrap = this.panel.querySelector(
      '[data-correct]',
    ) as HTMLElement;
    const correctEl = this.panel.querySelector(
      '[data-correctinfo]',
    ) as HTMLTextAreaElement;
    const submit = this.panel.querySelector(
      '[data-submit]',
    ) as HTMLButtonElement;

    const syncType = () => {
      hintEl.textContent = this.hintFor(this.draft.type);
      correctWrap.hidden = this.draft.type !== 'content';
    };
    const syncSubmit = () => {
      submit.disabled = bodyEl.value.trim().length < 4;
    };
    syncType();
    syncSubmit();

    this.panel.querySelectorAll('.twmd-fb-chip').forEach((c) =>
      c.addEventListener('click', () => {
        this.draft.type = (c as HTMLElement).dataset.type as FeedbackType;
        track('type_select', {
          type: this.draft.type,
          page_kind: this.ctx.pageKind,
        });
        this.panel.querySelectorAll('.twmd-fb-chip').forEach((x) => {
          const on = x === c;
          x.classList.toggle('is-on', on);
          x.setAttribute('aria-checked', String(on));
        });
        syncType();
      }),
    );
    bodyEl.addEventListener('input', () => {
      this.draft.body = bodyEl.value;
      syncSubmit();
    });
    correctEl.addEventListener('input', () => {
      this.draft.correctInfo = correctEl.value;
    });
    submit.addEventListener('click', () => this.onSubmit());
  }

  /** v3：「我的回報」列表（狀態 + issue 連結 + AI 初判理由）。 */
  private async renderMyFeedback(): Promise<void> {
    const t = this.t;
    track('my_view', {});
    this.panel.innerHTML =
      this.header(t.myFeedback) +
      `<div class="twmd-fb-body"><div class="twmd-fb-spin" aria-hidden="true"></div></div>`;
    this.wireClose();
    let items: MyFeedbackItem[] = [];
    try {
      items = (await this.backend?.myFeedback()) || [];
    } catch {
      items = [];
    }
    const statusLabel = (s: string) =>
      s === 'filed'
        ? t.statusFiled
        : s === 'rejected'
          ? t.statusRejected
          : t.statusNew;
    const clip = (s: string) => (s.length > 120 ? s.slice(0, 119) + '…' : s);
    const list = items.length
      ? items
          .map(
            (it) =>
              `<div class="twmd-fb-mineitem">
                <div class="twmd-fb-minehead">
                  <span class="twmd-fb-minetype">${esc(this.labelFor(it.type))}</span>
                  <span class="twmd-fb-minestatus twmd-fb-st-${esc(it.status)}">${esc(statusLabel(it.status))}</span>
                </div>
                <div class="twmd-fb-minebody">${esc(clip(it.body || ''))}</div>
                ${it.triageNote ? `<div class="twmd-fb-minenote"><strong>${esc(t.triageNoteLabel)}</strong> ${esc(it.triageNote)}</div>` : ''}
                ${it.issueUrl ? `<a class="twmd-fb-link" href="${esc(it.issueUrl)}" target="_blank" rel="noopener">${esc(t.viewIssue)}${it.issueNumber ? ' #' + it.issueNumber : ''} →</a>` : ''}
              </div>`,
          )
          .join('')
      : `<p class="twmd-fb-intro">${esc(t.myFeedbackEmpty)}</p>`;
    this.panel.innerHTML =
      this.header(t.myFeedback) +
      `<div class="twmd-fb-body">
        ${list}
        <button type="button" class="twmd-fb-link" data-back>← ${esc(t.back)}</button>
      </div>`;
    this.wireClose();
    this.panel
      .querySelector('[data-back]')
      ?.addEventListener('click', () => this.renderForm());
  }

  private async onSubmit(): Promise<void> {
    await this.ensureBackend();
    if (!this.backend) return this.renderError();
    if (!this.user) return this.renderAuth();
    if (this.user.needsNickname) return this.renderNickname();
    return this.doSubmit();
  }

  private renderAuth(): void {
    const t = this.t;
    const oauthProviders = FEEDBACK_PROVIDERS.filter(
      (p: string) => p === 'google' || p === 'github',
    ) as OAuthProvider[];
    const hasEmail = FEEDBACK_PROVIDERS.includes('email');
    const labels: Record<OAuthProvider, string> = {
      google: t.google,
      github: t.github,
    };
    const marks: Record<OAuthProvider, string> = { google: 'G', github: '' };
    const oauthBtns = oauthProviders
      .map(
        (p) =>
          `<button type="button" class="twmd-fb-primary twmd-fb-oauth twmd-fb-oauth--${p}" data-oauth="${p}">
            <span class="twmd-fb-oauth-mark" aria-hidden="true">${marks[p]}</span> ${esc(labels[p])}
          </button>`,
      )
      .join('');
    const emailBlock = hasEmail
      ? `<div class="twmd-fb-or"><span></span></div>
        <input type="email" class="twmd-fb-input" data-email placeholder="${esc(t.emailPlaceholder)}" autocomplete="email" />
        <button type="button" class="twmd-fb-secondary" data-emailbtn>${esc(t.emailSend)}</button>`
      : '';
    this.panel.innerHTML =
      this.header(t.authTitle) +
      `<div class="twmd-fb-body">
        <p class="twmd-fb-intro">${esc(t.authIntro)}</p>
        ${oauthBtns}
        ${emailBlock}
        <p class="twmd-fb-msg" data-msg hidden></p>
        <button type="button" class="twmd-fb-link" data-back>← ${esc(t.back)}</button>
      </div>`;
    this.wireClose();
    this.panel
      .querySelector('[data-back]')
      ?.addEventListener('click', () => this.renderForm());

    this.panel.querySelectorAll('[data-oauth]').forEach((btn) =>
      btn.addEventListener('click', async () => {
        const provider = (btn as HTMLElement).dataset.oauth as OAuthProvider;
        this.loginMethod = provider;
        track('login', { provider, page_kind: this.ctx.pageKind });
        this.stashDraft();
        try {
          await this.backend!.signInWithOAuth(provider);
          // supabase 會 redirect 離開；mock 不會 → 直接續。
          await this.afterMaybeInlineLogin();
        } catch (e) {
          this.showMsg(this.t.errorBody);
        }
      }),
    );

    if (hasEmail) {
      const emailInput = this.panel.querySelector(
        '[data-email]',
      ) as HTMLInputElement;
      this.panel
        .querySelector('[data-emailbtn]')
        ?.addEventListener('click', async () => {
          const email = emailInput.value.trim();
          if (!/.+@.+\..+/.test(email)) {
            this.showMsg(this.t.emailPlaceholder);
            return;
          }
          this.loginMethod = 'email';
          track('login', { provider: 'email', page_kind: this.ctx.pageKind });
          this.stashDraft();
          try {
            const { sent } = await this.backend!.signInWithEmail(email);
            if (sent) {
              this.showMsg(this.t.emailSent); // 等使用者去收信點連結
            } else {
              await this.afterMaybeInlineLogin(); // mock：已登入,續
            }
          } catch (e) {
            this.showMsg(this.t.errorBody);
          }
        });
    }
  }

  private async afterMaybeInlineLogin(): Promise<void> {
    try {
      this.user = await this.backend!.currentUser();
    } catch {
      this.user = null;
    }
    if (this.user) {
      sessionStorage.removeItem(DRAFT_KEY);
      this.afterAuth();
    }
  }

  private afterAuth(): void {
    if (this.user?.needsNickname) this.renderNickname();
    else this.doSubmit();
  }

  private renderNickname(): void {
    const t = this.t;
    this.panel.innerHTML =
      this.header(t.nicknameTitle) +
      `<div class="twmd-fb-body">
        <p class="twmd-fb-intro">${esc(t.nicknameHint)}</p>
        <input type="text" class="twmd-fb-input" data-nick maxlength="40" placeholder="${esc(t.nicknamePlaceholder)}" />
        <button type="button" class="twmd-fb-primary" data-nickok>${esc(t.submit)}</button>
      </div>`;
    this.wireClose();
    const nick = this.panel.querySelector('[data-nick]') as HTMLInputElement;
    this.panel
      .querySelector('[data-nickok]')
      ?.addEventListener('click', async () => {
        try {
          this.user = await this.backend!.saveNickname(nick.value);
        } catch {
          /* 存暱稱失敗不擋送出 */
        }
        this.doSubmit();
      });
  }

  private async doSubmit(): Promise<void> {
    const t = this.t;
    this.panel.innerHTML =
      this.header(t.title) +
      `<div class="twmd-fb-body"><p class="twmd-fb-intro">${esc(t.sending)}</p><div class="twmd-fb-spin" aria-hidden="true"></div></div>`;
    try {
      await this.backend!.submit({
        type: this.draft.type,
        body: this.draft.body,
        correctInfo:
          this.draft.type === 'content' ? this.draft.correctInfo : undefined,
        articleSlug: this.ctx.slug,
        articleTitle: this.ctx.title,
        category: this.ctx.category,
        lang: this.ctx.lang,
        // 選文段：用 W3C text-fragment 深連結當 source，維護者一點直達高亮。
        sourceUrl: this.selection ? this.selection.anchorUrl : this.ctx.url,
        quote: this.selection?.quote || this.draft.quote,
        pageKind: this.ctx.pageKind,
      });
      track('submit', {
        type: this.draft.type,
        page_kind: this.ctx.pageKind,
        has_quote: !!this.selection,
        login_method: this.loginMethod || 'session',
      });
      this.renderDone();
    } catch (e) {
      console.warn('[feedback] submit failed:', e);
      this.renderError();
    }
  }

  private renderDone(): void {
    const t = this.t;
    this.panel.innerHTML =
      this.header(t.doneTitle) +
      `<div class="twmd-fb-body twmd-fb-done">
        <p class="twmd-fb-bigemoji" aria-hidden="true">${iconSvg('dna')}</p>
        <p class="twmd-fb-intro">${esc(t.doneBody)}</p>
        <button type="button" class="twmd-fb-secondary" data-close2>${esc(t.close)}</button>
      </div>`;
    this.wireClose();
    this.panel
      .querySelector('[data-close2]')
      ?.addEventListener('click', () => this.close());
    // reset so再次開啟是乾淨的
    this.selection = null;
    this.draft = {
      type: this.categoriesForPage()[0],
      body: '',
      correctInfo: '',
    };
  }

  private renderError(): void {
    const t = this.t;
    track('degraded', { reason: 'submit-error' });
    this.panel.innerHTML =
      this.header(t.title) +
      `<div class="twmd-fb-body">
        <p class="twmd-fb-intro">${esc(t.errorBody)}</p>
        <a class="twmd-fb-primary" href="${GITHUB_NEW_ISSUE_URL}" target="_blank" rel="noopener">${esc(t.fallbackCta)}</a>
      </div>`;
    this.wireClose();
  }

  private stashDraft(): void {
    try {
      sessionStorage.setItem(DRAFT_KEY, JSON.stringify(this.draft));
    } catch {
      /* ignore */
    }
  }

  private showMsg(msg: string): void {
    const el = this.panel.querySelector('[data-msg]') as HTMLElement | null;
    if (el) {
      el.textContent = msg;
      el.hidden = false;
    }
  }
}

function esc(s: string): string {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
