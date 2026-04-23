# RegressProof Project Index

**Project:** `RegressProof`  
**Purpose:** Persistent project memory and navigation entry point  
**Last updated:** 20 April 2026

## Vision

RegressProof is a CLI and GitHub Action utility that provides a validation and accountability layer for AI coding agents.

It is designed to:

- detect measurable agent-caused regressions
- compare baseline vs post-change verification results
- connect failures to patches, commits, and PRs
- track token usage or estimated cost
- maintain an internal credit ledger for confirmed agent-caused faults

Core principle:

`proof, not guesses`

## Current Document Set

- [Product Brief](/Users/mac/Desktop/rork-kiku/docs/REGRESSPROOF_PRODUCT_BRIEF.md)
- [Specification](/Users/mac/Desktop/rork-kiku/docs/REGRESSPROOF_SPEC.md)
- [Implementation Plan](/Users/mac/Desktop/rork-kiku/docs/REGRESSPROOF_IMPLEMENTATION_PLAN.md)
- [MVP Task Breakdown](/Users/mac/Desktop/rork-kiku/docs/REGRESSPROOF_MVP_TASK_BREAKDOWN.md)
- [Validation Plan](/Users/mac/Desktop/rork-kiku/docs/REGRESSPROOF_VALIDATION_PLAN.md)
- [Decision Log](/Users/mac/Desktop/rork-kiku/docs/REGRESSPROOF_DECISION_LOG.md)
- [Case Studies](REGRESSPROOF_CASE_STUDIES.md)
- [Proof Ledger](REGRESSPROOF_PROOF_LEDGER.md)
- [GitHub Repository Settings](REGRESSPROOF_GITHUB_SETTINGS.md)
- [Workflow Memory](/Users/mac/Desktop/rork-kiku/docs/REGRESSPROOF_WORKFLOW_MEMORY.md)
- [Session Template](/Users/mac/Desktop/rork-kiku/docs/REGRESSPROOF_SESSION_TEMPLATE.md)
- [Session Notes Directory](/Users/mac/Desktop/rork-kiku/docs/sessions/README.md)

## Current Implementation Status

Implementation has progressed to a proven standalone MVP.

Current code scaffold lives in:

- [regressproof/README.md](/Users/mac/Desktop/rork-kiku/regressproof/README.md)
- [regressproof/package.json](/Users/mac/Desktop/rork-kiku/regressproof/package.json)
- [regressproof/regressproof.config.json](/Users/mac/Desktop/rork-kiku/regressproof/regressproof.config.json)
- [regressproof/src/cli.js](/Users/mac/Desktop/rork-kiku/regressproof/src/cli.js)

What already works:

- local CLI entrypoint
- config loading
- git context collection
- structured report generation
- build script that prepares `dist/`
- baseline snapshot execution
- current quick-check execution
- first conservative verdicts
- fixture scenario packs for introduced and preexisting failures
- explicit `preexistingFailures`, `introducedFailures`, `unchangedFailures`, and `fixedFailures`
- fingerprint-based failure comparison, so one failing command can still be split into preexisting and newly introduced failures
- timeout-aware environment classification
- structured failure parsing with:
  - `checkType`
  - `filePath`
  - `evidence`
  - `touchesChangedFile`
  - `changedFileMatchKind`
  - `matchedChangedFiles`
- JSON and Markdown artifact generation for CI workflows
- initial GitHub Action skeleton at `.github/workflows/regressproof.yml`
- CI exit policy based on configurable verdict classes
- GitHub Step Summary support for Actions
- GitHub output variables:
  - `verdict`
  - `confidence`
  - `changed_file_match`
  - `ci_should_fail`
  - artifact paths
- usage/cost scaffold with `estimated` and `exact` modes
- exact usage mode now supports environment-driven activation without config edits
- lightweight real-repo validation config:
  - [regressproof.real-repo.config.json](/Users/mac/Desktop/rork-kiku/regressproof/regressproof.real-repo.config.json)
- lightweight large-repo mode with:
  - `baseline.mode = skip`
  - `targetPaths`
- `path_snapshot` mode with graceful fallback to `skip` when target paths are not yet present in baseline history
- internal credit ledger scaffold
- persistent JSONL ledger storage under the artifact directory
- PR comment body artifact generation
- direct PR comment publishing via GitHub Actions
- validated fixture scenarios now include:
  - introduced failure
  - introduced lint regression
  - preexisting failure
  - preexisting failure plus a newly introduced failure
  - build regression in changed code
  - test regression in changed code
  - timeout / environment failure
  - Python typecheck regression
  - parser-targeted multi-line typecheck regression
  - Swift typecheck regression with local module-cache isolation
  - SwiftPM macOS build regression with real AppKit compilation
