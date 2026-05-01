# RegressProof Product Brief

**Date:** 13 April 2026  
**Status:** Draft  
**Product name:** `RegressProof`  
**Tagline:** `Proof, not guesses, for agent-caused regressions.`

## Summary

RegressProof is a CLI and GitHub Action utility that provides a validation and accountability layer for AI coding agents.

It checks whether an agent-introduced code change caused a measurable regression, links that regression to real verification evidence, and records the associated spend or estimated spend. It does not rely on intuition or vague judgment. It relies on baseline comparison, test results, build results, and confidence-scored classification.

The current strongest product form is a standalone utility repository with a clear CLI entrypoint, reproducible fixture validation, committed trust scenarios, and a growing external proof catalog.

## The Problem

AI coding agents can:

- introduce regressions
- claim tasks are complete when they are not
- trigger repeated repair loops
- consume extra tokens and engineering time

Existing tools often measure usage and cost, but they do not reliably answer:

- did the agent cause a new regression?
- can we prove it with testable evidence?
- how much did that failure cost?
- should the run be credited, penalized, or flagged for review?

## The Product

RegressProof is installed as a developer utility around AI-generated code changes and verifies them using measurable signals:

- git diff
- lint
- typecheck
- unit tests
- integration tests
- build
- optional e2e and contract tests

It compares baseline results against post-change results and determines whether the agent likely introduced a new regression.

## What Makes It Different

RegressProof is built around proof, not speculation.

It is not:

- a generic observability dashboard
- a vague “AI quality” score
- a promise of provider-side token refunds

It is:

- a CLI and GitHub Action utility for regression proof
- a fault attribution layer with evidence artifacts
- a cost accountability mechanism for internal review
- an internal credit and reliability ledger for agent runs

## Target Users

- teams using AI coding agents in GitHub workflows
- founders experimenting with agent-based development
- engineering teams that want to reduce wasted spend from bad AI patches
- platform builders creating multi-agent coding environments

## Why Now

AI-assisted coding is accelerating, but trust still breaks down at the review boundary.

Teams increasingly need help answering:

- did this patch really introduce the regression?
- was the failure already present?
- do we have enough evidence to blame the new change?

That is the gap RegressProof is trying to close.

## First Release Scope

The first release should focus on:

- GitHub-first workflows
- CLI wrapper plus GitHub Action
- baseline vs post-change verification
- high-confidence fault detection only
- internal credit ledger
- markdown and JSON reports

The first release should be packaged and explained as a practical utility first, not as a broad governance platform.

## What It Will Prove

The first version should prove that it can:

- detect known bad patches
- avoid blaming the agent for pre-existing failures
- classify failures with confidence
- track spend or estimated spend per run
- produce reports a human reviewer can trust

## What It Will Not Promise

The first version will not promise:

- universal support for every agent environment
- perfect attribution in all ambiguous cases
- refunds of real provider tokens
- detection of every business-logic mistake without supporting tests

## Adoption Strategy

The most credible path is:

1. prove the CLI on fixtures and committed trust scenarios
2. prove the external runner on pinned public repositories
3. make reports easy to inspect in GitHub workflows
4. expand only after the evidence surface stays honest

## Why The Idea Matters

As AI coding systems improve, reliability and accountability become more important than raw generation speed.

RegressProof helps answer:

- which agents are reliable?
- which patches are risky?
- which failures are real regressions?
- how much cost comes from low-quality agent output?

This makes RegressProof useful both as an engineering tool and as a foundation for broader AI code governance.

## Success Criteria

RegressProof is successful if a team can run it against a real repository and trust it to:

- find measurable new regressions
- distinguish them from old failures
- connect them to specific patches or PRs
- quantify the cost of those failures
- give a fair, evidence-backed assessment of agent-caused faults

## Current Public Shape

Today the project should be presented as:

- a standalone CLI repository
- a GitHub Action-friendly validation utility
- a proof-first regression checker
- a conservative accountability layer for AI coding workflows

## Recommended Next Documents

- `REGRESSPROOF_SPEC.md`
- implementation plan
- MVP task breakdown
- validation and fixture-repo test plan
