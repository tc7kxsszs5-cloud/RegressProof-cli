# RegressProof Case Studies

**Purpose:** Preserve concise proof-oriented examples from real validation runs  
**Last updated:** 20 April 2026

## Why This Exists

Fixtures prove that the core engine works under controlled conditions.

Case studies prove something different:

- RegressProof can be applied to public repositories outside its own codebase
- verification often needs a repository-specific build/test slice
- the system can produce both clean positive evidence and honest caveats

## Case Study 1: `forrestchang/andrej-karpathy-skills`

- category: docs/plugin repository
- validation style: committed range with lightweight file-structure checks
- result: `successful_change / high`

Why it matters:

- demonstrates that RegressProof works on repositories with little or no compiled code
- shows usefulness for packaging, docs, and plugin-surface validation

## Case Study 2: `shanraisshan/claude-code-best-practice`

- category: larger docs/configuration repository
- validation style: committed range with repository-appropriate config/document checks
- result: `successful_change / high`

Why it matters:

- expands beyond a tiny plugin repo into broader documentation/configuration history
- shows that RegressProof is still useful when the main product surface is not a compiled binary

## Case Study 3: `NousResearch/hermes-agent`

- category: code-plus-test repository
- validation style: committed range with code-aware verification
- result: `successful_change / high`

Why it matters:

- demonstrates that RegressProof can operate on a real software repository with code and tests
- strengthens the claim that the product is not limited to toy or doc-only repositories

## Case Study 4: `Yeachan-Heo/oh-my-codex`

- category: workflow/code repository
- committed range: `HEAD~1..HEAD`
- validation style: repository-specific committed build/test slice
- stable-slice result: `successful_change / high`

What was validated:

- TypeScript build on baseline and current
- stable regression-oriented test slice around runtime and triage behavior

Why it matters:

- shows that RegressProof can be adapted to a larger real-world codebase with a broad diff
- proves that repository-specific validation slices are a feature, not a weakness

Important caveat from the same repository:

- a broader check surfaced an environment-sensitive path assertion (`/var/...` vs `/private/var/...`)
- this is good evidence that RegressProof should stay conservative instead of turning every failed broad check into agent blame

What this teaches:

- real external validation is not just about green results
- it is also about showing where the system should return a narrower or more cautious interpretation

## Product Meaning

Taken together, these case studies show that RegressProof is already usable as:

- a standalone MVP
- an evidence-focused validation layer for public repositories
- a system that can support repository-specific verification without abandoning conservative attribution

## Case Study 5: `MemPalace/mempalace`

- category: Python code-plus-test repository
- committed range: `HEAD~1..HEAD`
- changed files inside validation boundary:
  - `mempalace/hooks_cli.py`
  - `tests/test_hooks_cli.py`
- validation style: narrow repo-specific Python slice
- result: `successful_change / high`

What was validated:

- Python syntax/compile safety for `mempalace/hooks_cli.py`
- targeted pytest slice for `tests/test_hooks_cli.py`

Why it matters:

- gives RegressProof a clean public Python case study, not only JS/TS-leaning examples
- shows that committed attribution can stay tightly aligned with the files touched by the actual diff
- demonstrates that a small, meaningful build/test slice is often the strongest external proof surface

What this teaches:

- external validation does not need to start with a repository's entire test suite
- a well-chosen committed slice can produce a stronger, more honest MVP proof than a noisy broad run

## Case Study 6: `sindresorhus/ky`

- category: TypeScript library hook-regression repository
- committed range: `346f8986f98b3b6769034e28d5095922670a7ed6~1..346f8986f98b3b6769034e28d5095922670a7ed6`
- changed files inside validation boundary:
  - `source/core/Ky.ts`
  - `test/hooks.ts`
- validation style: sparse public-repository clone with a pinned hook regression slice
- result: `successful_change / high`

What was validated:

- baseline snapshot was missing the tuple `searchParams` clone helper and targeted regression test
- current snapshot contained the fix and the corresponding hook regression test
- RegressProof classified the run as a successful change with high confidence

Why it matters:

- gives the external corpus a compact TypeScript library case with source-plus-test evidence
- demonstrates that the corpus runner can promote a candidate into a pinned reproducible run
- shows RegressProof can recognize a fix path, not only newly introduced failures