- self-hosted real-workspace trust validation now runs successfully in lightweight mode
- a committed real-repo trust scenario can now be checked end-to-end through a single helper script
- a deeper committed trust scenario can now be exercised through a `deep` trust-check profile
- committed trust validation now resolves the correct real-repo config automatically for:
  - standalone repository layout
  - embedded workspace layout
- command execution roots are now explicit, so the same verification flow can run from:
  - standalone repo root
  - embedded `regressproof/` project root inside a larger workspace
- a single MVP verification entrypoint now exists:
  - `node regressproof/scripts/verify-mvp.js`
- the GitHub Action now validates the current RegressProof MVP flow instead of the older single-fixture path
- subproject packaging boundary now includes:
  - [regressproof/AGENTS.md](/Users/mac/Desktop/rork-kiku/regressproof/AGENTS.md)
  - [regressproof/.gitignore](/Users/mac/Desktop/rork-kiku/regressproof/.gitignore)
  - `npm run export:standalone` for near-standalone repository export
- committed attribution now supports:
  - explicit `baselineRef..compareRef` ranges
  - snapshot execution of the compared committed ref
  - richer git context in reports for commit-vs-commit reasoning
  - readiness checking before running committed validation on the main repository
  - explicit proof signals in reports for committed diff, changed files, path-scoped baseline, and snapshot current mode
- fixture validation now runs through tracked scenario packs:
  - `tracked/baseline`
  - `tracked/current`
  - `fixture.materializer.json`
  - temporary git materialization before verification
- all current fixtures now have tracked scenario packs, and the full suite passes in tracked-pack mode
- a real SwiftPM macOS fixture now validates compiler-attributed failures against actual Swift build output
- standalone `verify-mvp` now passes end-to-end
- standalone `real:scenario` passes
- standalone `real:scenario:deep` passes
- external public-repository validation now includes a code-plus-test repository run on `Yeachan-Heo/oh-my-codex`
- reusable external validation examples now include a repository-specific config for `oh-my-codex`
- public-repository validation now includes an OpenClaw provider-code slice with pinned commit evidence
- external corpus validation now includes a pinned `sindresorhus/ky` hook-regression run
- external corpus validation now includes a pinned `unjs/ofetch` timeout-signal run
- external corpus validation now includes a pinned `nanostores/nanostores` shared-epoch run
- external corpus validation now includes a pinned `pytest-dev/pluggy` Python plugin-manager run
- reusable external validation tooling now includes:
  - `npm run real:public`
  - `npm run external:runs`
  - `npm run external:check`
- curated external-run records now live in `examples/external-runs.json`

What is next:

- wider real-repository validation on non-self-hosted repos
- provider-native usage adapters beyond env/file ingestion
- richer PR presentation and review thread behavior
- cleaner standalone packaging and eventual repo separation
- broader external validation after standalone repo separation

## Current Product Positioning

RegressProof is **not** framed as a universal provider token refund tool.

RegressProof **is** framed as:

- CLI and GitHub Action utility
- agent regression detection
- fault attribution with evidence
- cost accountability
- internal credit and reliability tracking

## MVP Scope

The first version should include:

- local CLI
- GitHub Action
- baseline engine
- verification engine
- diff mapping
- fault classifier
- internal cost and credit ledger
- markdown and JSON reports
- PR comment publishing

The first version should exclude:

- full provider-native integrations
- dashboards as a hard requirement
- low-confidence auto-credit decisions
- claims of universal provider refunds

## Canonical Success Criteria

The first release is successful if it can:

- run on a real repository
- detect a known bad patch
- avoid blaming the agent for pre-existing failures
- assign a confidence-scored verdict
- record cost or estimated cost
- produce a report that a human reviewer trusts
- append persistent ledger evidence for repeated runs

## Recommended Working Order

1. Finalize scope and assumptions in the documents already created.
2. Build proof-of-function on a small fixture scenario pack.
3. Implement local CLI MVP.
4. Add GitHub Action integration.
5. Add internal credit ledger.
6. Validate against controlled bad and good patches.

## Working Principles

- Do not rely on intuition-only classification.
- Trust only measurable signals.
- Keep confidence scoring conservative.
- Separate `confirmed` from `possible`.
- Ignore pre-existing failures unless worsened.
- Avoid product claims the system cannot prove.

## Immediate Next Steps

