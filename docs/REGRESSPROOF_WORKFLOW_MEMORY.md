# RegressProof Workflow Memory

This file exists to help future sessions quickly recover the intended workflow for this project.

## Fast Resume Checklist

When continuing work on `RegressProof`:

1. Read `AGENTS.md`
2. Read `docs/REGRESSPROOF_INDEX.md`
3. Read `docs/REGRESSPROOF_DECISION_LOG.md`
4. Confirm the repository root is the standalone `RegressProof-cli` tree.
5. Do not resume project work from old embedded `rork-kiku/regressproof` copies, temporary clones, or the inactive `RegressProof.git` remote.
6. Decide whether the task is:
   - product clarification
   - architecture refinement
   - implementation planning
   - actual code implementation
   - validation or testing
7. If implementation starts, align the work to `docs/REGRESSPROOF_MVP_TASK_BREAKDOWN.md`

## Core Product Boundaries

RegressProof should:

- prove regressions using measurable evidence
- avoid speculative blame
- work first through GitHub and repository workflows
- treat documentation as persistent project memory

RegressProof should not:

- promise provider-side token refunds by default
- auto-credit low-confidence failures
- present ambiguous failures as confirmed agent faults

## Best Next Moves

The best execution order for the project is:

1. maintain docs
2. keep the tracked fixture-pack suite reproducible through the materialization layer
3. implement local CLI
4. integrate with GitHub Action
5. add cost and credit accounting
6. validate on external public repositories, not only self-hosted RegressProof flows

## Current Proven Validation Surface

RegressProof is no longer validated only against internal fixtures and self-hosted trust scenarios.

The current external-run catalog lives in `examples/external-runs.json`.
Use these commands from the standalone repository root:

```bash
npm run external:runs
npm run external:check
npm run external:run-corpus
```

As of 5 May 2026, the catalog contains ten run records across nine public repositories:

- `openclaw/openclaw`
- `sindresorhus/ky`
- `unjs/ofetch`
- `nanostores/nanostores`
- `pytest-dev/pluggy`
- `pallets/click`
- `pmndrs/zustand`
- `pydantic/pydantic`
- `sindresorhus/is`

Those ten records currently mean:

- nine pinned completed proof runs
- one public-runner smoke run

Prepared candidates belong in `candidateQueue[]`; they are not durable proof until promoted into `runs[]`.

It has also been exercised successfully on earlier external public repositories in these modes:

1. doc/plugin repository:
   - `forrestchang/andrej-karpathy-skills`
   - committed range `HEAD~1..HEAD`
   - result: `successful_change / high`
2. larger documentation and configuration repository:
   - `shanraisshan/claude-code-best-practice`
   - committed range `HEAD~1..HEAD`
   - changed file: `tutorial/day1/README.md`
   - result: `successful_change / high`
   - notable signal: current run resolved baseline-side structural/content failures for the new tutorial path
3. code and test repository:
   - `NousResearch/hermes-agent`
   - committed range `HEAD~1..HEAD`
   - changed files:
     - `gateway/platforms/telegram.py`
     - `tests/gateway/test_telegram_thread_fallback.py`
   - result: `successful_change / high`
4. additional code and test repository:
   - `pmndrs/zustand`
   - committed range `6213fc11bdf096301a82ae5c236b5a666a4ee3ca~1..6213fc11bdf096301a82ae5c236b5a666a4ee3ca`
   - changed files:
     - `src/middleware/persist.ts`
     - `tests/persistAsync.test.tsx`
   - validation config:
     - `external-zustand-persist.config.json`
   - result: `successful_change / high`

Most recent completed promotions:

- `sindresorhus/is`
  - validation config:
    - `external-sindresorhus-is-type-guards.config.json`
  - committed range:
    - `13febb6b01e24863ced3847a7ee112a48c154e0e~1..13febb6b01e24863ced3847a7ee112a48c154e0e`
  - changed files:
    - `package.json`
    - `source/index.ts`
    - `source/types.ts`
    - `test/test.ts`
    - `test/type-tests.ts`
  - result:
    - `successful_change / high`
  - artifact:
    - `/tmp/regressproof-sindresorhus-is-type-guards-artifacts/regressproof-report.json`

- `pydantic/pydantic`
  - validation config:
    - `external-pydantic-extra-equality.config.json`
  - committed range:
    - `b1bf19445d8ac144a7a0e82674d2d87eebab6c18~1..b1bf19445d8ac144a7a0e82674d2d87eebab6c18`
  - changed files:
    - `pydantic/main.py`
    - `tests/test_main.py`
  - result:
    - `successful_change / high`
  - artifact:
    - `/tmp/regressproof-pydantic-extra-equality-artifacts/regressproof-report.json`

This means the project now has evidence across:

- tracked internal fixtures
- self-hosted real-repo trust scenarios
- external doc/plugin repositories
- external documentation/configuration repositories
- external code-plus-test repositories
- pinned TypeScript corpus slices
- pinned Python corpus slices
- promoted Python runtime equality proof from the earlier prepared-candidate queue

## Repository Memory Rule

Store durable project memory inside this repository tree.

- Session notes belong in `docs/sessions/`.
- External validation configs belong in `examples/`.
- External validation run records belong in `examples/external-runs.json`.
- Major product, legal, architecture, or validation decisions belong in `docs/REGRESSPROOF_DECISION_LOG.md`.
- Do not rely on transient chat history, `/tmp` clones, or old host workspace notes as the source of truth.

## If A Future Agent Is Unsure

If a future agent is unsure what to do next, it should:

- consult `docs/REGRESSPROOF_INDEX.md`
- use `docs/REGRESSPROOF_MVP_TASK_BREAKDOWN.md` as the execution plan
- record new major decisions in `docs/REGRESSPROOF_DECISION_LOG.md`
- check the latest note in `docs/sessions/`
- prefer extending external validation coverage before adding new architecture layers

## Session Memory Rule

To preserve context across sessions:

- store one short session note per meaningful work session in `docs/sessions/`
- use `docs/REGRESSPROOF_SESSION_TEMPLATE.md` as the default format
- record durable architectural or product decisions in `docs/REGRESSPROOF_DECISION_LOG.md`
- keep this file focused on restart workflow, not long historical logs
