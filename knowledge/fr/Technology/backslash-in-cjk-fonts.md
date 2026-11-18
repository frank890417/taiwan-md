---
title: 'La barre oblique inverse dans le caractère « 功 » : les deux couches de taxe par défaut que paient les ingénieurs taïwanais chaque jour'
description: 'Sur un Windows 11 en zh-TW, le script d''état de traduction place les 4 500 chemins scannés dans « root », Technology tombe à zéro, alors que le CI Linux est vert la même semaine. Le script sépare les catégories avec une barre oblique, le disque utilise une barre oblique inverse, la séparation échoue. Une couche plus ancienne se cache dans le caractère : le second octet Big5 de « 功 » est l''ASCII 0x5C (\), surnommé « 許功蓋 » par les développeurs. La façon d''écrire les chemins, les symboles logés dans les caractères — les valeurs par défaut n''ont pas prévu cette machine. Le `quotePath` de Git en est une autre, aux causes différentes.'
date: 2026-08-13
category: 'Technology'
tags:
  [
    'open source',
    'Windows',
    'Big5',
    'UTF-8',
    'encodage de caractères',
    'chinois traditionnel',
  ]
subcategory: '文字與工具'
author: 'Taiwan.md Contributors'
featured: false
lastVerified: 2026-08-13
lastHumanReview: false
image: '/article-images/technology/big5-gong-5c-backslash.webp'
imageAlt: "Grand caractère « 功 » avec ses codes Big5 A5 et 5C en deux cases, la case 5C pointée par une flèche vers l'ASCII 0x5C barre oblique inverse ; en dessous, la sortie Python réelle, les trois caractères de « 許功蓋 » ont tous leur second octet égal à la barre oblique inverse"
imageCredit: 'Taiwan.md Contributors（自製圖解）· CC BY-SA 4.0'
curation: 'incubating'
curationReason: 'unverified'
translatedFrom: 'Technology/功字裡的那根反斜線.md'
sourceCommitSha: 'ef8369ee'
sourceContentHash: 'sha256:dbee36211f1b2080'
sourceBodyHash: 'sha256:cfc0fe9c1ed37efb'
translatedAt: '2026-10-08T09:35:13+08:00'
---