- expand external validation coverage with more code-heavy public repositories
- add provider-native usage adapters beyond env/file inputs
- improve PR comment presentation for longer review threads
- tighten release/demo guidance around the MVP verification entrypoint
- turn the current validation evidence into clearer public demo/case-study material

## External Validation Status

RegressProof has now been validated outside its own repository on public GitHub repositories in three increasingly strong categories:

1. doc/plugin repository
   - `forrestchang/andrej-karpathy-skills`
   - result: `successful_change / high`
2. larger docs/configuration repository
   - `shanraisshan/claude-code-best-practice`
   - result: `successful_change / high`
3. code-plus-test repository
   - `NousResearch/hermes-agent`
   - result: `successful_change / high`
4. larger workflow/code repository with repo-specific validation slicing
   - `Yeachan-Heo/oh-my-codex`
   - result: `successful_change / high` on a stable committed build/test slice
   - additional note: broader checking also exposed an environment-sensitive path assertion, which reinforces RegressProof's need for conservative repository-specific validation
5. larger code repository with provider-oriented tests
   - `openclaw/openclaw`
   - result: `successful_change / high` on a pinned provider-code slice
   - changed-file evidence includes OpenAI Codex provider source and test files
6. compact TypeScript library with hook regression coverage
   - `sindresorhus/ky`
   - result: `successful_change / high` on a pinned tuple `searchParams` hook regression fix
   - changed-file evidence includes `source/core/Ky.ts` and `test/hooks.ts`
7. compact TypeScript fetch utility with timeout-signal coverage
   - `unjs/ofetch`
   - result: `successful_change / high` on a pinned custom `AbortSignal` with timeout fix
   - changed-file evidence includes `.gitignore`, `src/fetch.ts`, and `test/index.test.ts`
8. compact TypeScript state library with shared-epoch coverage
   - `nanostores/nanostores`
   - result: `successful_change / high` on a pinned global epoch fix
   - changed-file evidence includes `atom/index.js`, `computed/index.js`, and `package.json`
9. compact Python plugin-system library with manager deduplication coverage
   - `pytest-dev/pluggy`
   - result: `successful_change / high` on a pinned hook implementation removal and hookcaller deduplication fix
   - changed-file evidence includes `src/pluggy/_hooks.py`, `src/pluggy/_manager.py`, and `testing/test_pluginmanager.py`

This does not yet replace broader real-world validation, but it means RegressProof is no longer proven only on fixtures and self-hosted scenarios.

## MVP Status

RegressProof should now be described internally as:

- a proven standalone MVP
- evidence-backed on fixtures, self-hosted trust flows, and public external repositories
- still conservative about blame when repository checks are asymmetric or environment-sensitive

## Current Real-Repo Validation Level

Current real-repository validation is best described as:

- `self-hosted real-workspace trust validation`

This means RegressProof can now run inside the real workspace and execute a nested RegressProof trust check successfully against a small but meaningful fixture subset, while also asserting tracked-pack materialization as part of the proof path.

It does **not** yet mean:

- deep diff-aware attribution on committed RegressProof changes in the main repository
- rich real-repo baseline comparison with non-empty changed-file evidence

However, the core engine now supports the mechanics needed for that next step:

- explicit commit-vs-commit diff ranges
- snapshot execution for the compared committed ref
- reports that expose baseline commit, compare commit, and execution mode
- graceful fallback when committed refs do not yet contain the RegressProof project boundary

## Memory Rule

If future work resumes in a new session, start by reading these files in order:

1. [Product Brief](/Users/mac/Desktop/rork-kiku/docs/REGRESSPROOF_PRODUCT_BRIEF.md)
2. [Specification](/Users/mac/Desktop/rork-kiku/docs/REGRESSPROOF_SPEC.md)
3. [Implementation Plan](/Users/mac/Desktop/rork-kiku/docs/REGRESSPROOF_IMPLEMENTATION_PLAN.md)
4. [MVP Task Breakdown](/Users/mac/Desktop/rork-kiku/docs/REGRESSPROOF_MVP_TASK_BREAKDOWN.md)
5. [Decision Log](/Users/mac/Desktop/rork-kiku/docs/REGRESSPROOF_DECISION_LOG.md)
6. [Workflow Memory](/Users/mac/Desktop/rork-kiku/docs/REGRESSPROOF_WORKFLOW_MEMORY.md)
7. the latest session note in [docs/sessions](/Users/mac/Desktop/rork-kiku/docs/sessions/README.md)

This file should remain the top-level project memory entry point.
