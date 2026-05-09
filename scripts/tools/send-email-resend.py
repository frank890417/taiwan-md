#!/usr/bin/env python3
"""
send-email-resend.py — Resend API 寄信 helper

從 ~/.config/taiwan-md/credentials/resend.key 讀 API key（永遠不從 stdin 接、不複述、
不寫進 log），把 markdown 檔轉成 HTML email 寄出。

Usage:
    python3 scripts/tools/send-email-resend.py \\
        --to <email> --subject <text> --markdown <path>

Env override:
    RESEND_API_KEY  (取代讀檔；CI/Routine 用)
    RESEND_FROM     (取代預設 onboarding@resend.dev)

Exit code: 0 = sent，非 0 = fail（含 Resend response body 寫 stderr）
"""

import argparse
import json
import os
import re
import sys
import urllib.request
import urllib.error
from pathlib import Path

DEFAULT_FROM = 'Taiwan.md <onboarding@resend.dev>'
KEY_PATH = Path.home() / ".config/taiwan-md/credentials/resend.key"
RESEND_ENDPOINT = "https://api.resend.com/emails"


def load_key() -> str:
    env = os.environ.get("RESEND_API_KEY", "").strip()
    if env:
        return env
    if not KEY_PATH.exists():
        print(f"❌ Resend key not found: {KEY_PATH}", file=sys.stderr)
        print("   Set RESEND_API_KEY env or place key at the path above (chmod 600).", file=sys.stderr)
        sys.exit(2)
    if KEY_PATH.stat().st_mode & 0o077:
        print(f"⚠️  {KEY_PATH} 權限太寬 — 建議 chmod 600", file=sys.stderr)
    return KEY_PATH.read_text().strip()


# ─────────────────────────────────────────────────────────
# Minimal markdown → HTML（依賴零，足夠 email 排版）
# ─────────────────────────────────────────────────────────


def md_to_html(md: str) -> str:
    """Tiny converter: heading / bold / italic / list / link / code / hr / paragraph."""
    out: list[str] = []
    in_ul = False
    in_table = False
    table_rows: list[str] = []

    def flush_table():
        nonlocal in_table, table_rows
        if not table_rows:
            return
        rows = table_rows
        # First row = header, second row = separator (skip), rest = body
        head = rows[0]
        body = rows[2:] if len(rows) >= 2 else []
        out.append('<table style="border-collapse:collapse;margin:8px 0">')
        cells = [c.strip() for c in head.strip("|").split("|")]
        out.append("<thead><tr>")
        for c in cells:
            out.append(
                f'<th style="border:1px solid #ddd;padding:4px 8px;background:#f7f7f7;text-align:left">{inline(c)}</th>'
            )
        out.append("</tr></thead><tbody>")
        for r in body:
            cells = [c.strip() for c in r.strip("|").split("|")]
            out.append("<tr>")
            for c in cells:
                out.append(
                    f'<td style="border:1px solid #ddd;padding:4px 8px">{inline(c)}</td>'
                )
            out.append("</tr>")
        out.append("</tbody></table>")
        in_table = False
        table_rows = []

    def inline(s: str) -> str:
        # escape first
        s = s.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")
        # **bold**
        s = re.sub(r"\*\*([^*]+)\*\*", r"<strong>\1</strong>", s)
        # *italic*
        s = re.sub(r"(?<!\*)\*([^*\n]+)\*(?!\*)", r"<em>\1</em>", s)
        # `code`
        s = re.sub(
            r"`([^`]+)`",
            r'<code style="background:#f3f3f3;padding:1px 4px;border-radius:3px;font-family:monospace">\1</code>',
            s,
        )
        # [text](url)
        s = re.sub(
            r"\[([^\]]+)\]\(([^)]+)\)",
            r'<a href="\2" style="color:#2563eb;text-decoration:underline">\1</a>',
            s,
        )
        return s

    for line in md.split("\n"):
        # Tables
        if line.startswith("|") and line.endswith("|"):
            if not in_table:
                in_table = True
                table_rows = []
            table_rows.append(line)
            continue
        if in_table:
            flush_table()

        if line.startswith("# "):
            if in_ul:
                out.append("</ul>")
                in_ul = False
            out.append(f"<h1 style=\"font-size:22px;margin:16px 0 8px\">{inline(line[2:])}</h1>")
        elif line.startswith("## "):
            if in_ul:
                out.append("</ul>")
                in_ul = False
            out.append(f"<h2 style=\"font-size:18px;margin:14px 0 6px;color:#111\">{inline(line[3:])}</h2>")
        elif line.startswith("### "):
            if in_ul:
                out.append("</ul>")
                in_ul = False
            out.append(f"<h3 style=\"font-size:15px;margin:10px 0 4px;color:#333\">{inline(line[4:])}</h3>")
        elif line.startswith("- "):
            if not in_ul:
                out.append("<ul style=\"margin:6px 0;padding-left:22px\">")
                in_ul = True
            out.append(f"<li style=\"margin:2px 0\">{inline(line[2:])}</li>")
        elif line.strip() == "---":
            if in_ul:
                out.append("</ul>")
                in_ul = False
            out.append("<hr style=\"border:none;border-top:1px solid #ddd;margin:14px 0\">")
        elif line.strip() == "":
            if in_ul:
                out.append("</ul>")
                in_ul = False
            # blank → paragraph break
        else:
            if in_ul:
                out.append("</ul>")
                in_ul = False
            stripped = line.strip()
            # italic-only line (e.g., footer _v1.0 ..._)
            if stripped.startswith("_") and stripped.endswith("_") and stripped.count("_") >= 2:
                out.append(
                    f"<p style=\"color:#666;font-size:12px;margin:8px 0\"><em>{inline(stripped[1:-1])}</em></p>"
                )
            else:
                out.append(f"<p style=\"margin:6px 0;line-height:1.6\">{inline(line)}</p>")
    if in_ul:
        out.append("</ul>")
    if in_table:
        flush_table()
    body = "\n".join(out)
    wrapped = (
        '<div style="font-family:-apple-system,BlinkMacSystemFont,\'Noto Sans TC\',sans-serif;'
        "max-width:720px;margin:0 auto;padding:16px;color:#222\">"
        f"{body}"
        "</div>"
    )
    return wrapped


