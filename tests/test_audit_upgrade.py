import importlib.util
import sys
from pathlib import Path
from datetime import datetime, timezone
ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / 'scripts/tools'))
from lib.routine_decisions import enforce_decisions
spec = importlib.util.spec_from_file_location('analytics_upgrade', ROOT / 'scripts/tools/generate-dashboard-analytics.py')
analytics = importlib.util.module_from_spec(spec)
spec.loader.exec_module(analytics)

def test_source_age_is_not_build_time():
    now = datetime(2026,9,7,tzinfo=timezone.utc)
    assert analytics.source_provenance({'fetched_at':'2026-09-06T00:00:00Z'}, now=now)['status'] == 'fresh'
    assert analytics.source_provenance({'fetched_at':'2026-08-01T00:00:00Z'}, now=now)['status'] == 'stale'
    assert analytics.source_provenance({'fetched_at':'2026-09-06T00:00:00'}, now=now)['status'] == 'unknown'
    assert analytics.source_provenance(None, {'fetchedAt':'old'}, now)['fetchedAt'] == 'old'
    assert analytics.source_provenance({'error':'denied'}, now=now)['status'] == 'error'
    assert analytics.build_ga_section({'error':'denied'}) is None

def test_crawler_statuses_survive_conversion():
    totals = {'http3xx':20,'http4xx':3,'http5xx':1,'http200':76,'successRateExcl3xx':95}
    out=analytics.build_ai_crawlers_dashboard({'totals':totals,'crawlers':[{'name':'bot',**totals}]})
    for key,value in totals.items():
        assert out[key] == value
        assert out['crawlers'][0][key] == value

def test_manual_decision_cannot_be_reenabled():
    import pytest
    text=(ROOT/'docs/semiont/ROUTINE.md').read_text(encoding="utf-8")
    tasks={x:{'enabled':False} for x in ['twmd-rewrite-daily','twmd-spore-pick-daily','twmd-spore-publish-daily']}
    assert all(v['decision']['due_date'] is None for v in enforce_decisions(tasks,text).values())
    tasks['twmd-rewrite-daily']['enabled']=True
    with pytest.raises(ValueError): enforce_decisions(tasks,text)
