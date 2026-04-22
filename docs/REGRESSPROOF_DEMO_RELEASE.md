# RegressProof Demo Release Archive

**Original date:** 14 April 2026
**Status:** Archived prototype package note
**Current home:** standalone `RegressProof-cli` repository

This note was moved into the standalone project tree so earlier demo-package
memory is not stranded in old workspace exports.

## What The Prototype Demo Included

- local CLI runner
- baseline vs current quick-check comparison
- fixture scenario packs for:
  - introduced failure
  - preexisting failure
  - timeout / environment failure
- JSON report artifact
- full markdown summary
- compact PR summary
- PR comment body artifact
- GitHub Action skeleton
- estimated usage and internal credit scaffold

## Original Demo Commands

The original embedded workspace commands used `cd regressproof` and paths under
`/Users/mac/Desktop/rork-kiku`. For the current standalone repository, prefer
the root-level commands documented in `README.md`.

Current equivalents:

```bash
node scripts/run-all-fixtures.js --out-dir /tmp/regressproof-fixtures
node scripts/verify-mvp.js --repo "$PWD" --out-dir /tmp/regressproof-mvp
npm run external:runs
npm run external:check
```

## Expected Demo Artifacts

- `regressproof-report.json`
- `regressproof-summary.md`
- `regressproof-pr-summary.md`
- `regressproof-pr-comment.md`

## Product Story Preserved From The Prototype

RegressProof can prove:

- whether a failure is newly introduced
- whether a failure already existed before the current change
- whether a timeout should be treated as environment evidence
- whether CI should fail based on a verdict policy

It also prepares the next product layer:

- PR review integration
- cost accountability
- internal credits for confirmed agent-caused regressions
- reproducible tracked fixture validation through self-contained scenario packs

## Current Note

The project has moved beyond this prototype package.

The current source of truth is:

- `docs/REGRESSPROOF_INDEX.md`
- `docs/REGRESSPROOF_VALIDATION_PLAN.md`
- `docs/REGRESSPROOF_CASE_STUDIES.md`
- `examples/external-runs.json`
- the latest note in `docs/sessions/`
