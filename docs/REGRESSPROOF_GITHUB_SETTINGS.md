# RegressProof GitHub Repository Settings

**Purpose:** Store the intended GitHub repository metadata inside the project tree.

## Current Target

Repository:

```text
tc7kxsszs5-cloud/RegressProof-cli
```

About description:

```text
Proof, not guesses, for agent-caused regressions.
```

Website:

```text
leave blank for now
```

Topics:

```text
ai-coding
ai-agents
regression-detection
developer-tools
github-actions
code-review
validation
regression-proof
ai-code-review
nodejs
```

## How To Apply

If GitHub CLI is available and authenticated with repository admin or maintain
permissions:

```bash
gh repo edit tc7kxsszs5-cloud/RegressProof-cli \
  --description "Proof, not guesses, for agent-caused regressions." \
  --add-topic ai-coding \
  --add-topic ai-agents \
  --add-topic regression-detection \
  --add-topic developer-tools \
  --add-topic github-actions \
  --add-topic code-review \
  --add-topic validation \
  --add-topic regression-proof \
  --add-topic ai-code-review \
  --add-topic nodejs
```

If applying manually in GitHub:

1. Open the repository main page.
2. Select the gear icon near the About section.
3. Set the description exactly as above.
4. Leave website blank for now.
5. Add the topics listed above.
6. Save changes.

## Current Access Note

During the 23 April 2026 session:

- `gh` was not installed in the shell.
- no `GH_TOKEN` or `GITHUB_TOKEN` environment variable was available.
- the GitHub connector could read repository metadata but did not have
  admin/maintain/push permissions for repository metadata updates.

Therefore the intended metadata is committed in `.github/repository.yml` and in
this document as durable project memory.
