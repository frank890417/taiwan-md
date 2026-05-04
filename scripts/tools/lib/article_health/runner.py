"""article_health.runner — orchestrates checks against a target."""

from __future__ import annotations
from typing import Any

from .config import Config, ProfileConfig
from .registry import discover_checks, get_check
from .types import (
    CheckResult,
    FileTarget,
    HealthReport,
    Severity,
    Violation,
)


def _select_checks(
    profile: ProfileConfig | None,
    config: Config,
    target: FileTarget,
) -> list[Any]:
    """Resolve which check modules to run for this target + profile."""
    discover_checks()
    from .registry import _REGISTRY  # type: ignore[attr-defined]

    if profile is None or profile.checks is None:
        candidates = list(_REGISTRY.values())
    else:
        candidates = [_REGISTRY[c] for c in profile.checks if c in _REGISTRY]

    selected = []
    for mod in candidates:
        # Respect APPLIES_TO lang filter
        applies = getattr(mod, "APPLIES_TO", ["*"])
        if "*" not in applies and target.lang not in applies:
            continue
        # Respect global checks.X.enabled
        cfg = config.get_check_config(mod.CHECK_NAME)
        if not cfg.enabled:
            continue
        selected.append(mod)
    return selected


def _resolve_severity(
    plugin_default: Severity,
    config: Config,
    profile: ProfileConfig | None,
    check_name: str,
) -> Severity:
    """Profile severity override > config severity override > plugin default."""
    if profile is not None and check_name in profile.severity_overrides:
        return profile.severity_overrides[check_name]
    cfg = config.get_check_config(check_name)
    if cfg.severity is not None:
        return cfg.severity
    return plugin_default


def _resolve_options(
    config: Config,
    profile: ProfileConfig | None,
    check_name: str,
) -> dict[str, Any]:
    base = dict(config.get_check_config(check_name).options)
    if profile and check_name in profile.options_overrides:
        base.update(profile.options_overrides[check_name])
    return base


def run_checks(
    target: FileTarget,
    config: Config,
    profile_name: str | None = None,
    check_name: str | None = None,
) -> HealthReport:
    """Run checks against a single target. Returns aggregate HealthReport.

    Args:
      target: prepared FileTarget
      config: parsed Config
      profile_name: name of profile to use (selects subset of checks).
                    If None, runs all enabled checks.
      check_name: if set, run ONLY this check (overrides profile.checks).
    """
    profile = config.get_profile(profile_name) if profile_name else None
    selected = _select_checks(profile, config, target)
    if check_name:
        selected = [m for m in selected if m.CHECK_NAME == check_name]

    report = HealthReport(target=target, results=[])
    for mod in selected:
        resolved_severity = _resolve_severity(
            mod.DEFAULT_SEVERITY, config, profile, mod.CHECK_NAME
        )
        options = _resolve_options(config, profile, mod.CHECK_NAME)

        violations: list[Violation] = []
        try:
            for v in mod.check(target, options):
                # Severity precedence (per design 2026-05-04 SSOT Phase 3):
                # 1. Plugin-yielded severity that DIFFERS from the plugin's
                #    DEFAULT_SEVERITY → authoritative. Lets a single check
                #    yield mixed HARD/WARN violations (e.g. frontmatter-title:
                #    halfwidth punct = HARD, vague adjective = WARN).
                # 2. If plugin yielded the default, profile/config can
                #    override it (resolved_severity).
                # 3. Plugin's DEFAULT_SEVERITY → fallback (already in v).
                if v.severity == mod.DEFAULT_SEVERITY:
                    v.severity = resolved_severity
                violations.append(v)
        except Exception as e:
            violations.append(
                Violation(
                    check=mod.CHECK_NAME,
                    severity=Severity.WARN,
                    message=f"check execution error: {e}",
                )
            )

        result = CheckResult(
            check=mod.CHECK_NAME,
            passed=all(v.severity != Severity.HARD for v in violations),
            violations=violations,
        )
        report.results.append(result)

    return report