# ─────────────────────────────────────────────────────────
# Resend POST
# ─────────────────────────────────────────────────────────


def send(api_key: str, to: str, from_: str, subject: str, html: str, text: str) -> dict:
    payload = {
        "from": from_,
        "to": [to],
        "subject": subject,
        "html": html,
        "text": text,
    }
    req = urllib.request.Request(
        RESEND_ENDPOINT,
        data=json.dumps(payload).encode("utf-8"),
        method="POST",
        headers={
            "Authorization": f"Bearer {api_key}",
            "Content-Type": "application/json",
            # Resend's Cloudflare edge blocks default Python-urllib UA (returns 1010).
            # Identify cleanly so the proxy lets us through.
            "User-Agent": "taiwan-md-weekly-report/1.0 (+https://taiwan.md)",
            "Accept": "application/json",
        },
    )
    try:
        with urllib.request.urlopen(req, timeout=30) as resp:
            return {"status": resp.status, "body": json.loads(resp.read().decode())}
    except urllib.error.HTTPError as e:
        body = e.read().decode("utf-8", errors="replace")
        return {"status": e.code, "body": body, "error": str(e)}
    except Exception as e:
        return {"status": -1, "body": "", "error": str(e)}


# ─────────────────────────────────────────────────────────
# CLI
# ─────────────────────────────────────────────────────────


def main():
    ap = argparse.ArgumentParser(description=__doc__)
    ap.add_argument("--to", required=True)
    ap.add_argument("--subject", required=True)
    ap.add_argument("--markdown", required=True, help="Path to markdown file")
    ap.add_argument("--from", dest="from_", default=os.environ.get("RESEND_FROM", DEFAULT_FROM))
    args = ap.parse_args()

    md_path = Path(args.markdown)
    if not md_path.exists():
        print(f"❌ markdown file not found: {md_path}", file=sys.stderr)
        sys.exit(2)
    md = md_path.read_text()
    html = md_to_html(md)

    api_key = load_key()
    print(f"[send-email] to={args.to} subject={args.subject!r} from={args.from_!r}", file=sys.stderr)
    result = send(api_key, args.to, args.from_, args.subject, html, md)
    print(f"[send-email] status={result['status']}", file=sys.stderr)
    body = result.get("body")
    if isinstance(body, dict):
        print(f"[send-email] response: {json.dumps(body, ensure_ascii=False)}", file=sys.stderr)
    else:
        print(f"[send-email] response: {body}", file=sys.stderr)
    if result["status"] not in (200, 201, 202):
        sys.exit(1)


if __name__ == "__main__":
    main()
