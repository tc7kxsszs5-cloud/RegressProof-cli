# RegressProof

`Proof, not guesses, for agent-caused regressions.`

RegressProof is a local CLI and CI validation layer for AI coding regressions. It compares a baseline snapshot against a current change, classifies what actually changed, and emits evidence-focused reports instead of intuition-only blame.

## Why RegressProof

RegressProof exists to answer a specific question that normal CI and vague AI evaluation layers usually do not answer cleanly:

`Did this agent-driven change introduce a measurable new regression, and can we prove it?`

### What RegressProof Is

- a proof-based regression detection layer for agent-generated code changes
- a baseline-vs-current verification system
- a diff-aware attribution tool
- a cost and internal credit accountability layer

### What RegressProof Is Not

- not just another test runner
- not a generic CI wrapper
- not a vague "AI quality score"
- not a promise of provider token refunds

### How It Differs From CI

Normal CI tells you whether checks are red or green.

RegressProof tries to answer the harder follow-up questions:

- was the failure already there before this change?
- is the failure newly introduced?
- does the evidence point to code the agent actually touched?
- is this more likely an agent fault, a preexisting problem, or an environment issue?

### How It Differs From Vague AI Eval Tools

Many AI coding evaluation layers produce broad quality impressions or benchmark-style scores.

RegressProof is narrower and more operational:

- it works against real repository history
- it compares baseline and current verification results
- it emits explicit verdict classes
- it shows the evidence that supports the verdict

## Two Quick Examples

### Example 1: Preexisting Failure

Before:

- baseline test already fails
- current change does not make it worse

What plain CI shows:

- red

What RegressProof can show:

- `preexisting_failure`
- not evidence that the current agent caused the regression

### Example 2: New Regression In Changed Code

Before:

- baseline typecheck passes

After:

- current typecheck fails
- failure points to a changed file

What plain CI shows:

- red

What RegressProof can show:

- `confirmed_agent_fault`
- high-confidence evidence tied to the changed file

Current MVP capabilities:

- local CLI execution
- baseline vs current quick-check verification
- diff-aware changed-file mapping
- conservative verdict classes
- JSON and Markdown artifacts
- append-only internal ledger output
- tracked fixture suite for reproducible validation
- real-repo trust scenarios for self-validation inside this repository

The runtime is plain Node.js. In this repository, the most reliable commands are `node ...` commands first; `npm run ...` is only a convenience layer when `npm` is available in the environment.

Validated fixture coverage currently includes:

- `simple-js`
- `lint-js`
- `preexisting-js`
- `mixed-js`
- `build-js`
- `test-js`
- `timeout-js`
- `parser-js`
- `python-js`
- `swift-js`
- `swiftpm-macos`

Primary fixture model:

- tracked scenario packs under each fixture directory
- `tracked/baseline`
- `tracked/current`
- `fixture.materializer.json`
- the tracked-pack suite now passes `11/11`

## Quick Start

Verify the whole MVP in one shot:

```bash
cd /path/to/RegressProof-cli
node scripts/verify-mvp.js --repo "$PWD" --out-dir /tmp/regressproof-mvp
```

This is the main "does the repo work?" command. It runs:

- the full tracked fixture suite
- the committed real-repo trust scenario
- the deeper committed real-repo scenario

The final summary lands in:

- `/tmp/regressproof-mvp/regressproof-mvp-summary.json`

Run the fixture suite only:

```bash
cd /path/to/RegressProof-cli
node scripts/run-all-fixtures.js --out-dir /tmp/regressproof-fixtures
```

Run the main committed trust scenario:

```bash
cd /path/to/RegressProof-cli
node scripts/verify-real-repo-trust-scenario.js --repo "$PWD" --out-dir /tmp/regressproof-real-scenario
```

Run the deeper committed trust scenario:

```bash
cd /path/to/RegressProof-cli
node scripts/verify-real-repo-deep-scenario.js --repo "$PWD" --out-dir /tmp/regressproof-real-deep-scenario
```

If `npm` is available, the same entrypoints are exposed as:

```bash
cd /path/to/RegressProof-cli
npm run verify:mvp
```

## External Repository Example

RegressProof can also validate a lightweight external repository that has docs and plugin metadata instead of a normal test suite.

Example config:

- [examples/external-doc-plugin.config.json](/tmp/RegressProof-cli/examples/external-doc-plugin.config.json:1)

Example command against a cloned external repo:

