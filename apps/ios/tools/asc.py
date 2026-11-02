#!/Users/cheyuwu/.hermes/hermes-agent/venv/bin/python -I
"""Taiwan.md iOS App 的 App Store Connect 上架工具（App Store Connect API，金鑰只帶路徑、不印內容）。

  asc.py status                 看 App、版本、在地化、build、分級、價格、地區的現況（唯讀）
  asc.py metadata               寫入 store/metadata.json：三語文案、網址、版權、類別、內容權利
  asc.py age-rating             年齡分級問卷（照 store/APPSTORE.md §四）
  asc.py pricing                免費＋全部地區排除中國大陸
  asc.py screenshots            上傳 store/screenshots/*.png 到繁中 6.9 吋
  asc.py build <build 號>       版本 1.0 選定 build
  asc.py review-notes           審查備註與聯絡資訊（姓名、email；電話要本人在網頁填）
  asc.py submit                 送審（App 隱私與 DSA 只能在網頁完成，先完成再跑）

金鑰：環境變數 ASC_KEY_ID／ASC_ISSUER_ID，或 ~/.muse/secrets/asc.json；私鑰在
~/.appstoreconnect/private_keys/AuthKey_<KEY_ID>.p8（altool 同一個位置）。fork 的人換成自己的金鑰即可。
"""
import hashlib
import json
import os
import sys
import time
import urllib.error
import urllib.request

import jwt

APP_ID = '6829697941'
VERSION = '1.0'
HERE = os.path.dirname(os.path.abspath(__file__))
STORE = os.path.join(HERE, '..', 'store')
API = 'https://api.appstoreconnect.apple.com/'


def _token():
    kid, iss = os.environ.get('ASC_KEY_ID'), os.environ.get('ASC_ISSUER_ID')
    if not kid:
        cfg = json.load(open(os.path.expanduser('~/.muse/secrets/asc.json')))
        kid, iss = cfg['key_id'], cfg['issuer']
    p8 = os.path.expanduser(f'~/.appstoreconnect/private_keys/AuthKey_{kid}.p8')
    now = int(time.time())
    return jwt.encode({'iss': iss, 'iat': now, 'exp': now + 1100, 'aud': 'appstoreconnect-v1'},
                      open(p8).read(), algorithm='ES256', headers={'kid': kid})


TOKEN = _token()


def call(method, path, body=None):
    url = path if path.startswith('http') else API + path
    data = json.dumps(body).encode() if body is not None else None
    req = urllib.request.Request(url, data=data, method=method, headers={
        'Authorization': f'Bearer {TOKEN}', 'Content-Type': 'application/json'})
    try:
        with urllib.request.urlopen(req) as r:
            raw = r.read()
            return json.loads(raw) if raw else {}
    except urllib.error.HTTPError as e:
        detail = e.read().decode(errors='replace')
        try:
            errs = json.loads(detail).get('errors', [])
            lines = []
            for x in errs:
                lines.append(f"{x.get('code')}: {x.get('detail')} {x.get('source', '')}")
                for path, subs in (x.get('meta', {}).get('associatedErrors') or {}).items():
                    for sub in subs:
                        lines.append(f"    ↳ {sub.get('code')}: {sub.get('detail')}")
            detail = '\n'.join(lines)
        except Exception:
            pass
        raise SystemExit(f'❌ {method} {path} → {e.code} {detail}')


def get(path):
    return call('GET', path)


def version():
    vs = get(f'v1/apps/{APP_ID}/appStoreVersions?filter[platform]=IOS&limit=10')['data']
    editable = [v for v in vs if v['attributes']['appStoreState'] in
                ('PREPARE_FOR_SUBMISSION', 'DEVELOPER_REJECTED', 'REJECTED', 'METADATA_REJECTED')]
    return (editable or vs)[0]


def app_info():
    infos = get(f'v1/apps/{APP_ID}/appInfos')['data']
    editable = [i for i in infos if i['attributes'].get('appStoreState') != 'READY_FOR_SALE'
                and i['attributes'].get('state') != 'READY_FOR_DISTRIBUTION']
    return (editable or infos)[0]


