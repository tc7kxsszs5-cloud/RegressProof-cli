# External Validation Examples

These example configs show how to run RegressProof against repositories outside the RegressProof codebase.

They are intentionally repository-specific.

That is the point.

For external repositories, the most reliable path is:

1. choose a committed range such as `HEAD~1..HEAD`
2. choose a narrow, meaningful build/test slice
3. let RegressProof classify the result conservatively

## Included Examples

- `external-doc-plugin.config.json`
  - lightweight docs/plugin repository checks
- `external-pydantic-extra-equality.config.json`
  - code-plus-test example for a Python-heavy repository
- `external-zustand-persist.config.json`
  - code-plus-test example for a TypeScript library repository
- `external-oh-my-codex-stable-slice.config.json`
  - stable committed validation slice for `Yeachan-Heo/oh-my-codex`

## Example Invocation

```bash
node scripts/run-committed-real-repo-validation.js \
  --repo /tmp/oh-my-codex \
  --config ./examples/external-oh-my-codex-stable-slice.config.json \
  --head-ref HEAD \
  --artifact-dir /tmp/regressproof-oh-my-codex
```

## Notes

- external configs are not universal templates
- if a repository has flaky or environment-sensitive tests, prefer a stable quick-check slice first
- broad full-suite validation can be layered on later, after the repository-specific baseline is trustworthy
