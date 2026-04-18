function renderReport(report, format) {
  if (format === "json") {
    return JSON.stringify(report, null, 2);
  }

  const verdictLabel = getVerdictLabel(report.verdict.classification);
  const changedFiles = formatList(report.git.changedFiles);
  const quickChecks = formatList(report.checks.quick);
  const fullChecks = formatList(report.checks.full);
  const baselineResults = report.verification.baseline
    .map(
      (item) =>
        `  - [${item.status}] ${item.command} (${item.durationMs}ms, exit=${item.exitCode})`,
    )
    .join("\n");
  const currentResults = report.verification.current
    .map(
      (item) =>
        `  - [${item.status}] ${item.command} (${item.durationMs}ms, exit=${item.exitCode})`,
    )
    .join("\n");
  const preexistingFailures = formatFailureList(report.failureSummary.preexistingFailures);
  const introducedFailures = formatFailureList(report.failureSummary.introducedFailures);
  const unchangedFailures = formatFailureList(report.failureSummary.unchangedFailures);
  const fixedFailures = formatFailureList(report.failureSummary.fixedFailures);

  return [
    "RegressProof",
    `Project: ${report.projectName}`,
    `Timestamp: ${report.timestamp}`,
    `Status: ${report.status}`,
    "",
    "Decision:",
    `  - verdict: ${verdictLabel} [${report.verdict.classification}]`,
    `  - confidence: ${report.verdict.confidence}`,
    `  - summary: ${report.verdict.summary}`,
    `  - changed file evidence: ${report.verdict.changedFileEvidence ? "yes" : "no"}`,
    `  - next step: ${report.nextStep}`,
    "",
    "Impact:",
    `  - introduced failures: ${report.failureSummary.metrics.introducedCount}`,
    `  - preexisting failures: ${report.failureSummary.metrics.preexistingCount}`,
    `  - unchanged failures: ${report.failureSummary.metrics.unchangedCount}`,
    `  - fixed failures: ${report.failureSummary.metrics.fixedCount}`,
    `  - changed-file matched introductions: ${report.failureSummary.metrics.changedFileMatchedIntroducedCount}`,
    `  - estimated cost usd: ${report.usage.estimatedCostUsd}`,
    `  - internal credit usd: ${report.creditLedger.internalCreditUsd}`,
    "",
    "Git Context:",
    `  - repoRoot: ${report.git.repoRoot}`,
    `  - branch: ${report.git.currentBranch}`,
    `  - headCommit: ${report.git.headCommit}`,
    `  - baselineRef: ${report.git.baselineRef}`,
    `  - baselineCommit: ${report.git.baselineCommit}`,
    `  - compareRef: ${report.git.compareRef}`,
    `  - compareCommit: ${report.git.compareCommit}`,
    `  - diffRange: ${report.git.diffRange}`,
    `  - currentMode: ${report.verification.currentMode}`,
    "  - changedFiles:",
    changedFiles,
    "",
    "Quick Checks:",
    quickChecks,
    "",
    "Full Checks:",
    fullChecks,
    "",
    "Baseline Quick Results:",
    baselineResults,
    "",
    "Current Quick Results:",
    currentResults,
    "",
    "Preexisting Failures:",
    preexistingFailures,
    "",
    "Introduced Failures:",
    introducedFailures,
    "",
    "Unchanged Failures:",
    unchangedFailures,
    "",
    "Fixed Failures:",
    fixedFailures,
  ].join("\n");
}

function formatFailureList(items) {
  if (!items || items.length === 0) {
    return "  - none";
  }

  return items
    .map((item) => {
      const headline = `${item.command} [${item.status}] exit=${item.exitCode}`;
      const details = [];
      if (item.checkType) {
        details.push(`type=${item.checkType}`);
      }
      if (item.filePath) {
        details.push(`file=${shortenPath(item.filePath)}`);
      }
      details.push(`changedFileMatch=${item.changedFileMatchKind || "none"}`);
      if (item.touchesChangedFile) {
        details.push("touchesChangedFile=yes");
      }
      if (item.evidence) {
        details.push(`evidence=${summarizeEvidence(item.evidence)}`);
      }
      const matchedFilesSuffix =
        item.matchedChangedFiles && item.matchedChangedFiles.length > 0
          ? ` matched=${item.matchedChangedFiles.join(",")}`
          : "";
      return `  - ${headline}${details.length > 0 ? ` | ${details.join(" | ")}` : ""}${matchedFilesSuffix}`;
    })
    .join("\n");
}

