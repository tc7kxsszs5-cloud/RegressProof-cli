# RegressProof v0.1.0

**Release date:** 18 April 2026  
**Status:** First standalone MVP tag

## Summary

This release marks the first standalone `RegressProof-cli` MVP cut.

It establishes `RegressProof-cli` as the primary standalone repository for:

- local CLI verification
- fixture-based regression proof
- committed real-repo trust validation
- GitHub Action execution of the MVP verification flow

Core promise remains:

`proof, not guesses`

## What This Release Proves

At the time of tagging, the standalone repository validates successfully through:

- full `verify-mvp` execution
- `11/11` tracked fixtures passing
- committed trust scenario verdict: `successful_change / high`
- committed deep scenario verdict: `successful_change / high`

## Included MVP Surface

- `node scripts/verify-mvp.js`
- `node scripts/run-all-fixtures.js`
- `node scripts/verify-real-repo-trust-scenario.js`
- `node scripts/verify-real-repo-deep-scenario.js`
- append-only JSONL ledger output
- JSON and Markdown report artifacts
- standalone-root README and canonical docs
- GitHub workflow at `.github/workflows/regressproof.yml`

## Not Included Yet

- provider-native billing integrations
- dashboard product surface
- broad external validation coverage across many public repositories
- low-confidence auto-credit decisions

## Recommended Demo Path

From the repository root:

```bash
node scripts/verify-mvp.js --repo "$PWD" --out-dir /tmp/regressproof-mvp
```

Summary artifact:

```text
/tmp/regressproof-mvp/regressproof-mvp-summary.json
```

## Release Notes

- standalone repository validation flow now passes end-to-end
- standalone committed trust scenarios now work against root-level repository layout
- canonical project docs now describe the standalone repository as the primary MVP surface
- SwiftPM macOS fixture coverage is included in the validated fixture suite
