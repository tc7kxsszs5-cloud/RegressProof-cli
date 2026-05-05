# External Validation Examples

These example configs show how to run RegressProof against repositories outside the RegressProof codebase.

They are intentionally repository-specific.

That is the point.

For external repositories, the most reliable path is:

1. choose a committed range such as `HEAD~1..HEAD`
2. choose a narrow, meaningful build/test slice
3. let RegressProof classify the result conservatively

## Fast Reviewer Demo

For a quick outsider pass, use this sequence:

1. open `external-runs.json`
2. pick one `completed_pinned_run`
3. note the `configPath`, `diffRange`, `changedFiles`, `verdict`, and `artifactPath`
4. open the matching case study in `../docs/REGRESSPROOF_CASE_STUDIES.md`

That is the canonical external proof surface. It keeps the claim tied to one pinned diff and one inspectable artifact path.

## Included Examples

- `external-doc-plugin.config.json`
  - lightweight docs/plugin repository checks
- `external-click-flag-value.config.json`
  - pinned Python CLI behavior example for `pallets/click`
- `external-ky-hooks.config.json`
  - pinned TypeScript hook-regression example for `sindresorhus/ky`
- `external-nanostores-global-epoch.config.json`
  - pinned TypeScript state-library example for `nanostores/nanostores`
- `external-ofetch-timeout-signal.config.json`
  - pinned TypeScript timeout-signal example for `unjs/ofetch`
- `external-openclaw-code.config.json`
  - pinned larger provider-code example for `openclaw/openclaw`
- `external-pluggy-pluginmanager.config.json`
  - pinned Python plugin-manager example for `pytest-dev/pluggy`
- `external-scqos-python.config.json`
  - exploratory Python self-check example for `KnowledgeeKZA3224/scqos-reference-implementation`
  - do not treat as canonical proof until a pinned baseline/head run is possible
- `external-pydantic-extra-equality.config.json`
  - pinned Python runtime equality example for `pydantic/pydantic`
- `external-sindresorhus-is-type-guards.config.json`
  - pinned TypeScript type-guard narrowing example for `sindresorhus/is`
- `external-zustand-persist.config.json`
  - pinned TypeScript persist/rehydration example for `pmndrs/zustand`
- `external-oh-my-codex-stable-slice.config.json`
  - stable committed validation slice for `Yeachan-Heo/oh-my-codex`
- `external-mempalace-hooks-cli.config.json`
  - Python code-plus-test committed validation slice for `MemPalace/mempalace`

## Example Invocation

```bash
node scripts/run-committed-real-repo-validation.js \
  --repo /tmp/oh-my-codex \
  --config ./examples/external-oh-my-codex-stable-slice.config.json \
  --head-ref HEAD \
  --artifact-dir /tmp/regressproof-oh-my-codex
```

## Adapting An Example To Your Repo

Use an example config as a pattern, not as a universal template.

Good first-pass rules:

1. keep the verification slice narrow
2. prefer commands that already pass reliably on both sides of `HEAD~1..HEAD`
3. make sure the changed files stay inside the slice you are testing
4. widen coverage only after the first artifact is clean and understandable

## Notes

- external configs are not universal templates
- if a repository has flaky or environment-sensitive tests, prefer a stable quick-check slice first
- broad full-suite validation can be layered on later, after the repository-specific baseline is trustworthy
