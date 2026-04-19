# RegressProof

`Proof, not guesses, for agent-caused regressions.`

RegressProof is a local CLI and CI validation layer for AI coding regressions. It compares a baseline snapshot against a current change, classifies what actually changed, and emits evidence-focused reports instead of intuition-only blame.

This repository is the current standalone, GitHub-first MVP surface for `RegressProof v0.1.0`. It is intended to be cloned and run from source. It is not yet presented as a published npm package with a separate distribution flow.

Public-facing companion docs:

- [GitHub Vitrine](docs/REGRESSPROOF_GITHUB_VITRINE.md)
- [Demo Brief](docs/REGRESSPROOF_DEMO_BRIEF.md)

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

## Start Here

Choose one of two entry paths:

- use RegressProof on another repository
- self-validate the RegressProof repository itself

If you are new to the project, start with the external-repository path first.

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

For changing details such as fixture coverage, validation status, or current release claims, use:

- [Project Index](docs/REGRESSPROOF_INDEX.md)
- [Validation Plan](docs/REGRESSPROOF_VALIDATION_PLAN.md)
- [Release v0.1.0](docs/REGRESSPROOF_RELEASE_v0.1.0.md)

## Quick Start

### Run Against Another Repository

RegressProof can validate a lightweight external repository by comparing a baseline and current state through a supplied config.

Example config:

- [examples/external-doc-plugin.config.json](examples/external-doc-plugin.config.json)

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

### Repository Self-Validation

Verify the current standalone MVP in one shot:

```bash
cd /path/to/RegressProof-cli
node scripts/verify-mvp.js --repo "$PWD" --out-dir /tmp/regressproof-mvp
```

This is the main "does the repo work?" command for this repository. It runs:

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

For the fuller helper matrix, fixture-pack workflow, committed trust helpers, and deeper engineering notes, use:

- [Project Index](docs/REGRESSPROOF_INDEX.md)
- [Validation Plan](docs/REGRESSPROOF_VALIDATION_PLAN.md)

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

For the committed validation helpers and current expected trust-scenario invariants, use the canonical validation docs instead of this README:

- [Validation Plan](docs/REGRESSPROOF_VALIDATION_PLAN.md)
- [Project Index](docs/REGRESSPROOF_INDEX.md)

## GitHub Action

The repository includes a GitHub Action at:

- `.github/workflows/regressproof.yml`

That workflow now validates the RegressProof MVP directly by running:

- `node scripts/verify-mvp.js`

and uploads the full artifact tree under `regressproof-artifacts/`.

For GitHub Action details, exact usage modes, ledger behavior, report artifacts, and export helpers, use:

- [Project Index](docs/REGRESSPROOF_INDEX.md)
- [Specification](docs/REGRESSPROOF_SPEC.md)
- [Validation Plan](docs/REGRESSPROOF_VALIDATION_PLAN.md)
