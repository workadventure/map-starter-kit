---
name: upgrade-starter-kit
description: Upgrade a WorkAdventure map repository to the latest version of the map-starter-kit (github.com/workadventure/map-starter-kit) - refreshes package.json dependencies, vite/tsconfig/build config, CI workflow and other scaffolding without touching map content. Use when the user asks to upgrade or update the starter kit, refresh the map build tooling, or bump WorkAdventure map dependencies.
---

# Upgrade a map to the latest map-starter-kit

Maps are created from `map-starter-kit` as a GitHub **template**, so there is usually
**no shared git history** with upstream: `git merge-base` will not work. The anchor is the
`version` field of `package.json`, which upstream bumps when the scaffolding changes.

Golden rule: **upgrade the scaffolding, never the map.** Tile maps, tilesets, images and the
map's own scripts belong to the user. When in doubt, report instead of overwriting.

## 1. Preflight

```bash
git status --porcelain
```

If the working tree is dirty, tell the user and ask whether to continue (a clean tree is what
makes this upgrade reviewable and revertible). Then clone upstream — full history, it is needed
for the baseline in step 3:

```bash
UP=$(mktemp -d)/starter-kit
git clone --quiet https://github.com/workadventure/map-starter-kit.git "$UP"
```

## 2. Self-update (at most once per run)

This skill lives in the starter kit too. If `$UP/.agents/skills/upgrade-starter-kit/SKILL.md`
exists and differs from the local copy, **copy it over the local one, read it, and restart from
step 1 following the new version**. Do this only once - never loop a second time, even if the
file still differs.

If the upstream copy does not exist, carry on with this one.

## 3. Find the baseline and read what changed

```bash
LOCAL=$(node -p "require('./package.json').version")
for c in $(git -C "$UP" log --format=%H -- package.json); do
  [ "$(git -C "$UP" show $c:package.json | node -p "JSON.parse(require('fs').readFileSync(0)).version")" = "$LOCAL" ] && { echo "$c"; break; }
done
```

The first match is the newest upstream commit still carrying the local version: that is the
baseline. Sanity-check its date; if it looks absurd (a version from a side branch, e.g. `1.0.0`)
or nothing matches, skip the baseline and work from the file diffs alone.

With a baseline, read the intent of the upgrade - this is what tells you *why* files changed:

```bash
git -C "$UP" log --oneline --reverse $BASE..HEAD
git -C "$UP" diff --stat $BASE..HEAD
```

## 4. Diff the scaffolding

Compare only these against upstream (`diff <local> $UP/<file>`, and list files upstream added
or removed):

| Path | How to handle |
|---|---|
| `package.json` | Merge, see step 5 |
| `tsconfig.json` | Take upstream, re-apply local additions (extra `paths`, `include`) |
| `vite.config.ts`, `web.vite.config.ts`, `buildmap.vite.config.ts` | Take upstream, re-apply local customisations - **`base:` is almost always customised per map** |
| `app/` | Take upstream as-is |
| `.github/workflows/*.yml` | Take upstream, keep local secrets/branch/path tweaks |
| `.gitignore` | Union: add upstream's new lines, keep local ones |
| `.env` | Add **new keys only**, with upstream's comments. Never change a value the user already set |
| `LICENSE.code` | Take upstream |
| `package-lock.json` | Never copy - regenerate in step 6 |
| `index.html` (repo root) | Delete it if it exists (`git rm index.html`) - the landing page is now served by `@workadventure/map-starter-kit-core`. Also drop any `index: "./index.html"` entry from `buildmap.vite.config.ts` |

Everything else is the user's: `*.tmj` / `*.tmx` / map `*.json`, `*.png`, `tilesets/`, `public/`,
`src/**` (including `src/main.ts`), `README.md`, `LICENSE.map`, `LICENSE.assets`.
If upstream restructured one of those (see step 7), *report* it - do not rewrite it.

## 5. package.json

- Bump every `dependencies` / `devDependencies` entry that exists upstream to upstream's range.
- **Keep local-only dependencies** (a map may add e.g. `@workadventure/quests`) - never drop them.
- Drop a dependency only if upstream removed it *and* nothing under `src/` imports it (grep first).
- Take upstream's `scripts`. If a script was renamed (e.g. `build` -> `buildmap`), grep the repo
  for the old name (CI workflow, README, `.github/`) and update every caller.
- Set `version` to upstream's `version` - this is what makes the next upgrade find the right
  baseline. Keep the local `name` if it was customised.

## 6. Install and verify

```bash
npm install
npm run buildmap   # or `npm run build` if that is the script name in this repo
```

Fix what the build reports (type errors from a TypeScript bump, renamed imports, removed exports).
If the build cannot be made to pass, stop, leave the tree as-is and report exactly what fails -
the user reverts with git.

## 7. Report

Short summary:
- upstream version and commit range applied,
- files changed,
- **manual follow-ups**: structural changes you deliberately did not apply (e.g. the `src/` ->
  `app/` + dual vite-config split, a new hosting mode, a changed upload strategy), each with a
  one-line description of what the user would have to do,
- anything you skipped because it looked like map content.

Do not commit unless the user asks.
