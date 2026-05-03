# RegressProof

`Proof, not guesses, for agent-caused regressions.`

[![RegressProof](https://github.com/tc7kxsszs5-cloud/RegressProof-cli/actions/workflows/regressproof.yml/badge.svg)](https://github.com/tc7kxsszs5-cloud/RegressProof-cli/actions/workflows/regressproof.yml)
![External runs](https://img.shields.io/badge/external_runs-8-success)
![Public repos](https://img.shields.io/badge/public_repos-7-blue)
![Fixtures](https://img.shields.io/badge/fixtures-11%2F11-success)
![License](https://img.shields.io/badge/license-proprietary_source_available-lightgrey)

RegressProof is a standalone CLI and GitHub Action utility for detecting measurable AI coding regressions.
It compares a baseline against a changed state, runs verification commands, maps failures to diffs, and produces evidence-focused reports instead of intuition-only blame.

## Start Here

If you are new to the repository, use this order:

1. `npm install && npm run build`
2. `npm run verify`
3. inspect `/tmp/regressproof-mvp-*/regressproof-mvp-summary.json`
4. inspect `examples/external-runs.json` and `docs/REGRESSPROOF_CASE_STUDIES.md`

That path shows the current self-proof surface first, then the pinned outside-repository evidence.

## Proof Snapshot

Current verified surface:

- `8` curated external validation runs across `7` public repositories
- `11/11` tracked fixtures passing
- standalone committed trust scenario: `successful_change / high`
- standalone deep trust scenario: `successful_change / high`
- external corpus includes TypeScript and Python repositories
- first-class conservative classifications for preexisting and environment failures

Proof artifacts:

- external run catalog: `examples/external-runs.json`
- case studies: `docs/REGRESSPROOF_CASE_STUDIES.md`
- proof ledger: `docs/REGRESSPROOF_PROOF_LEDGER.md`
- validation plan: `docs/REGRESSPROOF_VALIDATION_PLAN.md`

Repository planning and positioning:

- positioning: `docs/REGRESSPROOF_POSITIONING.md`
- product brief: `docs/REGRESSPROOF_PRODUCT_BRIEF.md`
- standalone plan: `docs/REGRESSPROOF_STANDALONE_PLAN.md`

## Canonical Demo Surface

For an external reviewer, the strongest compact demo today is:

1. run `npm run verify`
2. open the generated MVP summary in `/tmp/regressproof-mvp-*/regressproof-mvp-summary.json`
3. confirm that fixtures, trust scenario, and deep trust scenario all complete
4. open `examples/external-runs.json`
5. inspect one pinned public-repository run and its changed-file evidence

One current reviewer-facing example:

- catalog record: `examples/external-runs.json` -> `zustand-persist-2026-05-01`
- repository: `pmndrs/zustand`
- committed range: `6213fc11bdf096301a82ae5c236b5a666a4ee3ca~1..6213fc11bdf096301a82ae5c236b5a666a4ee3ca`
- verdict: `successful_change / high`
- changed files:
  - `src/middleware/persist.ts`
  - `tests/persistAsync.test.tsx`
- artifact path recorded in catalog:
  - `/tmp/regressproof-zustand-persist-artifacts/regressproof-report.json`

This is the proof surface to optimize for: a reviewer can see the diff range, the touched files, the verdict, and where the full artifact lives.

## What A Reviewer Actually Gets

RegressProof is most useful when the output answers review questions quickly:

| Reviewer question | RegressProof surface |
| --- | --- |
| Did a new failure appear, or was it already there? | `introducedFailures` vs `preexistingFailures` |
| Does the failure map back to the diff? | changed files, `matchedChangedFiles`, changed-file match fields |
| Is the tool making a strong claim or a cautious one? | `verdict` plus `confidence` |
| What should CI do? | configurable CI exit policy driven by verdict class |
| Where is the raw evidence? | JSON report, Markdown summary, PR summary, PR comment body, JSONL ledger |

## Why Not Just CI Or Tests?

Normal CI is necessary, but it usually answers only:

- did a check fail?
- is the branch red or green?

RegressProof is trying to answer the next layer:

- was the failure newly introduced relative to a baseline?
- does the failure point back to files changed in the patch?
- is this better classified as `confirmed_agent_fault`, `preexisting_failure`, `environment_failure`, or `insufficient_evidence`?

So the value is not "tests, but again."
The value is baseline-aware interpretation, diff-aware evidence, and conservative fault classification around the tests you already trust.

## Legal Status

RegressProof is proprietary source-available software unless a separate written agreement says otherwise.
See `LICENSE` and `NOTICE.md`.

## MVP Scope

Current MVP capabilities:

- local CLI execution
- GitHub Action execution
- baseline vs current quick-check verification
- diff-aware changed-file mapping
- conservative verdict classes
- JSON and Markdown artifacts
- append-only internal ledger output
- tracked fixture packs for reproducible validation
- committed real-repo trust scenarios
- curated public-repository validation catalog

## Stable Commands

Preferred top-level commands:

```bash
npm run verify
npm run trust
npm run trust:deep
npm run readiness
npm run standalone:export
```

These aliases keep the public workflow easier to remember while preserving the lower-level scripts used by the validation harness.

## Current Proof Status

RegressProof is now beyond fixture-only proof.

What is already confirmed:

- full `verify-mvp` passes end-to-end
- fixture suite passes `11/11`
- committed trust scenario passes on the standalone repository
- committed deep trust scenario passes on the standalone repository
- external public-repository validation has been exercised on:
  - docs/plugin repositories
  - larger docs/configuration repositories
  - code-plus-test repositories
  - Python code-plus-test repositories
  - larger code repositories with provider-oriented tests

Most recent external run:

- repository: `pmndrs/zustand`
- pinned range: `6213fc11bdf096301a82ae5c236b5a666a4ee3ca~1..6213fc11bdf096301a82ae5c236b5a666a4ee3ca`
- repo-specific result: `successful_change / high` on a persist rehydration latest-state callback slice
- changed-file evidence includes `src/middleware/persist.ts` and `tests/persistAsync.test.tsx`

Further reading:

- `docs/REGRESSPROOF_CASE_STUDIES.md`
- `examples/README.md`

Current verdict classes:

- `successful_change`
- `confirmed_agent_fault`
- `preexisting_failure`
- `environment_failure`
- `insufficient_evidence`

## Quick Start

Install dependencies and build:

```bash
npm install
npm run build
```

Run the main MVP verification flow:

```bash
npm run verify:mvp
```

This runs:

- the tracked fixture suite
- the committed trust scenario
- the deeper committed trust scenario

The final summary is written to:

- `/tmp/regressproof-mvp-*/regressproof-mvp-summary.json`

## Try It On Your Repository

The most honest first run is a narrow, stable verification slice on a real committed diff.

Recommended first pass:

1. start from this repository's `regressproof.config.json` shape
2. keep the first check set small and meaningful
3. use checks that already pass reliably on both `HEAD~1` and `HEAD`
4. inspect the artifacts before widening scope

Build RegressProof once:

```bash
npm install
npm run build
```

Run a local report against your repository:

```bash
node dist/cli.js run \
  --repo /path/to/your-repo \
  --config /path/to/your-repo/regressproof.config.json \
  --artifact-dir /tmp/regressproof-your-repo \
  --format json
```

Check whether the current committed range is ready for diff-aware validation:

```bash
npm run real:readiness -- --repo /path/to/your-repo
```

Run the committed validation flow on your repository:

```bash
node scripts/run-committed-real-repo-validation.js \
  --repo /path/to/your-repo \
  --config /path/to/your-repo/regressproof.config.json \
  --head-ref HEAD \
  --artifact-dir /tmp/regressproof-your-repo-committed
```

If you want a public-repository-style temporary clone flow instead, adapt one of the configs in `examples/` and use:

```bash
npm run real:public -- \
  --url https://github.com/owner/repo.git \
  --config ./examples/external-doc-plugin.config.json \
  --head-ref HEAD \
  --artifact-dir /tmp/regressproof-public-demo
```

Good first targets are:

- one fast build command
- one targeted test command
- changed files that stay inside that verification boundary

## Core Commands

Run the fixture suite:

```bash
npm run fixtures:run-all
```

Run the committed trust scenario against the current repository:

```bash
npm run real:scenario
```

Run the deeper committed trust scenario:

```bash
npm run real:scenario:deep
```

Run committed validation directly:

```bash
npm run real:committed -- --repo .
```

List curated public-repository validation evidence:

```bash
npm run external:runs
```

Validate the external-run catalog schema:

```bash
npm run external:check
```

Plan the next external corpus pass:

```bash
npm run external:run-corpus
```

The corpus runner intentionally treats queue entries as candidates until they are promoted with pinned execution metadata.
Use `--execute --id <candidate-id>` only after adding a repository-specific config, pinned `headRef`, and artifact directory.

Check whether a committed range is ready for trust validation:

```bash
npm run real:readiness -- --repo .
```

Build the distributable `dist/` output:

```bash
npm run build
```

Run the CLI directly from source:

```bash
node src/cli.js run --repo ./fixtures/simple-js --format json
```

## Expected Repository Layout

The standalone layout is:

- `src/`
- `scripts/`
- `fixtures/`
- `docs/REGRESSPROOF_*.md`
- `regressproof.config.json`
- `regressproof.real-repo.config.json`

The standalone real-repo config assumes verification is executed from the repository root.

## Fixture Workflow

Fixtures use tracked scenario packs:

- `tracked/baseline`
- `tracked/current`
- `fixture.materializer.json`

Preferred flow:

1. materialize a fixture into a temporary git repository
2. run RegressProof against that temporary repo

Example:

```bash
node scripts/materialize-fixture.js \
  --fixture ./fixtures/lint-js \
  --out-dir /tmp/regressproof-materialized-lint

node src/cli.js run \
  --repo /tmp/regressproof-materialized-lint/repo \
  --config /tmp/regressproof-materialized-lint/repo/regressproof.config.json \
  --format json
```

Helpers:

```bash
npm run fixture:materialize -- --fixture ./fixtures/lint-js
npm run fixture:export-pack -- --fixture ./fixtures/lint-js
npm run fixtures:export-all-packs
```

## Real-Repo Trust Flow

The committed trust flow is meant to prove that RegressProof can validate itself or another repository through a real `HEAD~1..HEAD` range instead of only through isolated fixtures.

What the trust flow asserts:

- committed readiness is `ready`
- `diffRange` is `HEAD~1..HEAD`
- baseline mode is `path_snapshot`
- current mode is `snapshot`
- verdict is `successful_change`
- confidence is `high`

The deep trust flow uses a broader nested subset:

- `lint-js`
- `preexisting-js`
- `parser-js`
- `python-js`

## External Validation Notes

RegressProof can now be demonstrated on public repositories outside its own codebase.

That does **not** mean every repository can be judged with one universal config.
For code-heavy repositories, the most honest path is:

1. choose a committed range such as `HEAD~1..HEAD`
2. define a repository-appropriate build/test slice
3. classify the result conservatively

This is already enough to show that RegressProof works as a real validation layer, not only as an internal demo.

## Reports And Artifacts

Each run can emit:

- `regressproof-report.json`
- `regressproof-summary.md`
- `regressproof-pr-summary.md`
- `regressproof-pr-comment.md`
- append-only ledger JSONL

Use `--artifact-dir` to control where they are written.

Example:

```bash
node src/cli.js run \
  --repo /tmp/regressproof-materialized-lint/repo \
  --config /tmp/regressproof-materialized-lint/repo/regressproof.config.json \
  --format json \
  --artifact-dir /tmp/regressproof-artifacts
```

In CI mode, RegressProof exits non-zero only for configured verdict classes:

```bash
node src/cli.js run \
  --repo /tmp/regressproof-materialized-lint/repo \
  --config /tmp/regressproof-materialized-lint/repo/regressproof.config.json \
  --format json \
  --artifact-dir /tmp/regressproof-artifacts \
  --ci
```

## External Repository Example

Example configs for validating external repositories live at:

- `examples/external-doc-plugin.config.json`
- `examples/external-click-flag-value.config.json`
- `examples/external-ky-hooks.config.json`
- `examples/external-nanostores-global-epoch.config.json`
- `examples/external-ofetch-timeout-signal.config.json`
- `examples/external-openclaw-code.config.json`
- `examples/external-pluggy-pluginmanager.config.json`
- `examples/external-oh-my-codex-stable-slice.config.json`
- `examples/README.md`

Example:

```bash
node scripts/run-committed-real-repo-validation.js \
  --repo /tmp/andrej-karpathy-skills \
  --config ./examples/external-doc-plugin.config.json \
  --head-ref HEAD \
  --artifact-dir /tmp/regressproof-external-doc-plugin
```

For public GitHub repositories that should be cloned into a temporary workspace first, use:

```bash
npm run real:public -- \
  --url https://github.com/openclaw/openclaw.git \
  --config ./examples/external-openclaw-code.config.json \
  --head-ref 97534372f858b5f67a98619a3fed8790edb00cc7 \
  --artifact-dir /tmp/regressproof-openclaw-pinned-artifacts
```

## Embedded Workspace Mode

This repository currently lives inside a larger workspace, so there is also a workspace-oriented config:

- `regressproof.workspace-repo.config.json`

That config exists to keep local development inside the larger workspace working.
The default product direction is still standalone-first.

## Canonical Docs

Read these first when resuming work:

1. `docs/REGRESSPROOF_INDEX.md`
2. `docs/REGRESSPROOF_PRODUCT_BRIEF.md`
3. `docs/REGRESSPROOF_SPEC.md`
4. `docs/REGRESSPROOF_IMPLEMENTATION_PLAN.md`
5. `docs/REGRESSPROOF_MVP_TASK_BREAKDOWN.md`
6. `docs/REGRESSPROOF_VALIDATION_PLAN.md`
7. `docs/REGRESSPROOF_DECISION_LOG.md`
