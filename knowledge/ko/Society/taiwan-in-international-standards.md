---
title: '국제 표준에서 대만의 명칭 문제'
description: 'ISO 코드부터 오픈소스 소프트웨어까지—대만이라는 이름이 글로벌 디지털 인프라에서 어떻게 표기되고, 논쟁되고, 수정되는가'
date: 2026-03-18
tags: ['ISO 3166', '국제 표준', '오픈소스', 'g0v', '디지털 주권', '대만 표기']
subcategory: '국제 관계'
category: 'Society'
author: 'Taiwan.md Translation Team'
readingTime: 10
featured: false
translatedFrom: 'Society/台灣在國際標準中的標示問題.md'
lastVerified: 2026-03-19
---

# 국제 표준에서 대만의 명칭 문제

글로벌 디지털 인프라에서 겉보기에 기술적인 문제 하나가 정치와 정체성의 민감한 신경을 건드리고 있다. 다양한 국제 표준과 소프트웨어 시스템에서 대만을 어떻게 표기해야 하는가의 문제다. ISO 3166 국제 표준에서 수많은 오픈소스 프로젝트에 이르기까지, 'Taiwan, Province of China(대만, 중국의 한 성)'라는 표기는 끊임없는 논의와 수정 움직임을 낳고 있다.

## 문제의 핵심: ISO 3166-1 표준

ISO 3166-1은 국제표준화기구(ISO)가 제정한 국가 코드 표준으로, 전 세계 국가와 지역에 두 글자, 세 글자, 숫자 코드를 부여한다. 이 표준에서 대만에는 `TW` 코드가 부여되었지만, 공식 명칭은 'Taiwan, Province of China(대만, 중국의 한 성)'으로 되어 있다.

이 표기는 1974년부터 ISO 3166 표준에 존재해 왔다. 그러나 대만 국민과 많은 국제 커뮤니티 구성원들에게 이는 '결함 있는 표준'이다. 대만의 실제 정치적 현실과 거버넌스 구조를 반영하지 않기 때문이다.

## 오픈소스 커뮤니티의 수정 운동

### Ubuntu 버그 1138121: 소프트웨어 미러 서버의 국가 선택 문제

우분투의 소프트웨어 소스 설정에서 사용자는 최적의 미러 서버를 찾기 위해 자신의 국가를 선택해야 한다. 대만 사용자들이 'Taiwan, Province of China'라는 선택지를 보게 되면 많은 이들이 당혹감과 불만을 느낀다.

버그 #1138121의 제보자는 문제를 다음과 같이 상세히 설명했다.

> 거의 모든 대만(중화민국) 사람들은 이런 소프트웨어 결함이 컴퓨터 화면에 나타난다면 불편함을 느낄 것입니다 ;)

제보자가 제안한 해결책은 ISO 코드의 'common name' 필드, 즉 간단히 'Taiwan'을 사용하는 것이었다. 정치적 색채가 담긴 전체 명칭 대신.

### GitHub에서의 수정 시도

GitHub 오픈소스 커뮤니티에서도 많은 프로젝트가 동일한 문제에 직면했다. 예를 들어 ISO-3166-Countries-with-Regional-Codes 프로젝트의 이슈 #43에서, 커뮤니티 구성원은 다음과 같이 제기했다.

> 위키피디아에 따르면 대만은 중국의 한 성이 아닙니다. 일부 코드에서 'Taiwan'을 'Taiwan, Province of China'로 표현하고 있는데, 이는 용납할 수 없는 일입니다.

이런 이슈에는 보통 pull request가 동반되어, 관련 파일의 표기를 'Taiwan, Province of China'에서 'Taiwan'으로 수정하려는 시도가 이루어진다.

### FreeBSD PR 138672

FreeBSD 운영 체제에도 유사한 문제가 제보되었다. 번호 138672의 PR 제목은 문제를 직접적으로 설명한다. "ISO 3166이 대만에 잘못된 이름을 부여했습니다. 예전처럼 대만을 'Taiwan'이라고 불러주세요."

### Drupal 이슈 1938892

Drupal 콘텐츠 관리 시스템 커뮤니티에서도 ISO-3166-1 국가 데이터를 CLDR(Common Locale Data Repository) 유니코드 데이터로 전환하는 문제가 논의되었다. 커뮤니티 구성원들은 'Taiwan, Province of China'라는 표기가 "매우 문제가 있다"고 판단했다.

## 기술적 도전과 해결책

### 표준화의 딜레마

소프트웨어 개발자들이 직면한 도전은 국제 표준을 준수하면서도 정치적 논란을 피하고 사용자의 감정을 존중하는 방법이다. 일반적인 해결책에는 다음이 포함된다.