function renderMarkdownSummary(report) {
  const verdictLabel = getVerdictLabel(report.verdict.classification);
  const introducedFailures = formatFailureListMarkdown(report.failureSummary.introducedFailures);
  const preexistingFailures = formatFailureListMarkdown(report.failureSummary.preexistingFailures);
  const unchangedFailures = formatFailureListMarkdown(report.failureSummary.unchangedFailures);
  const fixedFailures = formatFailureListMarkdown(report.failureSummary.fixedFailures);

  return [
    "# RegressProof Summary",
    "",
    `## ${verdictLabel}`,
    "",
    report.verdict.summary,
    "",
    "## Decision Card",
    "",
    `- Verdict: \`${report.verdict.classification}\``,
    `- Confidence: \`${report.verdict.confidence}\``,
    `- Changed-file evidence: \`${report.verdict.changedFileEvidence ? "yes" : "no"}\``,
    `- Diff range: \`${report.git.diffRange}\``,
    `- Baseline mode: \`${report.verification.baselineMode}\``,
    `- Current mode: \`${report.verification.currentMode}\``,
    "",
    "## Outcome Snapshot",
    "",
    `- Introduced failures: \`${report.failureSummary.metrics.introducedCount}\``,
    `- Fixed failures: \`${report.failureSummary.metrics.fixedCount}\``,
    `- Preexisting failures: \`${report.failureSummary.metrics.preexistingCount}\``,
    `- Changed files in diff: \`${report.proofSignals.changedFilesCount}\``,
    `- Estimated cost USD: \`${report.usage.estimatedCostUsd}\``,
    `- Internal credit USD: \`${report.creditLedger.internalCreditUsd}\``,
    "",
    "| Field | Value |",
    "| --- | --- |",
    `| Project | \`${report.projectName}\` |`,
    `| Status | \`${report.status}\` |`,
    `| Verdict | \`${report.verdict.classification}\` |`,
    `| Confidence | \`${report.verdict.confidence}\` |`,
    `| Baseline ref | \`${report.git.baselineRef}\` |`,
    `| Compare ref | \`${report.git.compareRef}\` |`,
    `| Current mode | \`${report.verification.currentMode}\` |`,
    `| Usage mode | \`${report.usage.mode}\` |`,
    `| Estimated cost USD | \`${report.usage.estimatedCostUsd}\` |`,
    `| Credit triggered | \`${report.creditLedger.triggered ? "yes" : "no"}\` |`,
    `| Internal credit USD | \`${report.creditLedger.internalCreditUsd}\` |`,
    `| Changed file match | \`${report.verdict.changedFileEvidence ? "yes" : "no"}\` |`,
    `| Changed files in diff | \`${report.proofSignals.changedFilesCount}\` |`,
    `| Target paths | \`${report.proofSignals.targetPathCount}\` |`,
    `| Committed diff | \`${report.proofSignals.hasCommittedDiff ? "yes" : "no"}\` |`,
    `| Path-scoped baseline | \`${report.proofSignals.usesPathScopedBaseline ? "yes" : "no"}\` |`,
    `| Snapshot current | \`${report.proofSignals.usesSnapshotCurrent ? "yes" : "no"}\` |`,
    `| Introduced failures | \`${report.failureSummary.metrics.introducedCount}\` |`,
    `| Preexisting failures | \`${report.failureSummary.metrics.preexistingCount}\` |`,
    `| Unchanged failures | \`${report.failureSummary.metrics.unchangedCount}\` |`,
    `| Fixed failures | \`${report.failureSummary.metrics.fixedCount}\` |`,
    `| Changed-file matched introductions | \`${report.failureSummary.metrics.changedFileMatchedIntroducedCount}\` |`,
    "",
    "## Changed Files",
    "",
    formatListMarkdown(report.git.changedFiles),
    "",
    "## Introduced Failures",
    "",
    introducedFailures,
    "",
    "## Preexisting Failures",
    "",
    preexistingFailures,
    "",
    "## Unchanged Failures",
    "",
    unchangedFailures,
    "",
    "## Fixed Failures",
    "",
    fixedFailures,
    "",
    "## Next Step",
    "",
    report.nextStep,
    "",
  ].join("\n");
}

function renderPullRequestSummary(report) {
  const verdictLabel = getVerdictLabel(report.verdict.classification);
  const introducedFailuresCount = report.failureSummary.introducedFailures.length;
  const preexistingFailuresCount = report.failureSummary.preexistingFailures.length;
  const unchangedFailuresCount = report.failureSummary.unchangedFailures.length;
  const fixedFailuresCount = report.failureSummary.fixedFailures.length;

  return [
    "## RegressProof Verdict",
    "",
    `**${verdictLabel}**`,
    "",
    report.verdict.summary,
    "",
    `- Verdict: \`${report.verdict.classification}\``,
    `- Confidence: \`${report.verdict.confidence}\``,
    `- Changed file match: \`${report.verdict.changedFileEvidence ? "yes" : "no"}\``,
    `- Changed files in diff: \`${report.proofSignals.changedFilesCount}\``,
    `- Path-scoped baseline: \`${report.proofSignals.usesPathScopedBaseline ? "yes" : "no"}\``,
    `- Snapshot current: \`${report.proofSignals.usesSnapshotCurrent ? "yes" : "no"}\``,
    `- Diff range: \`${report.git.diffRange}\``,
    `- Current mode: \`${report.verification.currentMode}\``,
    `- Estimated cost USD: \`${report.usage.estimatedCostUsd}\``,
    `- Internal credit USD: \`${report.creditLedger.internalCreditUsd}\``,
    `- Introduced failures: \`${introducedFailuresCount}\``,
    `- Changed-file matched introductions: \`${report.failureSummary.metrics.changedFileMatchedIntroducedCount}\``,
    `- Preexisting failures: \`${preexistingFailuresCount}\``,
    `- Unchanged failures: \`${unchangedFailuresCount}\``,
    `- Fixed failures: \`${fixedFailuresCount}\``,
    "",
  ].join("\n");
}