def cmd_status():
    app = get(f'v1/apps/{APP_ID}')['data']['attributes']
    print('App', app['name'], app['bundleId'], 'primaryLocale', app.get('primaryLocale'),
          'contentRights', app.get('contentRightsDeclaration'))
    v = version()
    print('版本', v['id'], v['attributes']['versionString'], v['attributes']['appStoreState'],
          'copyright', v['attributes'].get('copyright'))
    for l in get(f"v1/appStoreVersions/{v['id']}/appStoreVersionLocalizations")['data']:
        a = l['attributes']
        print('  版本在地化', l['id'], a['locale'], 'desc', len(a.get('description') or ''),
              'kw', len(a.get('keywords') or ''), a.get('supportUrl'))
    info = app_info()
    print('AppInfo', info['id'], info['attributes'])
    for l in get(f"v1/appInfos/{info['id']}/appInfoLocalizations")['data']:
        a = l['attributes']
        print('  App 資訊在地化', l['id'], a['locale'], a.get('name'), a.get('subtitle'), a.get('privacyPolicyUrl'))
    b = get(f"v1/appStoreVersions/{v['id']}/build").get('data')
    print('選定 build', b and b['attributes']['version'])
    for b in get(f'v1/builds?filter[app]={APP_ID}&sort=-uploadedDate&limit=5')['data']:
        print('  build', b['id'], b['attributes']['version'], b['attributes']['processingState'])


def cmd_metadata():
    meta = json.load(open(os.path.join(STORE, 'metadata.json'), encoding='utf-8'))
    common = meta['common']
    v = version()
    call('PATCH', f"v1/appStoreVersions/{v['id']}", {'data': {
        'type': 'appStoreVersions', 'id': v['id'], 'attributes': {'copyright': common['copyright']}}})
    have = {l['attributes']['locale']: l['id'] for l in
            get(f"v1/appStoreVersions/{v['id']}/appStoreVersionLocalizations")['data']}
    for loc, m in meta['locales'].items():
        attrs = {'description': m['description'], 'keywords': m['keywords'],
                 'promotionalText': m['promotionalText'],
                 'supportUrl': common['supportUrl'], 'marketingUrl': common['marketingUrl']}
        if loc in have:
            call('PATCH', f'v1/appStoreVersionLocalizations/{have[loc]}', {'data': {
                'type': 'appStoreVersionLocalizations', 'id': have[loc], 'attributes': attrs}})
        else:
            call('POST', 'v1/appStoreVersionLocalizations', {'data': {
                'type': 'appStoreVersionLocalizations', 'attributes': {'locale': loc, **attrs},
                'relationships': {'appStoreVersion': {'data': {'type': 'appStoreVersions', 'id': v['id']}}}}})
        print('  版本文案', loc, '✓')
    info = app_info()
    have = {l['attributes']['locale']: l['id'] for l in
            get(f"v1/appInfos/{info['id']}/appInfoLocalizations")['data']}
    for loc, m in meta['locales'].items():
        attrs = {'name': m['name'], 'subtitle': m['subtitle'], 'privacyPolicyUrl': common['privacyPolicyUrl']}
        if loc in have:
            call('PATCH', f'v1/appInfoLocalizations/{have[loc]}', {'data': {
                'type': 'appInfoLocalizations', 'id': have[loc], 'attributes': attrs}})
        else:
            call('POST', 'v1/appInfoLocalizations', {'data': {
                'type': 'appInfoLocalizations', 'attributes': {'locale': loc, **attrs},
                'relationships': {'appInfo': {'data': {'type': 'appInfos', 'id': info['id']}}}}})
        print('  名稱副標與隱私網址', loc, '✓')
    call('PATCH', f"v1/appInfos/{info['id']}", {'data': {'type': 'appInfos', 'id': info['id'], 'relationships': {
        'primaryCategory': {'data': {'type': 'appCategories', 'id': 'REFERENCE'}},
        'secondaryCategory': {'data': {'type': 'appCategories', 'id': 'EDUCATION'}}}}})
    print('  類別 參考／教育 ✓')
    call('PATCH', f'v1/apps/{APP_ID}', {'data': {'type': 'apps', 'id': APP_ID,
                                                 'attributes': {'contentRightsDeclaration': 'USES_THIRD_PARTY_CONTENT'}}})
    print('  內容權利：含第三方內容且有權使用 ✓')


