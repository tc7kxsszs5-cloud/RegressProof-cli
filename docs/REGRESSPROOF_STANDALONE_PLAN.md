# RegressProof Standalone Plan

**Date:** 1 May 2026  
**Status:** Active

## Goal

Keep `RegressProof-cli` as the canonical standalone repository for the product.

## Why This Matters

The project gets weaker when code, docs, and proof claims are split across multiple trees or historical repos.

The repository should present:

- one canonical CLI
- one canonical proof catalog
- one canonical MVP verification path
- one canonical documentation set

## Canonical Repository Rule

Treat `RegressProof-cli` as the active source of truth for:

- runtime code
- fixtures
- external validation records
- product documentation
- release-facing repository metadata

Older or embedded copies should be treated as working contours or legacy context, not as independent product homes.

## Required Proof Surface

The standalone repository should make it easy to find:

- what RegressProof is
- how to run it
- what has already been proven
- which evidence is durable versus provisional
- where the current limits still are

## Minimum Public Shape

The repository should stay strong in five areas:

1. `README.md` that explains the product and proof surface quickly
2. `package.json` commands that expose the main verification flows cleanly
3. `docs/` that preserve positioning, validation rules, and decision memory
4. `examples/external-runs.json` as the external-proof catalog
5. `npm run verify:mvp` as the main self-proof path

## Near-Term Work

Near-term strengthening work should focus on:

- keeping `verify:mvp` green
- keeping committed trust scenarios green
- preserving a conservative external-proof catalog
- improving public case studies and demo material
- reducing ambiguity about canonical versus legacy repos

## What To Avoid

Do not prioritize:

- dashboard expansion before the core proof path is mature
- overclaiming broad coverage from a narrow external corpus
- spreading product memory across inactive repositories

## Success State

This plan is working if a new reader can open `RegressProof-cli` and quickly understand:

- this is the main repository
- this is a working proof utility
- this is what it currently proves
- this is how to run and evaluate it
