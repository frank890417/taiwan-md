#!/usr/bin/env python3
"""
twinkle-hub-verify.py — Twinkle Hub deterministic verify CLI

per reports/research/2026-05/twinkle-hub-application-2026-05-11.md §4 strongest application
per MANIFESTO §10 幻覺鐵律 + DNA #23 毒樹果實鏈
per MANIFESTO §薄殼鐵律 — thin wrapper around https://api.twinkleai.tw/mcp/

Reads Twinkle AI Hub API key from macOS Keychain:
    security find-generic-password -a "user-7078de67" -s "twinkleai-hub-api-key" -w

Provides deterministic verify functions for hallucination patterns:
    - ROC year ↔ Western year (pattern #1 獎項幻覺 年份)
    - Administrative district lookup (pattern #3 地點錯置)
    - Address normalization (pattern #6 場景動作 + 場地細節)
    - ROC ID checksum (人物文章 unique ID 驗證)
    - Government agency / bank code lookup
    - MRT station / line lookup (transport articles)
    - Taiwan business day / holidays

Usage:
    python3 scripts/tools/twinkle-hub-verify.py --tool=roc_year_to_western --arg=roc_date=113
    python3 scripts/tools/twinkle-hub-verify.py --tool=normalize_taiwan_address --arg=address="台北市中山區中山北路二段45號"
    python3 scripts/tools/twinkle-hub-verify.py --list-tools
    python3 scripts/tools/twinkle-hub-verify.py --schema=normalize_taiwan_address

Exit code: 0 = pass, 1 = tool error / network error
"""

import argparse
import json
import re
import subprocess
import sys
import urllib.request
import urllib.error

MCP_ENDPOINT = "https://api.twinkleai.tw/mcp/"
KEYCHAIN_ACCOUNT = "user-7078de67"
KEYCHAIN_SERVICE = "twinkleai-hub-api-key"


def get_api_key():
    """Read Bearer token from macOS Keychain. Fail-loud if missing."""
    try:
        return subprocess.check_output(
            [
                "security",
                "find-generic-password",
                "-a",
                KEYCHAIN_ACCOUNT,
                "-s",
                KEYCHAIN_SERVICE,
                "-w",
            ],
            stderr=subprocess.STDOUT,
        ).decode().strip()
    except subprocess.CalledProcessError:
        print(
            f"❌ Keychain miss: account={KEYCHAIN_ACCOUNT} service={KEYCHAIN_SERVICE}",
            file=sys.stderr,
        )
        print(
            "   per reports/research/2026-05/twinkle-hub-application-2026-05-11.md §1.4",
            file=sys.stderr,
        )
        sys.exit(1)


def mcp_call(method, params=None, request_id=1):
    """POST JSON-RPC 2.0 to MCP endpoint, parse SSE response, return result."""
    api_key = get_api_key()
    payload = {"jsonrpc": "2.0", "id": request_id, "method": method}
    if params is not None:
        payload["params"] = params
    body = json.dumps(payload).encode("utf-8")
    req = urllib.request.Request(
        MCP_ENDPOINT,
        data=body,
        headers={
            "Content-Type": "application/json",
            "Accept": "application/json, text/event-stream",
            "Authorization": f"Bearer {api_key}",
        },
        method="POST",
    )
    try:
        with urllib.request.urlopen(req, timeout=30) as resp:
            text = resp.read().decode("utf-8")
    except urllib.error.HTTPError as e:
        print(f"❌ HTTP {e.code}: {e.read().decode('utf-8')[:200]}", file=sys.stderr)
        sys.exit(1)
    except urllib.error.URLError as e:
        print(f"❌ Network error: {e}", file=sys.stderr)
        sys.exit(1)

    # Parse SSE: lines like "event: message" / "data: {...}"
    m = re.search(r"^data: (.+)$", text, re.MULTILINE)
    if not m:
        print(f"❌ No SSE data line in response:\n{text[:400]}", file=sys.stderr)
        sys.exit(1)
    try:
        return json.loads(m.group(1))
    except json.JSONDecodeError as e:
        print(f"❌ Invalid JSON in SSE data: {e}\n{m.group(1)[:400]}", file=sys.stderr)
        sys.exit(1)


def call_tool(tool_name, arguments):
    """Call a specific MCP tool with arguments dict. Returns parsed result."""
    response = mcp_call(
        "tools/call",
        params={"name": tool_name, "arguments": arguments},
    )
    if "error" in response:
        return {"ok": False, "error": response["error"]}
    result = response.get("result", {})
    if result.get("isError"):
        msg = (
            result.get("content", [{}])[0].get("text", "")
            if result.get("content")
            else "Unknown error"
        )
        return {"ok": False, "error": msg}

    # Parse content[0].text as JSON if possible (twinkle returns JSON strings)
    content = result.get("content", [])
    if content and content[0].get("type") == "text":
        text = content[0]["text"]
        try:
            parsed = json.loads(text)
            return {"ok": True, "data": parsed}
        except json.JSONDecodeError:
            return {"ok": True, "data": text}
    return {"ok": True, "data": result}