def cmd_age_rating():
    """照實答：歷史文章有寫實暴力、戰爭與政治動盪、武器的文字敘述（偶爾／輕微），其餘皆無。預期 13+。"""
    info = app_info()
    rid = get(f"v1/appInfos/{info['id']}/ageRatingDeclaration")['data']['id']
    mild, none = 'INFREQUENT_OR_MILD', 'NONE'
    attrs = {
        'violenceRealistic': mild, 'matureOrSuggestiveThemes': mild, 'gunsOrOtherWeapons': mild,
        'violenceCartoonOrFantasy': none, 'violenceRealisticProlongedGraphicOrSadistic': none,
        'horrorOrFearThemes': none, 'profanityOrCrudeHumor': none, 'sexualContentOrNudity': none,
        'sexualContentGraphicAndNudity': none, 'alcoholTobaccoOrDrugUseOrReferences': none,
        'medicalOrTreatmentInformation': none, 'gamblingSimulated': none, 'contests': none,
        'gambling': False, 'lootBox': False, 'unrestrictedWebAccess': False, 'userGeneratedContent': False,
        'messagingAndChat': False, 'socialMedia': False, 'advertising': False, 'ageAssurance': False,
        'healthOrWellnessTopics': False, 'parentalControls': False,
    }
    call('PATCH', f'v1/ageRatingDeclarations/{rid}', {'data': {
        'type': 'ageRatingDeclarations', 'id': rid, 'attributes': attrs}})
    after = get(f'v1/appInfos/{info["id"]}')['data']['attributes']
    print('  分級問卷 ✓，App Store 分級：', after.get('appStoreAgeRating'))


def cmd_pricing():
    """免費；全部國家或地區上架，排除中國大陸（沒有 ICP 備案本來就上不了，研究 §6.4）。"""
    pts = get(f'v1/apps/{APP_ID}/appPricePoints?filter[territory]=USA&limit=200')['data']
    free = next(p for p in pts if float(p['attributes']['customerPrice']) == 0)
    call('POST', 'v1/appPriceSchedules', {
        'data': {'type': 'appPriceSchedules', 'relationships': {
            'app': {'data': {'type': 'apps', 'id': APP_ID}},
            'baseTerritory': {'data': {'type': 'territories', 'id': 'USA'}},
            'manualPrices': {'data': [{'type': 'appPrices', 'id': '${free}'}]}}},
        'included': [{'type': 'appPrices', 'id': '${free}', 'attributes': {'startDate': None},
                      'relationships': {'appPricePoint': {'data': {'type': 'appPricePoints', 'id': free['id']}}}}]})
    print('  價格：免費 ✓')
    terrs = [t['id'] for t in get('v1/territories?limit=200')['data']]
    excluded = {'CHN'}
    call('POST', 'v2/appAvailabilities', {
        'data': {'type': 'appAvailabilities', 'attributes': {'availableInNewTerritories': True},
                 'relationships': {
                     'app': {'data': {'type': 'apps', 'id': APP_ID}},
                     'territoryAvailabilities': {'data': [{'type': 'territoryAvailabilities', 'id': f'${{{t}}}'} for t in terrs]}}},
        'included': [{'type': 'territoryAvailabilities', 'id': f'${{{t}}}', 'attributes': {'available': t not in excluded},
                      'relationships': {'territory': {'data': {'type': 'territories', 'id': t}}}} for t in terrs]})
    print(f'  地區：{len(terrs) - len(excluded)} 個上架，排除 {sorted(excluded)} ✓')


def cmd_screenshots(display_type='APP_IPHONE_67', locale='zh-Hant'):
    """上傳 store/screenshots/*.png（1320×2868）。其他語言沒放截圖時，App Store 會沿用主要語言這組。"""
    v = version()
    loc = next(l for l in get(f"v1/appStoreVersions/{v['id']}/appStoreVersionLocalizations")['data']
               if l['attributes']['locale'] == locale)
    sets = get(f"v1/appStoreVersionLocalizations/{loc['id']}/appScreenshotSets")['data']
    sset = next((s for s in sets if s['attributes']['screenshotDisplayType'] == display_type), None)
    if sset:
        for old in get(f"v1/appScreenshotSets/{sset['id']}/appScreenshots")['data']:
            call('DELETE', f"v1/appScreenshots/{old['id']}")
    else:
        sset = call('POST', 'v1/appScreenshotSets', {'data': {
            'type': 'appScreenshotSets', 'attributes': {'screenshotDisplayType': display_type},
            'relationships': {'appStoreVersionLocalization': {
                'data': {'type': 'appStoreVersionLocalizations', 'id': loc['id']}}}}})['data']
    folder = os.path.join(STORE, 'screenshots')
    ids = []
    for name in sorted(f for f in os.listdir(folder) if f.endswith('.png')):
        blob = open(os.path.join(folder, name), 'rb').read()
        shot = call('POST', 'v1/appScreenshots', {'data': {
            'type': 'appScreenshots', 'attributes': {'fileName': name, 'fileSize': len(blob)},
            'relationships': {'appScreenshotSet': {'data': {'type': 'appScreenshotSets', 'id': sset['id']}}}}})['data']
        for op in shot['attributes']['uploadOperations']:
            part = blob[op['offset']:op['offset'] + op['length']]
            req = urllib.request.Request(op['url'], data=part, method=op['method'],
                                         headers={h['name']: h['value'] for h in op.get('requestHeaders', [])})
            urllib.request.urlopen(req).read()
        call('PATCH', f"v1/appScreenshots/{shot['id']}", {'data': {
            'type': 'appScreenshots', 'id': shot['id'],
            'attributes': {'uploaded': True, 'sourceFileChecksum': hashlib.md5(blob).hexdigest()}}})
        ids.append((name, shot['id']))
        print('  上傳', name)
    for _ in range(30):
        states = {n: get(f'v1/appScreenshots/{i}')['data']['attributes']['assetDeliveryState']['state'] for n, i in ids}
        if all(s in ('COMPLETE', 'FAILED') for s in states.values()):
            break
        time.sleep(4)
    for n, i in ids:
        st = get(f'v1/appScreenshots/{i}')['data']['attributes']['assetDeliveryState']
        print('  ', n, st['state'], st.get('errors') or '')


