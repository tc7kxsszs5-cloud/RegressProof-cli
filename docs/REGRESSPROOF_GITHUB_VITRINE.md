# RegressProof GitHub Vitrine

**Purpose:** Ready-to-paste public-facing copy for the GitHub repository surface  
**Last updated:** 22 April 2026

## GitHub About

Short description:

`Proof, not guesses, for agent-caused regressions.`

Longer description:

`Baseline-vs-current regression proof for AI coding changes, with diff-aware attribution and evidence-focused verdicts.`

## Suggested Topics

- `ai-coding`
- `ai-agents`
- `regression-detection`
- `developer-tools`
- `github-actions`
- `code-review`
- `validation`
- `nodejs`
- `regression-proof`
- `ai-code-review`

## Repository Introduction

Use this when a short repository intro is needed on GitHub, in a post, or in a project directory:

> RegressProof is a proof-based regression detection layer for AI coding changes. It compares a baseline snapshot against a current change, maps failures to the diff, and emits evidence-focused verdicts instead of intuition-only blame.

## One-Paragraph Pitch

> RegressProof helps teams answer a hard question normal CI does not answer cleanly: did this agent-driven change introduce a measurable new regression, and can we prove it? Instead of only showing red or green checks, it compares baseline vs current verification, looks at the changed files, and classifies the result as agent fault, preexisting failure, environment failure, or insufficient evidence.

## Release Blurb

Use this when announcing the current MVP:

> RegressProof is now a proven standalone MVP. The repository passes full `verify-mvp`, the tracked fixture suite passes `11/11`, committed trust scenarios validate as `successful_change / high`, and the curated external corpus includes 6 pinned runs across 5 public repositories including `pytest-dev/pluggy`, `nanostores/nanostores`, `unjs/ofetch`, `sindresorhus/ky`, and `openclaw/openclaw`.

## Public Proof Line

Use this when you need one short sentence about maturity:

> RegressProof has moved beyond fixture-only proof: it now passes its full standalone MVP flow and has been exercised against public repositories with repository-specific validation slices.

## Metrics Line

Use this near the top of README, release notes, or repository social copy:

> Current proof surface: 6 external runs, 5 public repositories, 11/11 tracked fixtures, standalone trust scenarios passing, and conservative verdict handling for environment/preexisting failures.

## Suggested Repository Header

```text
RegressProof: proof, not guesses, for agent-caused regressions.

CLI + GitHub Action utility that compares baseline vs current verification,
maps failures to changed files, and emits evidence-focused verdicts.
Current proof: 6 external runs / 5 public repos / 11 tracked fixtures.
```
