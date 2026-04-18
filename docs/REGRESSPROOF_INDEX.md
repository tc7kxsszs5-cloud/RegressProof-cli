# RegressProof Project Index

**Project:** `RegressProof`  
**Purpose:** Persistent project memory and navigation entry point  
**Last updated:** 18 April 2026

## Vision

RegressProof is a validation and accountability layer for AI coding agents.

It is designed to:

- detect measurable agent-caused regressions
- compare baseline vs post-change verification results
- connect failures to patches, commits, and PRs
- track token usage or estimated cost
- maintain an internal credit ledger for confirmed agent-caused faults

Core principle:

`proof, not guesses`

## Current Document Set

- [Product Brief](/tmp/RegressProof-cli/docs/REGRESSPROOF_PRODUCT_BRIEF.md)
- [Specification](/tmp/RegressProof-cli/docs/REGRESSPROOF_SPEC.md)
- [Implementation Plan](/tmp/RegressProof-cli/docs/REGRESSPROOF_IMPLEMENTATION_PLAN.md)
- [MVP Task Breakdown](/tmp/RegressProof-cli/docs/REGRESSPROOF_MVP_TASK_BREAKDOWN.md)
- [Validation Plan](/tmp/RegressProof-cli/docs/REGRESSPROOF_VALIDATION_PLAN.md)
- [Decision Log](/tmp/RegressProof-cli/docs/REGRESSPROOF_DECISION_LOG.md)
- [Workflow Memory](/tmp/RegressProof-cli/docs/REGRESSPROOF_WORKFLOW_MEMORY.md)
- [Release v0.1.0](/tmp/RegressProof-cli/docs/REGRESSPROOF_RELEASE_v0.1.0.md)
- [Session Template](/tmp/RegressProof-cli/docs/REGRESSPROOF_SESSION_TEMPLATE.md)
- [Session Notes Directory](/tmp/RegressProof-cli/docs/sessions/README.md)

## Current Implementation Status

Implementation has started.

Current code scaffold lives at the repository root:

- [README.md](/tmp/RegressProof-cli/README.md)
- [package.json](/tmp/RegressProof-cli/package.json)
- [regressproof.config.json](/tmp/RegressProof-cli/regressproof.config.json)
- [src/cli.js](/tmp/RegressProof-cli/src/cli.js)

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
  - [regressproof.real-repo.config.json](/tmp/RegressProof-cli/regressproof.real-repo.config.json)
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
- a single MVP verification entrypoint now exists:
  - `node scripts/verify-mvp.js`
- the GitHub Action now validates the current RegressProof MVP flow directly in the standalone repository
- the standalone repository boundary now includes:
  - [AGENTS.md](/tmp/RegressProof-cli/AGENTS.md)
  - [.gitignore](/tmp/RegressProof-cli/.gitignore)
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

What is next:

- wider real-repository validation on non-self-hosted repos
- provider-native usage adapters beyond env/file ingestion
- richer PR presentation and review thread behavior
- cleaner standalone packaging and eventual repo separation

## Current Product Positioning

RegressProof is **not** framed as a universal provider token refund tool.

RegressProof **is** framed as:

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

## External Validation Status

RegressProof has now been validated outside its own repository on public GitHub repositories in multiple increasingly strong categories:

1. doc/plugin repository
   - `forrestchang/andrej-karpathy-skills`
   - result: `successful_change / high`
2. larger docs/configuration repository
   - `shanraisshan/claude-code-best-practice`
   - result: `successful_change / high`
3. code-plus-test repository
   - `NousResearch/hermes-agent`
   - result: `successful_change / high`
4. additional code-plus-test repository
   - `pmndrs/zustand`
   - result: `successful_change / high`

This does not yet replace broader real-world validation, but it means RegressProof is no longer proven only on fixtures and self-hosted scenarios.

## Current Real-Repo Validation Level

Current real-repository validation is best described as:

- `standalone self-validation plus committed real-repo trust validation`

This means RegressProof can now run inside its standalone repository and execute both:

- the full MVP verification flow at repository root
- committed trust scenarios against recent standalone repository history

It does **not** yet mean:

- broad external committed-change attribution across many public repositories
- rich provider-native usage ingestion beyond current exact/estimated scaffolds

However, the core engine now supports the mechanics needed for that next step:

- explicit commit-vs-commit diff ranges
- snapshot execution for the compared committed ref
- reports that expose baseline commit, compare commit, and execution mode
- graceful fallback when committed refs do not yet contain the RegressProof project boundary

## Memory Rule

If future work resumes in a new session, start by reading these files in order:

1. [Product Brief](/tmp/RegressProof-cli/docs/REGRESSPROOF_PRODUCT_BRIEF.md)
2. [Specification](/tmp/RegressProof-cli/docs/REGRESSPROOF_SPEC.md)
3. [Implementation Plan](/tmp/RegressProof-cli/docs/REGRESSPROOF_IMPLEMENTATION_PLAN.md)
4. [MVP Task Breakdown](/tmp/RegressProof-cli/docs/REGRESSPROOF_MVP_TASK_BREAKDOWN.md)
5. [Decision Log](/tmp/RegressProof-cli/docs/REGRESSPROOF_DECISION_LOG.md)
6. [Workflow Memory](/tmp/RegressProof-cli/docs/REGRESSPROOF_WORKFLOW_MEMORY.md)
7. the latest session note in [docs/sessions](/tmp/RegressProof-cli/docs/sessions/README.md)

This file should remain the top-level project memory entry point.
