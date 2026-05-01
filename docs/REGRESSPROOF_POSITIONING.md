# RegressProof Positioning

**Date:** 1 May 2026  
**Status:** Active  
**Tagline:** `Proof, not guesses, for agent-caused regressions.`

## One-Line Positioning

RegressProof is a CLI and GitHub Action for proving whether an AI coding change introduced a real regression.

## What We Are

RegressProof is:

- a local and CI-friendly verification utility
- a baseline-versus-changed comparison system
- a conservative fault-classification layer
- an evidence generator for code review, CI, and internal accountability

## What We Are Not

RegressProof is not:

- a generic AI quality score
- a broad dashboard or observability suite
- a promise of provider-side token refunds
- a system that should invent blame from weak evidence

## Core Promise

When an AI coding patch lands, RegressProof helps answer:

- did the change introduce a measurable regression?
- is the evidence baseline-aware?
- does the failure map back to the changed patch?
- should the result be treated as confirmed fault, possible fault, preexisting failure, environment failure, or insufficient evidence?

## Why This Matters

AI coding speeds code generation up, but it also increases the rate of ambiguous review outcomes:

- a check failed, but was it already failing?
- a test broke, but is it tied to the new patch?
- a build went red, but is it code, setup, or environment?

RegressProof exists to reduce that ambiguity with artifacts a human reviewer can inspect.

## Primary Audience

Best current fit:

- teams using AI coding agents in GitHub workflows
- founders and small engineering teams experimenting with agent-heavy development
- platform builders who need an evidence layer before adding cost or credit policy

## Adoption Story

The current strongest adoption path is:

1. run locally on a repository or fixture
2. wire into GitHub Actions
3. inspect the generated report artifacts
4. use the verdict and evidence to support review decisions

## Public Proof Discipline

External validation should remain conservative:

- pinned public commits count more than floating `HEAD`
- smoke runs are useful, but they are not durable proof
- completed external claims should be backed by explicit config, changed files, verdict, confidence, and artifact path

## Current Product Form

The strongest public framing today is utility-first:

- CLI
- GitHub Action
- proof artifacts
- conservative verdicts

That framing is stronger than trying to present RegressProof as a broad platform before the proof surface is fully mature.
