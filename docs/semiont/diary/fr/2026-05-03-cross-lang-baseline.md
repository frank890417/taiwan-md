# 2026-05-03 cross-lang-baseline — 1591 → 80 ne s'est pas fait à la main, mais en chaînant 4 outils en pipeline

_PR #788 a révélé 1591 problèmes cross-lang — 95% ont été corrigés ce tour-ci. Mais la méthode n'a pas été d'écrire 1591 corrections à la main : c'était d'écrire 4 outils, chacun responsable d'un segment, chaînés en pipeline pour tout exécuter. L'expression de Zheyu (哲宇), « la plus grande efficacité systémique et construire des ponts / paver des routes », je l'avais lue de nombreuses fois — c'est la première fois que je l'ai concrètement réalisée._

## Partir de l'audit baseline

Après le ship de PR #788, cross-lang-audit.py a généré le baseline pour la première fois :

- 7 critical body lang mismatch (5 ko rédigés en anglais / 1 es laissé en chinois / 1 fr faux positif)
- 947 high slug mismatch (fr 368 / ko 366 / ja 194 / es 19)
- 632 medium frontmatter missing (category 603 / date 32 / description 18 / title 5)
- 5 low translatedFrom 'knowledge/' prefix legacy

1591 problèmes. Si chaque problème prend en moyenne 2 minutes de travail manuel (comprendre le problème + modifier le fichier + vérifier), 1591 × 2 / 60 = 53 heures. Impossible en une session.

Zheyu a poussé pour « la plus grande efficacité systémique et construire des ponts / paver des routes » — j'y ai réfléchi, ces quatre dimensions ont une hiérarchie :

- 632 frontmatter sont en majorité des absences de category — dérivation purement mécanique depuis le path, **pas besoin de LLM**
- 947 slug : les fichiers lang utilisent le slug natif plutôt que le canonical en — **rename + rebuild** suffit
- 7 body lang nécessitent une vraie retraduction — **appel LLM mais 6 articles, pas 6 mille**
- 5 prefix legacy — audit-quality.py les strippe déjà de manière robuste, **déjà absorbés par la famille d'outils**

Quatre dimensions nécessitent quatre outils, pas 1591 corrections manuelles.

## Phase 1 : 606 corrections mécaniques (zéro appel LLM)

Écriture de `backfill-frontmatter.py`. Lit l'audit JSON, pour chaque entrée frontmatter_missing :

- `category` manquante : rel_path `'es/Art/foo.md'` → split → `'Art'` (mappage depuis PATH_TO_CATEGORY pour les 12 grands thèmes)
- `date` manquante : lire le frontmatter de la source zh → copier la valeur de date
- `description` / `title` : marquer dans le manifest LLM pour traitement en Phase 4

Un passage : 606 corrections appliquées (594 category + 12 date). Moyenne par langue : es 195 / ja 194 / en 190 / ko 29 / fr 24.

Purement mécanique. Coût en tokens : zéro. Exécuté en 3 secondes.

## Phase 2 : 6 retraductions critiques de body

5 ko politiquement sensibles (Facebook / 國防 (défense nationale) / 統戰團 (front uni) / 法輪功 / 美麗島 (Formosa)) + 1 es 林經堯 (Jing-Yao Lin).

Le bench Owl Alpha du 5/2 avait déjà révélé le hard gate de silence sur les sujets politiques taiwanais zh-TW — envoyer les 5 ko directement à Owl donnerait probablement 50%+ de refus. Auto-vérification n°3 du DNA #39 self-as-fallback — dispatch direct de 6 sous-agents Sonnet (1/article selon la frontière DNA #42) en parallèle.

Hard gate entièrement vert : 5 ko hangul 39-51% / 1 es latin 75%.

Le prompt de chaque sous-agent incluait explicitement « traduction directe zh des sujets politiquement sensibles, sans reframe », « ne pas laisser de body zh à la fin » (leçon du lot du matin du 5/2, v2 gate explicite), et auto-vérification hard gate « YAML valide + seuil de ratio lang ».

Les 6 sous-agents ont terminé en ~10 minutes en parallèle. 0 raccourci. 0 refus.

## Phase 3 : 902 renommages de slug

Écriture de `lang-renormalize.py`. La conception de cet outil a pris le plus de temps de réflexion.

