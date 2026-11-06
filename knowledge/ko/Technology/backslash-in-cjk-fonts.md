---
title: "'功' 글자 속의 역슬래시: 타이완 엔지니어가 매일 지불하는 두 겹의 기본세"
description: "언어권 zh-TW의 Windows 11에서 번역 상태 스크립트가 감지한 4천여 개 경로를 모두 root에 넣고 Technology는 0이 되었으며, 같은 주에는 Linux CI가 녹색을 표시했다. 스크립트는 정슬래시로 분류 이름을 나누지만 디스크는 역슬래시를 사용하므로 분리가 되지 않는다. 더 오래된 한 겹은 글자 속에 숨어 있다: Big5의 '功' 두 번째 바이트는 ASCII 역슬래시이다. 개발계에서는 이를 허공개(許功蓋)라고 부른다. 경로가 어떻게 작성되었는지, 글자 안에 어떤 문자가 들어있는지 기본값조차 이 기계에 포함시키지 않았다. Git의 quotePath는 또 다른 선이며 원인이 다르다."
date: 2026-08-13
category: 'Technology'
tags: ['오픈소스', 'Windows', 'Big5', 'UTF-8', '문자 인코딩', '번체 중국어']
subcategory: '文字與工具'
author: 'Taiwan.md Contributors'
featured: false
lastVerified: 2026-08-13
lastHumanReview: false
image: '/article-images/technology/big5-gong-5c-backslash.webp'
imageAlt: "큰 글자 '功' 옆에는 그 Big5 코드인 A5와 5C 두 칸이 있으며, 5C 칸은 화살표로 ASCII 0x5C 역슬래시를 가리키고, 아래쪽에는 Python의 실제 출력이 표시되어 허공개 세 글자의 두 번째 바이트가 모두 역슬래시임을 보여준다."
imageCredit: 'Taiwan.md Contributors（自製圖解）· CC BY-SA 4.0'
curation: 'incubating'
curationReason: 'unverified'
translatedFrom: 'Technology/功字裡的那根反斜線.md'
sourceCommitSha: 'ef8369eef'
sourceContentHash: 'sha256:dbee36211f1b2080'
sourceBodyHash: 'sha256:cfc0fe9c1ed37efb'
translatedAt: '2026-11-06T08:51:04.719874+00:00'
---