1. **일반 명칭 사용**: 'Taiwan, Province of China' 전체 공식 명칭 대신 보다 중립적인 'Taiwan' 사용
2. **CLDR 데이터 채택**: 일반적으로 보다 중립적인 유니코드 CLDR 프로젝트의 지역 데이터 사용
3. **현지화 처리**: 다른 언어 환경에서 적절한 명칭 사용

### 개발 커뮤니티의 대응 방식

대만 표기 문제가 제보되면, 오픈소스 프로젝트는 보통 다음 단계를 거친다.

1. **기술 평가**: 시스템 기능에 영향 없이 표기를 수정할 수 있는지 검토
2. **커뮤니티 토론**: 이슈나 포럼에서 가장 적합한 대안 논의
3. **단계적 수정**: pull request를 통해 관련 파일 단계적 업데이트
4. **문서 업데이트**: 새로운 처리 방식을 설명하는 관련 문서 수정

## 더 넓은 영향

### 국제기구의 명칭 문제

이 문제는 소프트웨어 시스템에만 존재하지 않는다. 많은 국제기구에서도 대만은 유사한 명칭 도전에 직면한다.

- **WHO**: 대만은 'Taiwan' 명의로 참여할 수 없으며, 보통 'Chinese Taipei'를 사용한다.
- **올림픽**: 대만은 'Chinese Taipei' 명의로 참가한다.
- **기타 국제 표준 기구**: 대부분 ISO 3166-1의 표기 방식을 따른다.

### 디지털 주권에 대한 성찰

국제 표준에서 대만의 표기 문제는 실제로 디지털 시대의 주권 표현 문제를 반영한다. 글로벌 디지털 인프라에서 각 지역이 적절한 방식으로 인식되고 표현될 수 있도록 보장하는 것은 생각해볼 만한 문제다.

## g0v 커뮤니티의 기여

관련 사례와 토론 스레드를 오랫동안 정리해준 g0v 커뮤니티 구성원 chewei에게 감사를 전한다. 덕분에 더 많은 사람들이 이 문제의 보편성과 중요성을 이해할 수 있게 되었다. g0v 커뮤니티는 오픈소스 협업 방식을 통해 정부 디지털 서비스를 개선하고 정보 투명성 증진을 위해 지속적으로 노력하고 있다.

## 개발자를 위한 실용적 권고

소프트웨어 개발자가 국가/지역 선택 기능을 다룰 때 고려할 수 있는 제안은 다음과 같다.

1. **정치적 논란 회피**: 'Taiwan, Province of China' 대신 'Taiwan' 같은 보다 중립적인 명칭 사용
2. **맞춤 옵션 제공**: 사용자나 관리자가 지역 명칭을 직접 설정할 수 있도록 허용
3. **국제 관례 채택**: Google, Microsoft 등 주요 서비스의 처리 방식 참고
4. **문서 설명**: 특정 표기 방식을 채택한 이유를 문서에 명시

## 결어

국제 표준에서 대만의 표기 문제는 겉보기에 기술적 세부사항에 불과하지만, 실제로는 정체성, 존중, 포용이라는 깊은 문제와 맞닿아 있다. 오픈소스 커뮤니티의 지속적인 노력을 통해, 많은 프로젝트가 이미 보다 중립적이고 포용적인 표기 방식을 채택하고 있음을 알 수 있다.

이것은 기술적 문제의 해결에 그치지 않고, 디지털 시대 다원적 가치관의 구현이기도 하다. 하나하나의 작은 수정이 개발자 커뮤니티가 사용자의 감정을 중요시하고, 더 포용적인 디지털 환경 구축을 위해 노력한다는 것을 나타낸다.

## 참고 자료

- [ISO-3166-Countries-with-Regional-Codes Issue #43](https://github.com/lukes/ISO-3166-Countries-with-Regional-Codes/issues/43)
- [Ubuntu Bug #1138121](https://bugs.launchpad.net/ubuntu/+source/software-properties/+bug/1138121)
- [FreeBSD PR 138672](https://bugs.freebsd.org/bugzilla/show_bug.cgi?id=138672)
- [Drupal Issue #1938892](https://www.drupal.org/project/drupal/issues/1938892)
- [Taiwan News: Taiwan urged to address mislabeling by ISO](https://www.taiwannews.com.tw/news/3812381)
- [Change.org Petition: Correct "Taiwan, Province of China" on ISO 3166](https://www.change.org/p/iso-international-organization-for-standardization-correct-taiwan-province-of-china-on-iso-3166-and-change-it-to-taiwan-let-tw-be-taiwan)
- [g0v 커뮤니티 자료 정리](https://g0v.hackmd.io/5YRoMhveTt-aXwH60T2NZg) - chewei의 정리에 감사

---

_이 글은 관련 사례를 정리해준 g0v 커뮤니티 구성원 chewei와, 디지털 시스템에서 대만 표기를 개선하기 위해 노력한 모든 개발자와 커뮤니티 구성원들에게 감사드린다._