> **Aperçu en 30 secondes :** je lance le script d'état de traduction, l'écran affiche 4546, tous dans `root`. Sur GitHub, le CI Linux est vert. Ce n'est que plus tard que je vois clairement deux choses. La barre oblique inverse des chemins Windows, le script la coupe avec une barre oblique et n'y arrive pas. Le second octet Big5 de « 功 », c'est lui-même l'ASCII `\`. Deux mécanismes différents, qui surviennent pourtant souvent ensemble sur un même Windows en chinois traditionnel.

Je maintiens le script d'état de traduction de Taiwan.md sur un Windows 11 en langue zh-TW. Ce soir-là, comme d'habitude, je lance `i18n-status.py` et j'attends que le terminal affiche les chiffres. La console est en cp950. La sortie ne contient aucun texte rouge.

L'écran s'arrête à 4546. Tout dans une seule catégorie nommée `root`. Technology est à 0.

La même semaine, poussé sur GitHub, le CI sur Linux affiche un feu vert.

La variable du script s'appelle `zh_articles` ; elle scanne les chemins sous `knowledge`, à l'exception des répertoires anglais, about et ceux commençant par un trait de soulignement ; le japonais, le coréen, l'arabe y sont aussi inclus. Ce soir-là, elle n'arrive même pas à extraire le nom de la catégorie : plus de quatre mille chemins sont fourrés dans la même case. Aucune exception, aucun avertissement. Les statistiques donnent l'impression que tout le site est cassé, alors qu'aucun fichier ne manque.[^8]

Sur le disque, les chemins s'écrivent `knowledge\Technology\un-article.md`, les dossiers séparés par des barres obliques inverses. Le script utilise `split('/')` pour récupérer le nom de la catégorie. Sur Linux, cette ligne fonctionne, car les chemins utilisent nativement la barre oblique. Sur Windows, elle ne coupe pas la barre oblique inverse, le chemin entier revient tel quel, et l'article est jeté dans le `root` par défaut.[^1]

Après avoir confié la gestion des répertoires à `pathlib`, Technology compte 59 articles, cohérent avec le contenu du dossier. Il n'y avait qu'une seule hypothèse entre les deux : quelle barre votre machine utilise-t-elle pour séparer les dossiers.

![Sortie réelle du terminal Python : le même chemin Windows coupé avec split('/') renvoie une liste à un seul élément ; confié à PureWindowsPath(p).parts, il découpe knowledge, Technology, nom de fichier en trois segments](/article-images/technology/windows-path-split-vs-pathlib.svg)

_Un même chemin, deux façons de le couper. `split('/')` ne trouve pas la barre oblique, le chemin revient entier ; `PureWindowsPath` reconnaît la barre oblique inverse, et Technology réapparaît. Taiwan.md Contributors, CC BY-SA 4.0._

> **📝 Note du curateur :** La syntaxe du script n'est pas fausse, le CI a bel et bien exécuté les tests. La faille se situe entre « la machine sur laquelle l'auteur est réellement assis » et « celle que l'outil imagine ». Cette couture n'appartient à aucun maillon, donc personne n'est chargé de la surveiller.

## Cette ligne à l'intérieur de « 功 »

Le chemin, c'est la première couche. La seconde est bien plus ancienne, enfouie dans le caractère.

Le Big5 est finalisé en 1984 : un caractère chinois = deux octets. Si le second octet tombe entre `0x40` et `0x7E`, il chevauche les symboles ASCII courants : `[`, `]`, `{`, `}`, `\`, `|`. Hong Chao-kuei (洪朝貴), alors professeur associé au département de gestion de l'information de l'Université de technologie Chaoyang (retraité en août 2023), l'a noté sur sa page d'enseignement : « Puisque 40-7E est la plage ASCII des caractères couramment utilisés, cela cause parfois des soucis aux programmeurs. »[^2]

Le code de « 功 » est `A5 5C`. Ce `0x5C` final, en ASCII, c'est la barre oblique inverse `\`. Un programme qui parcourt une chaîne octet par octet et traite `\` comme caractère d'échappement ou séparateur, en rencontrant la seconde moitié de « 功 », croit avoir affaire à un chemin. Un nom de fichier contenant « 功 », un chemin contenant « 功 », tous deux peuvent trébucher là.

Les développeurs de Taïwan et de Hong Kong l'appellent « 許功蓋 » (Xu Gong Gai) : « 許 » = `B3 5C`, « 功 » = `A5 5C`, « 蓋 » = `BB 5C` ; trois caractères courants accolés qui ressemblent à un nom de personne.[^5] Hong Chao-kuei liste aussi « 加也程陣功 », dont les seconds octets heurtent respectivement `[`, `]`, `{`, `}`, `\`, et a écrit l'outil de scan `b5tm`.[^2] Quand un bogue reçoit un nom de personne, c'est qu'il apparaît assez souvent pour qu'une génération ait besoin de le désigner du doigt.

En 2015, l'auteur du blog « Dark Thread » (黑暗執行緒) passe à Visual Studio 2015. Les anciens fichiers `.cs` sont encore enregistrés en BIG5. Le compilateur bascule sur Roslyn, et les 許功蓋 présents dans les fichiers deviennent des erreurs de compilation.

Deux jours plus tard, un collègue lui dit qu'ils ont migré eux aussi et sont restés bloqués longtemps, avant de retomber sur son article en cherchant. Un internaute a des dizaines de milliers de fichiers, la conversion d'un seul en laisse encore une pile, « il n'a eu d'autre choix que de dire Goodbye à VS2015 ». Il a fini par écrire un petit utilitaire de conversion par lots vers UTF-8, car « Enregistrer sous » à la main ne finissait pas.[^7]

Ce n'est pas la même chose que le `split('/')` précédent. L'un vient d'outils modernes qui supposent à quoi ressemblent les chemins. L'autre remonte à quarante ans, quand le choix du double octet a logé un symbole dans le corps du caractère. Mécanismes différents, mais la facture arrive souvent ensemble sur une même machine en cp950. Côté entrée — comment on fait entrer les caractères dans l'ordinateur —, voir [East Asian Input Methods](/fr/technology/east-asian-input-methods/). Ici, on parle de ce qui se passe une fois les caractères sur le disque : la chaîne d'outils les reconnaît-elle encore ?

## Les valeurs par défaut n'ont pas ouvert de branche pour cette machine

Git active `core.quotePath` par défaut. Les noms de fichiers contenant des octets supérieurs à `0x80` s'affichent dans `git status` sous la forme `\344\270\255` (séquences d'échappement octales). Le nom chinois est bien là, vous ne comprenez simplement plus ce que votre dépôt vous raconte.[^3] Il échappe les octets de poids fort de l'UTF-8. Le `0x5C` du Big5, c'est une autre ligne. Tous deux ressemblent à une barre oblique inverse, leurs causes diffèrent.

![Sortie réelle du terminal : git status --short affiche le nom de fichier chinois de cet article sous forme de séquences d'échappement octales entre guillemets ; avec -c core.quotePath=false, le même nom s'affiche en chinois](/article-images/technology/git-quotepath-octal-cjk.svg)

_Le même fichier, sous les valeurs par défaut, devient une suite de `\345\212\237`. Ici, la barre oblique inverse est l'échappement ajouté par Git, sans lien avec le `0x5C` inside « 功 ». Taiwan.md Contributors, CC BY-SA 4.0._

Python 3 sur Windows, si `open()` omet `encoding='utf-8'`, peut retomber sur la locale système. Le même fichier UTF-8 passe sur Linux, cette machine le lit en cp950, la ponctuation ou le bopomofo cassent.[^4] Je l'ai payé une fois : avec `Get-Content | Set-Content` de PowerShell 5.1 pour convertir un fichier en UTF-8, le tiret long devient `??` dans le diff. C'est aussi une taxe par défaut, pas le second sujet.

Quand les messages d'état contiennent des emoji, cette console cp950 plante net. Le jeu de caractères ne les contient pas, Python ne peut les afficher, l'exception remonte jusqu'au sommet. Le CI Linux ne la détecte pas, car il ne tourne pas sur cette machine.

Git, Python, les exemples de chemins du CI avec leur `$HOME/project/src`, n'ont pas prévu de branche spécifique pour le Windows zh-TW.

En 2015, Hong Chao-kuei accordait une interview à iThome sur les formats d'ouverture des archives gouvernementales et leur durée de vie. L'article rapporte son propos : si le gouvernement n'utilise que des produits Microsoft pour ouvrir ses fichiers, c'est parier que Microsoft survivra à la République de Chine.[^6] Cette phrase porte sur les formats de fichiers et la pérennité. Les données attachées à quelle suite d'outils par défaut, le temps aidant, deviennent une question de qui pourra encore les lire. La collaboration open source est attachée à l'environnement par défaut d'un certain type de machine. Sur la tension entre technologie civique et formats d'archives publiques, voir [Open Source Communities and g0v](/fr/technology/open-source-and-g0v/). Sur la culture des développeurs taïwanais qui absorbent ce décalage depuis longtemps, voir [Taiwan Open Source Spirit](/fr/technology/taiwan-open-source-spirit/).

Séparateur de chemin, encodage du terminal, `$HOME` dans les exemples de CI : aucune branche n'a été ouverte pour cette machine. Le jour où 4 546 chemins ont été mal classés, aucune ligne de code n'a signalé d'erreur. Les statistiques semblaient normales, jusqu'à ce que vous vous asseyiez devant cette machine.

## Lectures complémentaires

- [Taiwan Open Source Spirit](/fr/technology/taiwan-open-source-spirit) : la culture et le contexte de la participation des développeurs taïwanais à l'open source.
- [East Asian Input Methods](/fr/technology/east-asian-input-methods) : comment les caractères entrent dans l'ordinateur, des tables de codes au clavier.
- [Open Source Communities and g0v](/fr/technology/open-source-and-g0v) : la collaboration entre données ouvertes et formats gouvernementaux.

## Sources des images

- **Code Big5 de « 功 » et barre oblique inverse (hero)** : infographie Taiwan.md Contributors, CC BY-SA 4.0, stockée dans `public/article-images/technology/big5-gong-5c-backslash.webp`. La ligne en dessous est la sortie réelle de Python 3 exécutant `'許功蓋'.encode('big5')`, les positions de code concordent avec l'article Wikipédia sur le Big5.[^5]
- **split('/') vs PureWindowsPath** : Taiwan.md Contributors, CC BY-SA 4.0, stocké dans `public/article-images/technology/windows-path-split-vs-pathlib.svg`. Le contenu est le résultat réel d'exécution Python 3 ; `PureWindowsPath` applique les règles de chemin Windows sur n'importe quel OS, donc pas besoin de machine Windows pour reproduire.
- **Sortie octale de Git core.quotePath** : Taiwan.md Contributors, CC BY-SA 4.0, stocké dans `public/article-images/technology/git-quotepath-octal-cjk.svg`. Le contenu est la sortie réelle de `git status --short` après avoir ajouté le nom de fichier de cet article dans un dépôt temporaire ; ce comportement est indépendant de l'OS.

## Références

[^1]: [Microsoft Learn : File path formats on Windows systems](https://learn.microsoft.com/zh-tw/dotnet/standard/io/file-path-formats) — La documentation .NET explique que les chemins DOS traditionnels utilisent la barre oblique inverse comme séparateur de répertoire, la barre oblique étant convertie en barre oblique inverse.

[^2]: [Hong Chao-kuei : Big-5 code issues encountered when programming](https://frdm.cyut.edu.tw/~ckhung/b/pl/big5.php) — Page d'enseignement listant les caractères courants dont le second octet tombe dans la zone ASCII dangereuse (加也程陣功), et présentant l'outil de scan b5tm. La page ne mentionne pas le grade. iThome 2015 le cite comme professeur associé. Son site personnel indique un poste au département de gestion de l'information de Chaoyang de 1997 à 2023, retraite en août 2023.

[^3]: [git-config : core.quotePath](https://git-scm.com/docs/git-config) — La documentation officielle indique que par défaut, les chemins contenant des octets > 0x80 sont affichés sous forme de séquences d'échappement octales.

[^4]: [Python 3 : open()](https://docs.python.org/3/library/functions.html#open) — La documentation de la fonction précise qu'en l'absence d'encoding explicite, la locale système peut être utilisée comme encodage par défaut.

[^5]: [Wikipédia : Big5](https://zh.wikipedia.org/zh-tw/大五碼) — Indique « 功 » 0xA55C, « 許 » 0xB35C, « 蓋 » 0xBB5C, et mentionne que ce problème est surnommé 許功蓋.

[^6]: [iThome : Interview de Hong Chao-kuei](https://www.ithome.com.tw/news/93606) — Interview 2015, le texte le désigne comme professeur associé au département de gestion de l'information de l'Université de technologie Chaoyang. La page originale renvoie souvent 403, la phrase sur la durée de vie de Microsoft ne repose que sur les reprises visibles dans les résultats de recherche, non sur une citation littérale.

[^7]: [Dark Thread : Potentially dangerous - Solving VS2015 BIG5 compatibility issues](https://blog.darkthread.net/blog/big5-utf8-source-code-batch-converter/) — Bilan 2015 de la compilation de code source BIG5 sous Visual Studio 2015, où 許功蓋 provoque des erreurs de compilation. L'article contient « il n'a eu d'autre choix que de dire Goodbye à VS2015 ».

[^8]: [taiwan-md PR #1260](https://github.com/frank890417/taiwan-md/pull/1260) — Fusionné le 2026-07-26. Avant correction, Windows ne donnait plus que root: 4546 ; après, Technology zh: 59. Suppression conjointe des emoji qui faisaient planter la console cp950.
