# RegressProof External Corpus Runbook

**Purpose:** Keep external proof promotion reproducible, conservative, and aligned with the canonical catalog.  
**Last updated:** 3 May 2026

## Why This Exists

Prepared external configs are useful, but they are not proof on their own.

RegressProof should only claim durable external evidence when the canonical catalog records a reproducible run with:

- a pinned committed range
- changed-file evidence
- a preserved artifact path
- a verdict and confidence value

This runbook exists to prevent memory drift, especially when an earlier session validated something informally but did not promote it into `examples/external-runs.json`.

## Canonical States

Use these states consistently:

### 1. Completed proof

Use when the run is already recorded in `examples/external-runs.json` under `runs[]`.

Requirements:

- pinned `headRef`
- explicit `diffRange`
- non-empty `changedFiles`
- `artifactPath`
- `verdict`
- `confidence`

This is the durable proof surface.

### 2. Prepared candidate

Use when a repository-specific config exists and the next run path is mostly known, but the standalone-side pinned run is not yet recorded in the catalog.

Prepared candidates belong in `examples/external-runs.json` under `candidateQueue[]`, not under `runs[]`.

### 3. Negative proof example

Use when the important outcome is that RegressProof did **not** over-blame the agent.

Examples:

- `preexisting_failure`
- `environment_failure`
- `insufficient_evidence`

These runs are valuable when they show the classifier staying conservative in the face of missing interpreters, path-shape differences, timeouts, or preexisting baseline failures.

## Promotion Checklist For Positive Corpus Runs

Promote a candidate into `runs[]` only after all of the following are true:

1. The run executes from the canonical standalone repository boundary.
2. The config path used is recorded.
3. The `headRef` is pinned to a commit, not floating `HEAD`.
4. The committed range is explicit.
5. The changed files are captured from that exact range.
6. The artifact path is preserved.
7. The report verdict and confidence are copied into the catalog.
8. Supporting docs are updated together:
   - `docs/REGRESSPROOF_PROOF_LEDGER.md` if public proof counts change
   - `docs/REGRESSPROOF_CASE_STUDIES.md` if the run teaches something reusable
   - `docs/REGRESSPROOF_WORKFLOW_MEMORY.md` if the next session needs to know the new corpus state
   - `docs/sessions/<date>-session.md`

## Promotion Checklist For Negative Proof Runs

Promote or document a negative-proof run only when it materially strengthens product trust.

Required evidence:

1. The run has a preserved artifact path.
2. The verdict is one of:
   - `preexisting_failure`
   - `environment_failure`
   - `insufficient_evidence`
3. The non-agent cause is stated explicitly.
4. The explanation ties back to concrete evidence, such as:
   - missing `python` vs working `python3`
   - `/var/...` vs `/private/var/...` path behavior
   - timeout or runner instability
   - a baseline-side failure that already existed before the compared commit
5. If possible, a tightened rerun or corrected command demonstrates that the earlier blame would have been wrong.

Negative-proof evidence should usually be recorded in:

- `docs/REGRESSPROOF_PROOF_LEDGER.md`
- `docs/REGRESSPROOF_CASE_STUDIES.md`
- a session note

Only add it to `runs[]` when the negative run itself is meant to be part of the durable catalog surface.

## Recently Promoted Path: `pydantic/pydantic`

Current status:

- repository-specific config:
  - `examples/external-pydantic-extra-equality.config.json`
- completed catalog record:
  - `pydantic-extra-equality-2026-05-05`
- result:
  - `successful_change / high`
- artifact:
  - `/tmp/regressproof-pydantic-extra-equality-artifacts/regressproof-report.json`

That means `pydantic/pydantic` is now completed proof, not a prepared candidate.

What was captured during promotion:

1. Exact pinned head commit:
   - `b1bf19445d8ac144a7a0e82674d2d87eebab6c18`
2. Exact baseline commit:
   - `17a35e371bdff348c0690651d324c91fc7c9ff9e`
3. Changed files:
   - `pydantic/main.py`
   - `tests/test_main.py`
4. Verdict and confidence:
   - `successful_change / high`

## Fast Sanity Rule

If a repository is described as proven in memory docs but is absent from `examples/external-runs.json`, treat it as **not yet canonical** until it is revalidated or backfilled with a complete pinned record.
