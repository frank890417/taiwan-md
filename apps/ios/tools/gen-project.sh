#!/bin/bash
# 由 project.yml 重產 TaiwanMD.xcodeproj（需要 brew install xcodegen）。兩者都進 git。
set -euo pipefail
cd "$(dirname "$0")/.."
xcodegen generate --spec project.yml
