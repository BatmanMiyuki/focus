#!/usr/bin/env bash
# Focus — pousse les changements sur GitHub (branche main).
# Le token est lu depuis ~/.gh_token (jamais commité).
set -e
cd "$(dirname "$0")"

REPO="BatmanMiyuki/focus"
TOKEN="${GH_TOKEN:-$(cat "$HOME/.gh_token" 2>/dev/null || true)}"
if [ -z "$TOKEN" ]; then echo "❌ Token manquant : écris-le dans ~/.gh_token"; exit 1; fi

[ -d .git ] || git init -q
git config user.name  "BatmanMiyuki"
git config user.email "batmanmiyuki@users.noreply.github.com"
git remote remove origin 2>/dev/null || true
git remote add origin "https://x-access-token:${TOKEN}@github.com/${REPO}.git"

git add -A
git commit -m "${1:-Focus : mise à jour}" || echo "ℹ️  Rien de nouveau à committer"
git branch -M main
git push -u origin main
echo "✅ Poussé sur https://github.com/${REPO}"