> **30초 요약:** 나는 번역 상태 스크립트를 실행했고 화면에 4546이 표시되었으며 전부 `root`에 있었다. GitHub의 Linux CI는 녹색이었다. 나중에 두 가지 사실을 명확히 알게 되었다. Windows 경로의 역슬래시를 스크립트가 슬래시로 나누지 못했다. '功'의 Big5 코드 후반부는 그 자체가 ASCII의 `\`이다. 두 메커니즘은 다르지만 같은 번체 중국어 Windows에서 자주 함께 발생한다.

나는 언어권 zh-TW의 Windows 11에서 Taiwan.md의 번역 상태 스크립트를 유지보수하고 있다. 그날 밤 평소처럼 `i18n-status.py`를 실행하여 터미널에 숫자가 출력되기를 기다렸다. 메인 콘솔은 cp950이다. 출력에는 빨간색 글자가 없었다.

화면은 4546에서 멈췄다. 전부 `root`라는 분류 안에 있었다. Technology는 0이었다.

같은 주에 GitHub에 푸시했고, Linux의 CI는 녹색 불이었다.

스크립트 변수 이름은 `zh_articles`이며, `knowledge` 아래의 영어, about 및 밑줄 디렉토리를 제외한 경로를 스캔한다. 일본어, 한국어, 아랍어도 포함된다. 그날 밤에는 분류 이름조차 나누지 못했고 4천여 개의 경로가 같은 칸에 쑤셔넣어졌다. 예외도 경고도 없었다. 통계상으로는 사이트 전체가 망한 것처럼 보였지만 파일은 하나도 줄지 않았다.[^8]

디스크상의 경로는 `knowledge\Technology\특정문서.md`이며, 폴더 간에는 역슬래시로 구분된다. 스크립트는 `split('/')`를 사용하여 분류 이름을 추출한다. Linux에서는 이 줄이 작동하는데, 경로 자체가 슬래시이기 때문이다. Windows에서는 역슬래시를 나누지 못하고 전체 경로가 그대로 돌아와 문서가 기본값인 `root`에 던져졌다.[^1]

`pathlib`로 디렉토리를 처리하도록 변경한 후에는 Technology 아래에 59개의 항목이 있었고, 이는 폴더 안의 내용과 일치했다. 중간에는 단 하나의 가정이 있었다: 당신의 기계가 어떤 선을 사용하여 폴더를 구분하는가.

![Python 터미널 실제 출력: 동일한 Windows 경로를 split('/')로 나누어 단일 요소 리스트만 반환하고 PureWindowsPath(p).parts에 넘겨 knowledge, Technology, 파일명 세 부분으로 분리하는 모습](/article-images/technology/windows-path-split-vs-pathlib.svg)

_동일한 경로, 두 가지 분할 방식. `split('/')`는 슬래시를 찾지 못해 전체가 그대로 돌아오고; `PureWindowsPath`는 역슬래시를 인식하여 Technology를 반환한다. Taiwan.md 기여자 제작, CC BY-SA 4.0._

> **📝 큐레이터 메모:** 스크립트 문법은 잘못되지 않았고 CI도 실제로 테스트를 실행했다. 균열이 생긴 곳은 '작성자가 실제로 앉아 있는 기계'와 '도구가 당신이 앉아 있다고 생각하는 기계' 사이이다. 이 틈은 어느 한 단계에도 속하지 않으므로 아무도 감시하지 않는다.

## '功' 안의 그 선

경로가 첫 번째 층이다. 두 번째 층은 훨씬 더 오래되었으며 글자 속에 숨어 있다.

Big5는 1984년에 확정되었고, 한 중국어 문자는 두 바이트를 사용한다. 두 번째 바이트가 `0x40`에서 `0x7E` 사이에 위치하면 ASCII의 일반적인 기호와 중복된다: `[` , `]` , `{` , `}` , `\` , `|`. 당시 차오양과학기술대학 정보관리과 부교수였던 홍조귀(2023년 8월 은퇴)는 강의 페이지에 "40-7E가 일반적인 문자들의 ASCII 코드 범위이기 때문에 때때로 프로그래머에게 어려움을 주기도 한다"고 썼다.[^2]

'功'의 코드는 `A5 5C`이다. 뒤쪽의 `0x5C`는 ASCII에서 역슬래시 `\`이다. 바이트 단위로 문자열을 스캔하고 `\`를 이스케이프 또는 구분 기호로 취급하는 프로그램은 '功'의 후반부를 스캔할 때 경로를 만난 것으로 착각할 수 있다. 파일명에 '功'이 있든, 경로에 '功'이 있든 여기서 넘어질 수 있다.

타이완과 홍콩 개발계에서는 이를 '허공개(許功蓋)'라고 부른다: '許'는 `B3 5C`, '功'은 `A5 5C`, '蓋'는 `BB 5C`이며, 세 개의 일반적인 글자가 연속으로 쓰여 사람의 이름처럼 보인다.[^5] 홍조귀는 또한 '가야정진공(加也程陣功)'을 나열했는데, 두 번째 바이트가 각각 `[` , `]` , `{` , `}`와 충돌했고 스캔 도구인 `b5tm`을 만들었다.[^2] 하나의 버그에 사람의 이름이 붙는 것은 보통 그것이 충분히 자주 발생하여 한 세대가 그것을 지목하며 이야기할 수 있어야 하기 때문이다.

2015년, 블로그 '암흑실행사(黑暗執行緒)'의 저자가 Visual Studio 2015로 변경했다. 이전 `.cs` 파일은 여전히 BIG5로 저장되었다. 컴파일러가 Roslyn으로 바뀐 후, 파일 속의 허공개는 컴파일 오류가 되었다.

이틀 뒤 동료가 그에게 전화했는데, 그들도 오랫동안 막혔고 결국 그의 글을 역추적했다. 한 네티즌은 수천 개의 파일을 가지고 있었는데 하나를 변환해도 여전히 많았기에 "결국 VS2015와 작별하기로 했다." 그는 수동으로 저장할 수 없었기 때문에 배치(batch)로 UTF-8로 변환하는 작은 도구를 작성했다.[^7]

이것은 앞서 언급한 `split('/')`와는 다른 문제이다. 하나는 현대적인 도구가 경로를 어떻게 가정하느냐의 문제이고, 다른 하나는 40년 전에 2바이트를 선택하면서 글자의 몸속에 기호를 담아버린 문제이다. 메커니즘은 다르지만 청구서는 종종 같은 cp950 기계에서 함께 온다. 입력 측면에서는 어떻게 문자를 컴퓨터로 보내는지 [동아 문자 입력법](/ko/technology/east-asian-input-methods/)을 참고하라. 여기서는 글자가 이미 디스크에 있는 후, 도구 체인이 그것을 인식하는가에 대해 논한다.

## 기본값이 이 기계를 위해 분기를 만들지 않았다

Git은 `core.quotePath`를 기본적으로 켜 놓는다. 바이트 값이 `0x80`보다 큰 파일명은 `git status`에서 `\344\270\255`와 같은 8진수 형태로 출력된다. 중국어 파일명이 남아있지만, 당신은 단지 매일 자신의 저장소가 무슨 말을 하는지 이해하지 못할 뿐이다.[^3] 이것이 이스케이프하는 것은 UTF-8의 상위 바이트이다. Big5의 `0x5C`는 또 다른 선이다. 둘 다 역슬래시처럼 보이지만 원인이 다르다.

![터미널 실제 출력: git status --short가 본문의 중국어 파일명을 따옴표가 붙은 8진수 이스케이프 시퀀스로 출력하고, -c core.quotePath=false를 추가하면 동일한 파일명이 중국어로 출력되는 모습](/article-images/technology/git-quotepath-octal-cjk.svg)

_동일한 파일에 대해 기본값 아래에는 `\345\212\237`라는 일련의 문자열이 있다. 여기서의 역슬래시는 Git이 덧붙인 이스케이프이며 '功' 글자 속의 `0x5C`와는 관련이 없다. Taiwan.md 기여자 제작, CC BY-SA 4.0._

Python 3은 Windows에서 `open()`을 사용할 때 `encoding='utf-8'`을 명시하지 않으면 시스템 언어를 따를 수 있다. 동일한 UTF-8 파일도 Linux에서는 읽을 수 있지만, 이 기계가 cp950으로 디코딩하면 구두점이나 주음(注音)이 깨진다.[^4] 나 자신도 한 번 겪었다: PowerShell 5.1의 `Get-Content | Set-Content`를 사용하여 UTF-8 파일을 수정했는데 긴 대시가 diff에서 `??`로 변했다. 그것 역시 기본세였으며 두 번째 주제는 아니다.

상태 메시지에 이모지를 사용할 때, 이 cp950 콘솔은 직접 충돌한다. 글자 세트에 해당 기호가 없으므로 Python이 출력할 수 없고 예외가 최상위 레벨에서 폭발한다. Linux CI는 이 일을 감지하지 못하는데, 왜냐하면 그것은 이 기계에서 실행되지 않기 때문이다.

Git, Python, CI 예시 경로의 `$HOME/project/src`에는 zh-TW Windows를 위한 별도의 분기가 없다.

홍조귀는 2015년 iThome 인터뷰에서 정부 파일에 어떤 형식을 사용해야 하고 얼마나 오래 살아남을 수 있는지 논했다. 보도는 그의 의도를 전달한다: 만약 정부가 오직 Microsoft 제품으로만 파일을 열어본다면, 이는 Microsoft의 수명이 중화민국보다 길 것이라고 믿는 것과 같다.[^6] 그 말은 파일 형식과 보존 기간에 관한 것이다. 자료가 어떤 기본 도구 세트에 묶여 있으면 시간이 길어질수록 누가 읽을 수 있는지가 결정된다. 오픈소스 협업은 특정 기계의 기본 환경에 묶인다. 시민 기술과 정부 파일 형식 간의 줄다리기는 [오픈소스 커뮤니티와 g0v](/ko/technology/open-source-and-g0v/)를 참고하라. 타이완 개발자들이 오랫동안 이러한 격차를 흡수해 온 문화는 [타이완 오픈소스 정신](/ko/technology/taiwan-open-source-spirit/)을 참고하라.

경로 구분자, 터미널 인코딩, CI 예시의 `$HOME`은 이 기계를 위한 분기를 만들지 않았다. 4546개의 경로가 잘못된 범주에 분류되었을 때, 어떤 코드 줄도 오류를 보고하지 않았다. 통계는 정상적으로 보였지만 당신이 이 기계 앞에 앉았을 때까지는 그렇지 않았다.

## 추가 읽을거리

- [타이완 오픈소스 정신](/ko/technology/taiwan-open-source-spirit): 타이완 개발자들이 오픈소스를 참여하는 문화와 맥락.
- [동아 문자 입력법](/ko/technology/east-asian-input-methods): 글자가 어떻게 컴퓨터에 입력되는지, 문자 코드표부터 키보드까지.
- [오픈소스 커뮤니티와 g0v](/ko/technology/open-source-and-g0v): 개방형 데이터와 정부 형식 간의 협력.

## 이미지 출처

- **'功'의 Big5 코드와 역슬래시 (hero)**: Taiwan.md 기여자 제작 다이어그램, CC BY-SA 4.0, `public/article-images/technology/big5-gong-5c-backslash.webp`에 저장됨. 아래 줄은 Python 3이 `'許功蓋'.encode('big5')`를 실제로 실행한 출력이며, 코드는 위키피디아 Big5 항목과 일치한다.[^5]
- **split('/')와 PureWindowsPath**: Taiwan.md 기여자 제작, CC BY-SA 4.0, `public/article-images/technology/windows-path-split-vs-pathlib.svg`에 저장됨. 내용은 Python 3의 실제 실행 결과이며; `PureWindowsPath`는 어떤 운영체제에서든 Windows 규칙으로 경로를 분할하므로 Windows 기계 없이도 재현 가능하다.
- **Git core.quotePath의 8진수 출력**: Taiwan.md 기여자 제작, CC BY-SA 4.0, `public/article-images/technology/git-quotepath-octal-cjk.svg`에 저장됨. 내용은 임시 저장소에 본문 파일명을 추가한 후 `git status --short`의 실제 출력이며; 이 동작은 운영체제와 무관하다.

## 참고 자료

[^1]: [Microsoft Learn: Windows 시스템의 파일 경로 형식](https://learn.microsoft.com/zh-tw/dotnet/standard/io/file-path-formats) — .NET 문서는 전통적인 DOS 경로가 역슬래시를 디렉토리 구분 기호로 사용하며, 정슬래시는 역슬래시로 변환된다고 설명한다.

[^2]: [홍조귀: 프로그래밍 시 발생할 수 있는 big-5 코드 문제](https://frdm.cyut.edu.tw/~ckhung/b/pl/big5.php) — 강의 페이지에 두 번째 바이트가 ASCII 위험 영역에 속하는 일반적인 글자('加也程陣功')를 나열하고 스캔 도구 b5tm을 소개했다. 페이지 하단에는 직급이 명시되어 있지 않다. 2015년 iThome에서는 부교수로 언급되었다. 본인은 1997년부터 2023년까지 차오양 정보관리과에서 근무했으며 2023년 8월에 은퇴했다.

[^3]: [git-config: core.quotePath](https://git-scm.com/docs/git-config) — 공식 문서는 기본적으로 바이트 값이 0x80보다 큰 경로를 8진수 이스케이프 시퀀스로 표시한다고 설명한다.

[^4]: [Python 3: open()](https://docs.python.org/3/library/functions.html#open) — 함수 설명은 인코딩을 지정하지 않으면 시스템 언어를 기본 인코딩으로 사용할 수 있음을 지적한다.

[^5]: [위키피디아: Big5](https://zh.wikipedia.org/zh-tw/大五碼) — '功'이 0xA55C, '許'가 0xB35C, '蓋'가 0xBB5C임을 명시하고 이 문제가 허공개로 불리는 것을 설명한다.

[^6]: [iThome: 홍조귀 특별 인터뷰](https://www.ithome.com.tw/news/93606) — 2015년 특강에서 차오양과학기술대학 정보관리과 부교수로 언급되었다. 원본 페이지는 종종 403을 반환하므로, Microsoft의 수명에 대한 발언은 검색 결과로 보이는 보도를 인용했을 뿐이며 문자 그대로 받아들이지 않는다.

[^7]: [암흑실행사: 잠든 기계 - VS2015 프로그램 파일 BIG5 호환성 문제 해결](https://blog.darkthread.net/blog/big5-utf8-source-code-batch-converter/) — 2015년 Visual Studio 2015가 BIG5 원본 코드를 컴파일할 때 허공개가 컴파일 오류를 일으켰음을 기록했다. 글에는 "결국 VS2015와 작별하기로 했다"는 내용이 있다.

[^8]: [taiwan-md PR #1260](https://github.com/frank890417/taiwan-md/pull/1260) — 2026-07-26 병합. 수정 전 Windows에서 categories는 root: 4546만 남았고, 수정 후 Technology zh: 59가 되었다. cp950 콘솔을 충돌시키는 이모지는 함께 제거되었다.
