# Contributing

Thanks for contributing to RegressProof.

## Project Priorities

Contributions are most helpful when they improve:

- CLI reliability
- verification fidelity
- fixture coverage
- real-repo validation
- conservative evidence-based classification

## Before You Start

Read these first:

- `README.md`
- `LICENSE`
- `NOTICE.md`
- `docs/REGRESSPROOF_INDEX.md`
- `docs/REGRESSPROOF_SPEC.md`
- `docs/REGRESSPROOF_VALIDATION_PLAN.md`
- `docs/REGRESSPROOF_DECISION_LOG.md`

## Development Guidelines

- Keep product claims conservative and evidence-based.
- Do not reframe RegressProof as a guaranteed provider refund system.
- Preserve the distinction between:
  - `confirmed_agent_fault`
  - `possible_agent_fault`
  - `preexisting_failure`
  - `environment_failure`
  - `insufficient_evidence`
- Prefer small, reviewable pull requests.
- Update relevant docs when behavior or scope changes.
- Keep doc churn low:
  - treat `README.md` as a stable public entry point
  - put changing validation status in `docs/REGRESSPROOF_VALIDATION_PLAN.md`
  - put release-bound claims in `docs/REGRESSPROOF_RELEASE_*.md`
  - prefer a session note over rewriting stable top-level docs for day-to-day progress

## Local Validation

From the repository root:

```bash
node scripts/verify-mvp.js --repo "$PWD" --out-dir /tmp/regressproof-mvp
```

Helpful focused checks:

```bash
node scripts/run-all-fixtures.js --out-dir /tmp/regressproof-fixtures
node scripts/verify-real-repo-trust-scenario.js --repo "$PWD" --out-dir /tmp/regressproof-real-scenario
node scripts/verify-real-repo-deep-scenario.js --repo "$PWD" --out-dir /tmp/regressproof-real-deep-scenario
```

## Pull Requests

Please include:

- a short summary of what changed
- why the change is needed
- what validation you ran
- any docs updated as part of the change

If your change affects user-facing behavior, CI behavior, fixture expectations, or validation policy, update the relevant `docs/REGRESSPROOF_*.md` file in the same PR.

## Intellectual Property Boundaries

By contributing, you confirm that you have the right to submit the contribution
and that it does not include proprietary third-party code or materials without
permission.

Do not submit changes that copy another project's proprietary implementation,
branding, validation corpus, or documentation structure. RegressProof should
grow from original implementation work and public, properly attributed
validation evidence.