```bash
cd /path/to/RegressProof-cli
node scripts/run-committed-real-repo-validation.js \
  --repo /tmp/andrej-karpathy-skills \
  --config examples/external-doc-plugin.config.json \
  --head-ref HEAD \
  --artifact-dir /tmp/regressproof-external-doc-plugin
```

That config assumes the target repo has:

- `README.md`
- `CLAUDE.md`
- `.claude-plugin/plugin.json`
- `.claude-plugin/marketplace.json`

and validates:

- required file presence
- basic plugin and marketplace JSON structure
- README mentions the CLAUDE/plugin install flow

## CLI Usage

Direct local run:

```bash
cd /path/to/RegressProof-cli
node src/cli.js run --repo fixtures/simple-js --format json
```

Build `dist/` explicitly:

```bash
cd /path/to/RegressProof-cli
node scripts/build.js
```

Preferred fixture flow:

1. materialize the fixture into a temp git repo
2. run RegressProof against that temp repo

Example:

```bash
cd /path/to/RegressProof-cli
node scripts/materialize-fixture.js \
  --fixture fixtures/lint-js \
  --out-dir /tmp/regressproof-materialized-lint

node src/cli.js run \
  --repo /tmp/regressproof-materialized-lint/repo \
  --config /tmp/regressproof-materialized-lint/repo/regressproof.config.json \
  --format json
```

Fixture materialization helper:

```bash
cd /path/to/RegressProof-cli
npm run fixture:materialize -- --fixture fixtures/lint-js
```

Current materializer behavior:

- tracked scenario packs are materialized into temporary git repos first
- embedded fixture repos are treated only as import sources when exporting packs
- baseline and current snapshots are exported alongside the temp repo

Fixture scenario-pack export helper:

```bash
cd /path/to/RegressProof-cli
npm run fixture:export-pack -- --fixture fixtures/lint-js
```

This exports `baseline` and `current` trees under `tracked/` and writes `fixture.materializer.json`, which makes the tracked scenario-pack path self-contained.

Bulk scenario-pack export:

```bash
cd /path/to/RegressProof-cli
node scripts/export-all-fixture-packs.js
```

This walks every fixture source and refreshes tracked `baseline/current` packs.

Fixture suite runner:

```bash
cd /path/to/RegressProof-cli
node scripts/run-all-fixtures.js
```

This runner:

- materializes each fixture
- runs RegressProof against the materialized repo
- continues through the whole suite without stopping on the first failure
- writes a JSON summary plus per-fixture artifacts under a temporary output directory

Current tracked-pack suite result:

- `11/11 passed`
- summary example: `/tmp/regressproof-suite-now/fixture-suite-summary.json`

Write artifacts explicitly from a materialized fixture:

```bash
cd /path/to/RegressProof-cli
node scripts/materialize-fixture.js \
  --fixture fixtures/simple-js \
  --out-dir /tmp/regressproof-materialized-simple

node src/cli.js run \
  --repo /tmp/regressproof-materialized-simple/repo \
  --config /tmp/regressproof-materialized-simple/repo/regressproof.config.json \
  --format json \
  --artifact-dir /tmp/regressproof-artifacts
```

Run in CI mode:

```bash
cd /path/to/RegressProof-cli
node scripts/materialize-fixture.js \
  --fixture fixtures/simple-js \
  --out-dir /tmp/regressproof-materialized-simple

node src/cli.js run \
  --repo /tmp/regressproof-materialized-simple/repo \
  --config /tmp/regressproof-materialized-simple/repo/regressproof.config.json \
  --format json \
  --artifact-dir /tmp/regressproof-artifacts \
  --ci
```

In CI mode, RegressProof exits non-zero only for configured verdicts such as `confirmed_agent_fault`.

Run against the current repository in committed real-repo mode:

```bash
cd /path/to/RegressProof-cli
node src/cli.js run \
  --repo "$PWD" \
  --config regressproof.real-repo.config.json \
  --format json
```

This mode uses the real-repo trust-check entrypoint and is intended for self-validation inside the standalone repository.

Current real-repo behavior is best understood as:

- a `standalone self-validation plus committed real-repo trust validation` path

This confirms that RegressProof can execute from the standalone repository root and complete trust and deep committed-validation scenarios against recent repository history. It does not yet replace broader external validation across many more public repositories.

The real-repo path now uses a committed-boundary trust-check built on tracked scenario packs and the shared fixture suite runner.

This keeps committed validation runnable while the main repository history is still being deepened.

Committed validation helper:

```bash
cd /path/to/RegressProof-cli
npm run real:committed -- --repo "$PWD" --artifact-dir /tmp/regressproof-committed-pass
```

