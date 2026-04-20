# RegressProof Demo Brief

**Audience:** founders, investors, engineering leaders  
**Purpose:** explain the MVP in plain language, quickly  
**Last updated:** 20 April 2026

## The Simple Problem

AI coding tools can produce changes that look productive at first and still introduce regressions.

When something breaks, teams usually see one of two weak outcomes:

- CI is red, but nobody can tell whether the failure was already there
- an agent gets blamed without proof

RegressProof exists to close that gap.

## The Core Question

`Did this agent-driven change introduce a measurable new regression, and can we prove it?`

## What RegressProof Does

RegressProof compares two states of a repository:

- the baseline state before the change
- the current state after the agent-driven change

Then it runs verification, looks at the diff, and classifies the result conservatively.

Instead of "this feels bad," it aims to say:

- this was already failing before the change
- this is a newly introduced regression
- this failure points to code the agent touched
- this looks like environment noise
- there is not enough evidence yet

## Why This Matters

Normal CI can tell a team that something is broken.

RegressProof tries to tell the team what the break means.

That matters for:

- trusting or rejecting agent-generated patches
- deciding whether an internal credit should be recorded
- separating provider-quality issues from repo-health issues
- making AI coding adoption safer for real engineering teams

## Example Summary

Imagine an agent edits a type-sensitive module.

The baseline verification passes.

The post-change verification fails.

The failure is tied to a file in the diff.

RegressProof can summarize that as:

> The change introduced a measurable new regression, the evidence points to code the agent touched, and the result should be treated as a high-confidence agent fault rather than a preexisting repo problem.

That is much closer to an operational decision than a generic red CI badge.

## Current MVP Proof Points

As of the current standalone MVP state, RegressProof has already demonstrated:

- full `verify-mvp` passing
- tracked fixture suite passing `11/11`
- committed trust scenario: `successful_change / high`
- committed deep scenario: `successful_change / high`
- successful external validation on public GitHub repositories including:
  - `NousResearch/hermes-agent`
  - `Yeachan-Heo/oh-my-codex`

Important nuance:

- the `oh-my-codex` run also surfaced an environment-sensitive path assertion on a broader check
- that is useful proof that RegressProof is not only about green demos; it is also about keeping attribution conservative when the signal is noisy

## The Short Pitch

> RegressProof is an accountability layer for AI coding changes. It does not just say that CI is red. It tries to prove whether the agent actually introduced a new regression, using baseline comparison, diff-aware attribution, and evidence-focused verdicts.
