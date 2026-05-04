"""footnote_url — verify footnote URL reachability via HEAD.

Migrated from `scripts/tools/check-footnote-urls.sh`.

**Network-bound — disabled by default.** Enable per-run via:
  python3 scripts/tools/article-health.py file.md --check=footnote-url
  ARTICLE_HEALTH_NETWORK=1 python3 ...  (env var)
  options.network=true (config)

Reason: blind HEAD on every commit slows pre-commit by 10-30s and
fails on flaky links. Best run as Stage 3.5 manual check or scheduled
cron sweep, not as gate.

Severity: WARN by default. 4xx/5xx surface as warnings (won't block PR).
"""

from __future__ import annotations
import os
import re
from typing import Any, Iterator

from ..types import FileTarget, Severity, Violation


CHECK_NAME = "footnote-url"
DIMENSION = "citation"
DEFAULT_SEVERITY = Severity.WARN
EDITORIAL_REF = "check-footnote-urls.sh"
APPLIES_TO = ["*"]

_RE_FOOTNOTE_URL = re.compile(
    r"^\[\^[0-9a-zA-Z_-]+\]:\s*\[[^\]]+\]\((https?://[^)\s]+)\)",
    re.MULTILINE,
)


def _network_enabled(config: dict[str, Any]) -> bool:
    if os.environ.get("ARTICLE_HEALTH_NETWORK") == "1":
        return True
    return bool(config.get("network", False))


def _check_url(url: str, timeout: float = 5.0) -> tuple[bool, int | None, str]:
    """Returns (ok, status_code, message). ok = True if 2xx/3xx."""
    try:
        import urllib.request
        import urllib.error

        req = urllib.request.Request(url, method="HEAD")
        with urllib.request.urlopen(req, timeout=timeout) as resp:
            status = resp.status
            return (200 <= status < 400, status, "")
    except urllib.error.HTTPError as e:
        # Some servers reject HEAD; retry GET with a small range
        try:
            req2 = urllib.request.Request(url, method="GET")
            req2.add_header("Range", "bytes=0-0")
            with urllib.request.urlopen(req2, timeout=timeout) as resp:
                status = resp.status
                return (200 <= status < 400, status, "")
        except Exception as e2:
            return (False, getattr(e, "code", None), f"{e}; retry: {e2}")
    except urllib.error.URLError as e:
        return (False, None, f"URLError: {e.reason}")
    except Exception as e:
        return (False, None, str(e))


def check(target: FileTarget, config: dict[str, Any]) -> Iterator[Violation]:
    if not _network_enabled(config):
        return

    body = target.body
    seen: set[str] = set()
    for m in _RE_FOOTNOTE_URL.finditer(body):
        url = m.group(1).rstrip(",;:.")  # trim common trailing punct
        if url in seen:
            continue
        seen.add(url)
        line = body.count("\n", 0, m.start()) + 1
        ok, status, msg = _check_url(url)
        if ok:
            continue
        status_str = f"HTTP {status}" if status else (msg or "no response")
        yield Violation(
            check=CHECK_NAME,
            severity=DEFAULT_SEVERITY,
            message=f"腳註 URL 無法存取 ({status_str}): {url[:80]}",
            line=line,
            snippet=url,
            editorial_ref=EDITORIAL_REF,
        )