function renderPullRequestComment(report) {
  const verdictLabel = getVerdictLabel(report.verdict.classification);
  const changedFiles = formatListMarkdownInline(report.git.changedFiles, 8);
  const introducedFailures = formatFailureListMarkdown(report.failureSummary.introducedFailures);
  const fixedFailures = formatFailureListMarkdown(report.failureSummary.fixedFailures);
  const preexistingFailures = formatFailureListMarkdown(report.failureSummary.preexistingFailures);

  return [
    "<!-- regressproof-comment -->",
    "## RegressProof Review",
    "",
    `**${verdictLabel}**`,
    "",
    report.verdict.summary,
    "",
    "### Decision Card",
    "",
    `- Verdict: \`${report.verdict.classification}\``,
    `- Confidence: \`${report.verdict.confidence}\``,
    `- Diff range: \`${report.git.diffRange}\``,
    `- Baseline mode: \`${report.verification.baselineMode}\``,
    `- Current mode: \`${report.verification.currentMode}\``,
    `- Changed-file evidence: \`${report.verdict.changedFileEvidence ? "yes" : "no"}\``,
    "",
    "### What Changed",
    "",
    `- Changed files in diff: \`${report.proofSignals.changedFilesCount}\``,
    changedFiles,
    "",
    "### Outcome Snapshot",
    "",
    `- Introduced failures: \`${report.failureSummary.metrics.introducedCount}\``,
    `- Fixed failures: \`${report.failureSummary.metrics.fixedCount}\``,
    `- Preexisting failures: \`${report.failureSummary.metrics.preexistingCount}\``,
    `- Changed-file matched introductions: \`${report.failureSummary.metrics.changedFileMatchedIntroducedCount}\``,
    `- Estimated cost: \`$${report.usage.estimatedCostUsd}\``,
    `- Internal credit: \`$${report.creditLedger.internalCreditUsd}\``,
    "",
    "### Introduced Failures",
    "",
    introducedFailures,
    "",
    "### Fixed Failures",
    "",
    fixedFailures,
    "",
    "### Preexisting Failures",
    "",
    preexistingFailures,
    "",
    "### Recommended Next Step",
    "",
    report.nextStep,
    "",
  ].join("\n");
}

function formatFailureListMarkdown(items) {
  return formatFailureList(items).replace(/^  - /gm, "- ");
}

function formatList(items) {
  if (!items || items.length === 0) {
    return "  - none";
  }

  return items.map((item) => `  - ${item}`).join("\n");
}

function formatListMarkdown(items) {
  if (!items || items.length === 0) {
    return "- none";
  }

  return items.map((item) => `- \`${item}\``).join("\n");
}

function formatListMarkdownInline(items, maxItems) {
  if (!items || items.length === 0) {
    return "- none";
  }

  const visible = items.slice(0, maxItems).map((item) => `- \`${item}\``);
  if (items.length > maxItems) {
    visible.push(`- and ${items.length - maxItems} more`);
  }

  return visible.join("\n");
}

function summarizeEvidence(evidence) {
  return evidence
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .slice(0, 2)
    .join(" | ")
    .slice(0, 220);
}

function shortenPath(filePath) {
  const normalized = String(filePath).replace(/^\/+/, "");
  const segments = normalized.split("/");
  if (segments.length <= 4) {
    return normalized;
  }

  return `.../${segments.slice(-4).join("/")}`;
}

function getVerdictLabel(classification) {
  switch (classification) {
    case "confirmed_agent_fault":
      return "Confirmed Agent Fault";
    case "possible_agent_fault":
      return "Possible Agent Fault";
    case "preexisting_failure":
      return "Pre-existing Failure";
    case "environment_failure":
      return "Environment Failure";
    case "insufficient_evidence":
      return "Insufficient Evidence";
    case "successful_change":
      return "Successful Change";
    case "verification_pending":
      return "Verification Pending";
    default:
      return "RegressProof Verdict";
  }
}

module.exports = {
  renderReport,
  renderMarkdownSummary,
  renderPullRequestComment,
  renderPullRequestSummary,
};