def cmd_build(build_number):
    v = version()
    b = next(b for b in get(f'v1/builds?filter[app]={APP_ID}&filter[version]={build_number}')['data'])
    call('PATCH', f"v1/appStoreVersions/{v['id']}/relationships/build", {'data': {'type': 'builds', 'id': b['id']}})
    print('  版本', v['attributes']['versionString'], '選定 build', build_number, '✓')


REVIEW_NOTES = open(os.path.join(STORE, 'review-notes.txt'), encoding='utf-8').read().strip() \
    if os.path.exists(os.path.join(STORE, 'review-notes.txt')) else ''


def cmd_review_notes():
    v = version()
    # 電話是個人資料，只從環境變數讀，不寫進 repo：ASC_REVIEW_PHONE='+886 …' tools/asc.py review-notes
    phone = os.environ.get('ASC_REVIEW_PHONE')
    if not phone:
        raise SystemExit('需要環境變數 ASC_REVIEW_PHONE（帶國碼）')
    attrs = {'contactFirstName': 'Che-Yu', 'contactLastName': 'Wu', 'contactEmail': 'taiwanmd@monoame.com',
             'contactPhone': phone, 'demoAccountRequired': False, 'notes': REVIEW_NOTES}
    cur = get(f"v1/appStoreVersions/{v['id']}/appStoreReviewDetail").get('data')
    if cur:
        call('PATCH', f"v1/appStoreReviewDetails/{cur['id']}", {'data': {
            'type': 'appStoreReviewDetails', 'id': cur['id'], 'attributes': attrs}})
    else:
        call('POST', 'v1/appStoreReviewDetails', {'data': {
            'type': 'appStoreReviewDetails', 'attributes': attrs,
            'relationships': {'appStoreVersion': {'data': {'type': 'appStoreVersions', 'id': v['id']}}}}})
    print('  審查備註與聯絡人 ✓')


def cmd_submit():
    """送審：建立（或沿用）審查提交、放入版本 1.0、送出。缺什麼 Apple 會逐項回錯誤，不會半途送出。"""
    v = version()
    subs = get(f'v1/reviewSubmissions?filter[app]={APP_ID}&filter[platform]=IOS&limit=20')['data']
    open_sub = next((s for s in subs if s['attributes']['state'] in ('READY_FOR_REVIEW',)), None)
    if not open_sub:
        open_sub = call('POST', 'v1/reviewSubmissions', {'data': {
            'type': 'reviewSubmissions', 'attributes': {'platform': 'IOS'},
            'relationships': {'app': {'data': {'type': 'apps', 'id': APP_ID}}}}})['data']
    items = get(f"v1/reviewSubmissions/{open_sub['id']}/items")['data']
    if not items:
        call('POST', 'v1/reviewSubmissionItems', {'data': {
            'type': 'reviewSubmissionItems',
            'relationships': {'reviewSubmission': {'data': {'type': 'reviewSubmissions', 'id': open_sub['id']}},
                              'appStoreVersion': {'data': {'type': 'appStoreVersions', 'id': v['id']}}}}})
    r = call('PATCH', f"v1/reviewSubmissions/{open_sub['id']}", {'data': {
        'type': 'reviewSubmissions', 'id': open_sub['id'], 'attributes': {'submitted': True}}})
    print('  送審 ✓', r['data']['attributes']['state'], r['data']['attributes'].get('submittedDate'))
    print('  版本狀態', version()['attributes']['appStoreState'])


if __name__ == '__main__':
    cmd = sys.argv[1] if len(sys.argv) > 1 else 'status'
    globals()['cmd_' + cmd.replace('-', '_')](*sys.argv[2:])