def list_tools():
    """Enumerate all available MCP tools."""
    response = mcp_call("tools/list", params={}, request_id=999)
    return response.get("result", {}).get("tools", [])


def get_tool_schema(tool_name):
    """Return inputSchema for a single tool, or None if not found."""
    for t in list_tools():
        if t["name"] == tool_name:
            return t.get("inputSchema", {})
    return None


def parse_arg_kv(arg_strings, json_strings):
    """
    --arg key=value  → always string (most tools expect strings)
    --json-arg key=jsonValue  → parsed as JSON (integer / boolean / array / object)

    Two-tier protocol because some tools need string ROC date "113" while others
    need integer year 2024; auto-coercion would break the former (per smoke test
    on twtools-roc_year_to_western where roc_date='113' must be string).
    """
    args = {}
    for s in arg_strings:
        if "=" not in s:
            print(f"❌ Bad --arg format: {s} (expected key=value)", file=sys.stderr)
            sys.exit(1)
        k, v = s.split("=", 1)
        args[k] = v
    for s in json_strings:
        if "=" not in s:
            print(f"❌ Bad --json-arg format: {s} (expected key=jsonValue)", file=sys.stderr)
            sys.exit(1)
        k, v = s.split("=", 1)
        try:
            args[k] = json.loads(v)
        except json.JSONDecodeError as e:
            print(f"❌ Invalid JSON for --json-arg {k}: {e}", file=sys.stderr)
            sys.exit(1)
    return args


def main():
    parser = argparse.ArgumentParser(
        description="Twinkle Hub MCP deterministic verify CLI"
    )
    parser.add_argument(
        "--tool",
        help="MCP tool name (e.g. twtools-roc_year_to_western; prefix twtools- optional)",
    )
    parser.add_argument(
        "--arg",
        action="append",
        default=[],
        help="key=value tool argument as STRING (repeat for multiple)",
    )
    parser.add_argument(
        "--json-arg",
        action="append",
        default=[],
        dest="json_arg",
        help="key=jsonValue tool argument parsed as JSON (int/bool/array/etc; repeat for multiple)",
    )
    parser.add_argument(
        "--list-tools",
        action="store_true",
        help="List all available MCP tools",
    )
    parser.add_argument(
        "--schema",
        help="Show inputSchema for a specific tool",
    )
    parser.add_argument(
        "--format",
        choices=["human", "json"],
        default="human",
        help="output format",
    )
    args = parser.parse_args()

    if args.list_tools:
        tools = list_tools()
        if args.format == "json":
            print(json.dumps([t["name"] for t in tools], indent=2))
        else:
            tw = [t["name"] for t in tools if t["name"].startswith("twtools-")]
            od = [t["name"] for t in tools if t["name"].startswith("opendata-")]
            print(f"🧬 Twinkle Hub MCP tools ({len(tools)} total)")
            print(f"\n--- twtools-* ({len(tw)}) ---")
            for n in sorted(tw):
                print(f"  {n}")
            print(f"\n--- opendata-* ({len(od)}) ---")
            for n in sorted(od):
                print(f"  {n}")
        return

    if args.schema:
        tool_name = args.schema if args.schema.startswith(("twtools-", "opendata-")) else f"twtools-{args.schema}"
        schema = get_tool_schema(tool_name)
        if schema is None:
            print(f"❌ Tool not found: {tool_name}", file=sys.stderr)
            sys.exit(1)
        print(json.dumps(schema, indent=2, ensure_ascii=False))
        return

    if not args.tool:
        parser.error("either --tool, --list-tools, or --schema is required")

    tool_name = args.tool if args.tool.startswith(("twtools-", "opendata-")) else f"twtools-{args.tool}"
    arguments = parse_arg_kv(args.arg, args.json_arg)
    result = call_tool(tool_name, arguments)

    if args.format == "json":
        print(json.dumps(result, indent=2, ensure_ascii=False))
    else:
        if result["ok"]:
            print(f"✅ {tool_name}")
            data = result["data"]
            if isinstance(data, dict):
                print(json.dumps(data, indent=2, ensure_ascii=False))
            else:
                print(data)
        else:
            print(f"❌ {tool_name}: {result['error']}", file=sys.stderr)
            sys.exit(1)


if __name__ == "__main__":
    main()
