# RegressProof Supported Modes

**Project:** `RegressProof`  
**Status:** MVP-proven surface as of 16 April 2026

## Purpose

This document states which usage modes RegressProof already supports with real evidence, and which modes remain future work.

The goal is to keep product claims conservative and proof-based.

## Proven Modes

### 1. Controlled Fixture Validation

RegressProof is proven on tracked fixture scenario packs that materialize into temporary git repositories before verification.

Current proven fixture coverage:

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

Current evidence:

- full tracked-pack fixture suite passes `10/10`
- baseline/current behavior is reproducible through materialization
- pre-existing failures, introduced failures, parser-targeted stderr, and non-JS scenarios are all covered

### 2. Self-Hosted Repository Validation

RegressProof is proven to run against its own repository boundary using committed comparison logic.

Current proven signals:

- committed diff range handling
- `path_snapshot` baseline mode
- `snapshot` current mode
- changed-file evidence inside the RegressProof project boundary
- committed trust scenario
- committed deep trust scenario
- single MVP verification entrypoint at `node scripts/verify-mvp.js`

Current evidence:

- standalone repository MVP verification passes
- trust scenario result: `successful_change / high`
- deep scenario result: `successful_change / high`

### 3. External Doc / Plugin Repositories

RegressProof is proven on lightweight external repositories where the verification surface is file structure, documentation consistency, and small metadata/config checks rather than runtime tests.

Current evidence:

- `forrestchang/andrej-karpathy-skills`
- result: `successful_change / high`

This mode is appropriate for repositories that behave more like plugins, prompts, docs, or metadata packages than test-heavy software projects.

### 4. External Documentation / Configuration Repositories

RegressProof is proven on larger repositories where the meaningful verification surface is structured docs and config integrity.

Current evidence:

- `shanraisshan/claude-code-best-practice`
- result: `successful_change / high`

This mode is useful when the latest change is mostly tutorial, documentation, or configuration oriented.

### 5. External Code-and-Test Repositories

RegressProof is proven on external repositories where the committed range includes both code and tests, but only the runs recorded in the canonical catalog should be treated as durable proof.

Current evidence:

- `NousResearch/hermes-agent`
- changed files included runtime Python code and tests
- result: `successful_change / high`
- `pmndrs/zustand`
- committed range: `6213fc1~1..6213fc1`
- changed files:
  - `src/middleware/persist.ts`
  - `tests/persistAsync.test.tsx`
- result: `successful_change / high`

Most recent canonical Python promotion:

- `pydantic/pydantic`
  - config: `examples/external-pydantic-extra-equality.config.json`
  - range: `b1bf19445d8ac144a7a0e82674d2d87eebab6c18~1..b1bf19445d8ac144a7a0e82674d2d87eebab6c18`
  - changed files: `pydantic/main.py`, `tests/test_main.py`
  - result: `successful_change / high`

Most recent canonical TypeScript promotion:

- `sindresorhus/is`
  - config: `examples/external-sindresorhus-is-type-guards.config.json`
  - range: `13febb6b01e24863ced3847a7ee112a48c154e0e~1..13febb6b01e24863ced3847a7ee112a48c154e0e`
  - changed files: `source/index.ts`, `source/types.ts`, `test/test.ts`, `test/type-tests.ts`
  - result: `successful_change / high`

This remains the strongest external proof category currently demonstrated, with repeated evidence in Python and TypeScript-oriented code-and-test repositories, but claims should stay anchored to the cataloged runs.

## Supported But Still Narrow

These modes are real, but their breadth is still limited:

- external code-heavy validation across more ecosystems
- larger repository committed attribution breadth
- deeper language coverage beyond current Python and Swift fixtures
- broader examples of exact usage/cost ingestion

These should be described as working but still expanding, not fully generalized.

## Not Yet Proven Enough For Broad Claims

RegressProof should not yet claim full proof for:

- universal provider-native token accounting
- provider-side refund enforcement
- all monorepo shapes by default
- all CI systems and all language ecosystems
- deep PR-review automation as a universal default

## Safe Product Claim

Today, the safest concise claim is:

`RegressProof is a proof-based regression detection and accountability layer with proven MVP coverage across controlled fixtures, self-hosted committed validation, and multiple categories of external public repositories.`

## Best Next Expansion

The next strongest evidence should come from:

1. another external JS/TS code-heavy repository with a broader multi-file runtime change beyond the current `sindresorhus/is` type-guard slice
2. another external Python code-heavy repository beyond the currently cataloged Python corpus, now that `pydantic/pydantic` has been promoted
3. at least one larger repository with more complex committed ranges

That is a better next step than adding another major architecture layer.
