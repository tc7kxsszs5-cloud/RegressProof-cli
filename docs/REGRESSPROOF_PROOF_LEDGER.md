# RegressProof Proof Ledger

**Purpose:** One-page public proof summary for the repository surface
**Last updated:** 23 April 2026

## Current Metrics

- external validation runs: `7`
- public repositories in catalog: `6`
- tracked fixtures: `11/11`
- standalone trust scenario: `successful_change / high`
- standalone deep trust scenario: `successful_change / high`
- supported evidence formats: JSON report, Markdown summary, PR summary, PR comment body, JSONL ledger

## External Corpus

| Repository | Category | Range | Verdict | Evidence |
| --- | --- | --- | --- | --- |
| `pallets/click` | Python CLI flag behavior | `7f7bbe4..91de59c` | `successful_change / high` | changelog, source, tests |
| `pytest-dev/pluggy` | Python plugin manager | `6e1d0f1..20d8143` | `successful_change / high` | source, tests, changelog |
| `nanostores/nanostores` | TypeScript state library | `8ad031d..3206678` | `successful_change / high` | runtime source, package limits |
| `unjs/ofetch` | TypeScript fetch utility | `abc5a8f..3cf498b` | `successful_change / high` | source, tests, config |
| `sindresorhus/ky` | TypeScript HTTP client | `e9eeb35..346f898` | `successful_change / high` | source, tests |
| `openclaw/openclaw` | provider-code repository | `dc6ecd5..9753437` | `successful_change / high` | provider source, provider tests |
| `openclaw/openclaw` | public-runner smoke | `fcc86f0..f1df354` | `successful_change / high` | runner smoke |

## Conservative Classification Evidence

RegressProof has shown that it can produce positive evidence without
overclaiming ambiguous failures.

Examples:

- `pytest-dev/pluggy`: an initial `python` command produced `preexisting_failure / low` because the shell lacked `python`; after switching to `python3`, the pinned run produced `successful_change / high`.
- `Yeachan-Heo/oh-my-codex`: a broader check surfaced environment-sensitive path behavior, reinforcing the need for repository-specific verification slices.

## What This Proves

RegressProof is not only a fixture demo.

It has evidence for:

- baseline-vs-current comparison
- path-scoped baseline snapshots
- snapshot current execution
- changed-file evidence capture
- repository-specific external configs
- conservative verdict classes
- artifact-producing CLI and GitHub Action workflow

## What This Does Not Claim

RegressProof does not claim:

- universal provider token refunds
- perfect attribution for every ambiguous failure
- proof without repository-appropriate checks
- full replacement for test coverage or human review