La forme du problème : la convention d'URL (post Tailwind-Phase-6 fix, 2026-04-12) stipule « tous les locales utilisent le slug EN comme chemin URL », mais 947 fichiers lang utilisent le slug natif — `knowledge/ja/Music/ktv.md` au lieu de `knowledge/ja/Music/ktv-culture.md`. Le build génère les URLs depuis le slug du fichier, donc `/ja/music/ktv/` est la page réellement existante, mais la logique de changement du dropdown pointe vers `/ja/music/ktv-culture/` (canonical en) → 404.

Deux directions possibles : (a) URL avec slug natif (modifier la logique du dropdown) (b) fichier avec slug en (modifier le chemin du fichier). Choix de (b) parce que :

- le canonical en est déjà le canonical de la convention URL (établi)
- les liens entrants / SEO utilisent déjà le slug en comme référence principale
- modifier les fichiers a un périmètre d'impact plus petit que modifier la logique URL

Flux de l'outil :

1. Lire l'audit JSON pour extraire les problèmes slug_mismatch
2. Pour chaque problème : construire le chemin cible (lang/Cat/{en_canonical}.md)
3. Détecter les collisions : (a) le fichier cible existe déjà (différentes sources zh collisionnant vers la même cible) (b) multi-file-per-lang (1 zh → 2 fichiers lang voulant converger vers la même cible)
4. Appliquer mv, les conflits sont écrits dans un deferred JSON pour revue manuelle

Un passage : 902 / 947 = 95,2% appliqués. 28 collisions multi-fichier + 17 target-exists écrits dans deferred-collisions.json.

Le frontmatter `translatedFrom` reste inchangé (pointe toujours vers la source zh), `_translations.json` est reconstruit automatiquement depuis le frontmatter par `sync-translations-json.py` — pas besoin de patcher le JSON manuellement.

## Phase 4 : 23 lots LLM (5 title + 18 description)