Optional explicit compare ref:

```bash
cd /path/to/RegressProof-cli
npm run real:committed -- \
  --repo "$PWD" \
  --head-ref HEAD \
  --artifact-dir /tmp/regressproof-committed-pass
```

The committed helper computes a baseline ref automatically, prepares a temporary config, and runs the real-repo validation flow against committed history.

Committed readiness helper:

```bash
cd /path/to/RegressProof-cli
npm run real:readiness -- --repo "$PWD"
```

Use this before committed validation when you are unsure whether the selected git range actually contains the RegressProof boundary in committed history.

Committed trust-scenario helper:

```bash
cd /path/to/RegressProof-cli
npm run real:scenario -- --repo "$PWD"
```

This runs the current committed trust scenario end-to-end and asserts the expected invariants:

- readiness is `ready`
- `diffRange` is `HEAD~1..HEAD`
- baseline mode is `path_snapshot`
- current mode is `snapshot`
- committed verdict is `successful_change`
- confidence is `high`

Committed deep trust-scenario helper:

```bash
cd /path/to/RegressProof-cli
npm run real:scenario:deep -- --repo "$PWD"
```

This uses the `deep` trust-check profile so the committed path exercises a broader nested fixture subset:

- `lint-js`
- `preexisting-js`
- `parser-js`
- `python-js`

## GitHub Action

The repository includes a GitHub Action at:

- `.github/workflows/regressproof.yml`

That workflow now validates the RegressProof MVP directly by running:

- `node scripts/verify-mvp.js`

and uploads the full artifact tree under `regressproof-artifacts/`.

For materialized fixtures or other custom configs:

```bash
cd /path/to/RegressProof-cli
node scripts/check-committed-range-readiness.js \
  --repo /tmp/regressproof-materialized-lint/repo \
  --config regressproof.config.json \
  --baseline-ref HEAD~1 \
  --head-ref HEAD
```

Committed validation now supports:

- explicit `baselineRef..compareRef` attribution
- diff calculation against a selected committed ref
- snapshot execution for the compared commit, so current verification is not tied to the live checkout
- richer git context in reports:
  - `baselineCommit`
  - `compareRef`
  - `compareCommit`
  - `diffRange`
  - `currentMode`

When the selected committed ref still does not contain the RegressProof project boundary, the runner now degrades gracefully instead of crashing:

- baseline path snapshots can fall back to `skip`
- current commit execution can fall back to `worktree_fallback` when the compared ref resolves to the live `HEAD` commit but the project still exists mainly in the working tree

Workspace validation helper:

```bash
cd /path/to/RegressProof-cli
npm run real:workspace -- --repo "$PWD" --artifact-dir /tmp/regressproof-workspace-pass
```

The workspace helper compares `HEAD` to the current worktree for the RegressProof project boundary. This is useful when the project exists mostly as working-tree changes rather than committed repository history.

Standalone export helper:

```bash
cd /path/to/RegressProof-cli
npm run export:standalone
```

Optional custom destination:

```bash
cd /path/to/RegressProof-cli
npm run export:standalone -- --out-dir /tmp/regressproof-standalone
```

This creates a near-standalone repository shape with:

- the RegressProof package boundary
- core `src/`, `scripts/`, and `fixtures/`
- local packaging files such as `.gitignore` and `AGENTS.md`
- copied canonical RegressProof docs under `docs/`

The export intentionally excludes build artifacts so the resulting package stays clean and reproducible.

Exact usage modes:

- `usage.mode = "estimated"` uses config or heuristic estimation
- `usage.mode = "exact"` supports:
  - env ingestion via `REGRESSPROOF_PROMPT_TOKENS`, `REGRESSPROOF_COMPLETION_TOKENS`, `REGRESSPROOF_CACHED_TOKENS`, `REGRESSPROOF_COST_USD`
  - file ingestion via `usage.exact.filePath`

Persistent ledger:

- by default, a JSONL ledger is written under the artifact directory in `.regressproof-ledger/runs.jsonl`
- each run records verdict, confidence, spend estimate, internal credit, and failure counts

Current report artifacts include:

- `regressproof-report.json`
- `regressproof-summary.md`
- `regressproof-pr-summary.md`
- `regressproof-pr-comment.md`
- `.regressproof-ledger/runs.jsonl`

Current reporting behavior includes:

- human-readable verdict headlines
- explicit counts for introduced, preexisting, unchanged, and fixed failures
- PR-oriented compact summaries and comment bodies
- grouped multi-line evidence for more realistic parser-targeted scenarios
