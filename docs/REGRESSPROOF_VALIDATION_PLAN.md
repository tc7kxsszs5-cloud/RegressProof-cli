# RegressProof Validation Plan

**Date:** 13 April 2026  
**Status:** Active MVP validation

## Goal

Prove that RegressProof detects real regressions using evidence and does not invent conclusions.

## Validation Principles

- test against controlled fixture scenario packs that materialize into temporary git repos
- compare baseline and post-change states
- measure false positives and false negatives
- separate code regressions from environment failures
- require reproducible evidence for confirmed faults

## Validation Targets

The system should prove that it can:

- detect new build failures
- detect new typecheck failures
- detect new lint failures
- detect new test regressions
- ignore pre-existing failures
- avoid false blame during environment issues

## Fixture Scenario Set

### Current JS Fixtures

Validated today:

- `simple-js`
  - green baseline to broken typecheck
- `preexisting-js`
  - pre-existing failure with no new regression
- `mixed-js`
  - pre-existing failure plus one newly introduced failure
- `build-js`
  - green baseline to broken build
- `lint-js`
  - green baseline to broken lint
- `test-js`
  - green baseline to broken test
- `timeout-js`
  - timeout / environment-style failure
- `parser-js`
  - green baseline to realistic multi-line typecheck stderr

### Current Non-JS Fixtures

Validated today:

- `python-js`
  - green baseline to broken Python typecheck-style check
- `swift-js`
  - green baseline to broken Swift typecheck-style check
  - uses a local Swift module cache path so the scenario reflects product behavior instead of sandbox cache-write failures
- `swiftpm-macos`
  - green baseline to broken SwiftPM macOS build
  - compiles real AppKit code through `swift build`
  - failure attribution comes from actual Swift compiler output in the changed source file

Current fixture architecture:

- each fixture now has a tracked scenario-pack path
- primary layout:
  - `tracked/baseline`
  - `tracked/current`
  - `fixture.materializer.json`
- the materializer reconstructs a temporary git repo before verification
- the full suite now runs reproducibly through tracked packs as the primary validation path

### Future Fixture Sets

- Python service fixture
  - richer test regressions
  - API contract failures
  - environment handling
- small iOS or macOS app sample beyond SwiftPM
  - app bundle build failures
  - UI-targeted test failures
  - Xcode build-system parsing beyond package-level checks

## Controlled Scenarios

### Scenario A: Green baseline to broken build

Expected:

- `confirmed_agent_fault`
- high confidence

### Scenario B: Green baseline to broken typecheck

Expected:

- `confirmed_agent_fault`
- high confidence

### Scenario B2: Green baseline to broken lint

Expected:

- `confirmed_agent_fault`
- high confidence

### Scenario C: Green baseline to failing unit test in changed file

Expected:

- `confirmed_agent_fault`
- high confidence

### Scenario D: One pre-existing failing test plus one new failure

Expected:

- pre-existing failure preserved
- new failure attributed separately

### Scenario E: CI timeout or external service failure

Expected:

- `environment_failure` or `insufficient_evidence`

### Scenario F: Good patch

Expected:

- `successful_change`
- no false credit event

### Scenario G: Multi-line structured stderr from one underlying failure

Expected:

- one underlying failure should remain attributable as a coherent record
- file extraction should still point to the changed source file

### Scenario H: Non-JS regression in Python or Swift fixture

Expected:

- `confirmed_agent_fault`
- high confidence
- changed-file match preserved when the failure points to the modified source file

## Metrics

- regression detection rate
- false positive rate
- false negative rate
- classification reproducibility
- percentage of runs with sufficient evidence

## Initial Quality Targets

- high-confidence regression detection: `85%+` on controlled fixture scenarios
- false positive rate: `<10%` on controlled fixture scenarios
- classification reproducibility: `95%+` on repeated controlled runs

## Human Review Layer

Before trusting the first release broadly:

- review at least 20 classified runs manually
- compare system verdict to human engineering judgment
- tune confidence thresholds only after review

## Current Real-Repo Trust Layer

- the current real-repo validation path now runs a small trusted fixture subset from within the main workspace
- this checks both introduced-failure handling and preexisting-failure handling through the tracked-pack materialization path
- it is still lighter than full deep real-repo attribution, but materially stronger than a file-existence self-check
- the committed trust flow now supports both:
  - standalone repository layout
  - embedded workspace layout through workspace-aware config resolution
- a temporary standalone-style git repo assembled from the current RegressProof files now passes both:
  - committed trust scenario
  - committed deep trust scenario

## Current MVP Closure Evidence

The current MVP is now backed by all of the following:

- full fixture suite passes in tracked-pack mode
- standalone committed trust scenario passes
- standalone committed deep trust scenario passes
- full `verify-mvp` passes end-to-end and writes one summary artifact

This means the MVP is no longer only "assembled from working parts"; it now has one repository-level proof command that completes successfully.

## Current External Validation Layer

External validation has now been exercised in increasingly strong public-repository categories:

1. docs/plugin repositories
2. larger docs/configuration repositories
3. code-plus-test repositories

Latest external code-plus-test run:

- repository: `Yeachan-Heo/oh-my-codex`
- committed range: `HEAD~1..HEAD`
- result on a stable repo-specific build/test slice: `successful_change / high`

Important nuance from that run:

- a broader symmetric check also exposed an environment-sensitive macOS path assertion (`/var/...` vs `/private/var/...`)
- this is useful validation evidence in itself, because it shows RegressProof needs repository-specific verification slices and must preserve `environment_failure` / insufficient-evidence discipline instead of over-claiming blame

So the current evidence now covers:

- controlled fixtures
- self-hosted trust validation
- standalone end-to-end MVP execution
- external public-repository validation on real code

## Validation Exit Rule

RegressProof is validated for MVP when:

- it passes controlled fixture scenarios
- it avoids blaming the agent for pre-existing failures
- it avoids misclassifying environment failures as agent faults
- its reports are judged trustworthy by human reviewers
- it demonstrates credible validation coverage beyond one language/runtime
- the full fixture suite runs reproducibly through the materialization layer
- the standalone `verify-mvp` flow passes end-to-end
- at least one external code repository has been validated through a repository-specific committed range