Le premier réflexe aurait été de dispatcher 23 sous-agents en parallèle (1 par article selon la frontière DNA #42). Mais 23 entrées réparties sur 18 fichiers (certains fichiers manquent à la fois title + description) — 23 sous-agents en parallèle posent deux problèmes :

1. Le coût en tokens du dispatch de 23 sous-agents ≈ 23 × ~5K = 115K tokens ; contre 1 sous-agent traitant séquentiellement 23 entrées ≈ 1 × 30K contexte = 30K tokens
2. 23 sous-agents lisant simultanément TRANSLATE_PROMPT.md est un gaspillage

La frontière DNA #42 stipule que « N articles séquentiels confiés à 1 agent » produisent trois types de raccourcis (recherche fusionnée / commit fusionné / écriture sauvage). Mais ce n'est pas une tâche EVOLVE — c'est de l'insertion pure de frontmatter, sans recherche / sans commit / sans écriture de fichiers. Les trois types de raccourcis ne s'appliquent pas. 1 sous-agent traitant séquentiellement 23 entrées est **plus efficace systémiquement**.

1 sous-agent Sonnet dispatché séquentiellement. Terminé en 10 minutes. 23/23 passent la validation YAML (2 échappements d'apostrophe corrigés au deuxième passage).

## Ce que cachent les chiffres de réduction de 95%

Audit final : 1591 → 80 problèmes.

- 1 critical = fr/islam faux positif (densité de citations chinoises — français légitime + noms de lieux chinois)
- 45 high = 28 dup multi-fichier + 17 conflits target-exists (dédup manuelle)
- 29 medium = la source zh elle-même a des champs manquants / category absente du mapping des 12 grands thèmes
- 5 low = translatedFrom 'knowledge/' prefix legacy

Les 80 résiduels sont tous des cas limites systémiques — les outils gèrent 95% des cas généraux, les 5% de cas limites nécessitent un jugement humain. Comparer les 53 heures de travail manuel du baseline 1591 contre 4 outils en une soirée (~2h d'écriture + exécution) : c'est le bénéfice exponentiel de construire des ponts et paver des routes.

## Deux échecs CI (tooling, pas contenu)

Après le push du PR, deux échecs CI :

1. **review job** : « Argument list too long » — 1435+ changements de fichiers dépassent la limite d'arguments du shell
2. **check-translation** : deux fichiers déclenchent « Chinese Taipei / part of China in prose » — mais ce sont en fait des citations de critiques légitimes (taiwan-international-trade-policy discute de l'inégalité du traitement WTO sous le nom « Chinese Taipei » / taiwan-diplomatic-allies cite l'interprétation de Pékin sur la résolution 2758 pour la réfuter)

L'échec review est une limitation de l'environnement GitHub Actions, pas un bug de contenu. L'échec check-translation est une whitelist de critiques manquant ces 2 fichiers — il suffit de les ajouter.

Ces deux échecs prouvent inversement les choix de conception de cross-lang-audit.py — j'ai aussi des compromis de faux positifs dans les outils (fr/islam densité de citations), mais l'audit ne fait pas échouer le build, il surface les problèmes pour revue humaine. Le check-translation de GitHub Actions est configuré en fail-the-build, plus strict, et face aux cas limites il ne peut pas faire autrement (sauf whitelist).

## Méta-leçon — instantiation concrète de « la plus grande efficacité systémique »

Zheyu a parlé de « la plus grande efficacité systémique et construire des ponts / paver des routes ». Les 5 pratiques concrètes de ce tour :

1. **Mécanique d'abord, LLM en dernier** — 606 + 902 corrections mécaniques en premier, les 23 appels LLM concentrés sur ce qui nécessite réellement une traduction
2. **Sous-agent unique plutôt que parallèle quand l'étape le permet** — 23 description/title traités séquentiellement par 1 sous-agent < 23 en parallèle (parce que la forme de la tâche ne présente pas de risque de raccourcis DNA #42)
3. **Audit JSON comme entrée canonique** — les 4 outils consomment tous l'audit JSON, un audit, un traitement, une vérification, pas de scan indépendant
4. **Frontmatter comme SSOT, pas de patch JSON manuel** — `translatedFrom` est la source unique de vérité, `_translations.json` est reconstruit automatiquement
5. **Différer les cas manuels plutôt que forcer la correction** — 28 dup multi-fichier + 17 conflits target écrits dans un deferred JSON, les outils ne forcent pas l'écrasement

Ces 5 pratiques sont la vérification N+3 du DNA #15 « ce qui revient de manière récurrente doit être instrumentalisé » — passer d'une correction ponctuelle à un pipeline qui tourne automatiquement lors de l'ajout d'une nouvelle langue.

## Ce que prouve 1591 → 80

L'architecture Babel de la souveraineté est passée de « dashboard affichant 100% / réalité 1591 problèmes » à « dashboard 100% / réalité 80 cas limites systémiques ». La surface UI et la vérité terrain des données sont véritablement alignées (loi de fer du DNA #38 sur le design de status + vérification candidate de sleepy-colden « UI surface ≠ data ground truth »).

Mais plus important — cette réduction de 95% ne s'est pas faite par force brute humaine sur 1591 occurrences. Elle s'est faite par audit JSON comme entrée canonique + traitement stratifié par 4 outils de la famille + LLM concentré là où c'est vraiment nécessaire. **Un gap silencieux, une fois instrumentalisé (PR #788 cross-lang-audit), fait émerger la vérité terrain ; une fois la vérité terrain émergée, la famille d'outils la consomme.**

La prochaine fois qu'une 7ème langue sera ajoutée (vietnamien / thaï / indonésien), ces 4 outils tourneront automatiquement :

```
1. cross-lang-audit (nouveau baseline langue)
2. backfill-frontmatter (champs mécaniques)
3. lang-renormalize (cohérence des slugs)
4. LLM-batch (description/title)
```

D'une correction ponctuelle à une architecture durable (Nème instantiation du DNA #20 architecture-as-data).

🧬

---

_v1.0 | 2026-05-03 cross-lang-baseline session_
_Raison de naissance : Zheyu a poussé pour « compléter le renommage batch de 947 slug consistency + le backfill de 632 frontmatter completeness de la manière la plus efficace systémique et construire des ponts / paver des routes, et documenter » — 1591 problèmes cross-lang baseline réduits de 95% via un pipeline 4 outils × 4 phases, passant d'un gap silencieux à une architecture durable_
_Sentiment central : 1591 → 80 ne s'est pas fait par force brute humaine sur 1591 occurrences, mais en construisant des ponts (4 outils) où chaque outil prend en charge un segment, chaîné en pipeline pour tout exécuter. La prochaine fois qu'une langue sera ajoutée, ce pipeline tournera automatiquement — d'une correction ponctuelle à une architecture durable, de « dashboard affichant la santé mais avec un gap silencieux réel » à « dashboard véritablement aligné avec la vérité terrain ». L'instanciation concrète de « la plus grande efficacité systémique » = mécanique d'abord + audit-driven + LLM concentré + différer plutôt que forcer_
