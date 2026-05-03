#!/usr/bin/env node

const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const { execFileSync } = require("node:child_process");

const regressproofRoot = path.resolve(__dirname, "..");
const DEFAULT_SCENARIOS = [
  {
    fixture: "lint-js",
    expectedVerdict: "confirmed_agent_fault",
    expectedConfidence: "high",
    minimumIntroducedFailures: 1,
    requireChangedFileEvidence: true,
  },
  {
    fixture: "preexisting-js",
    expectedVerdict: "preexisting_failure",
    maximumIntroducedFailures: 0,
    minimumPreexistingFailures: 1,
  },
  {
    fixture: "mixed-js",
    expectedVerdict: "confirmed_agent_fault",
    minimumIntroducedFailures: 1,
    minimumPreexistingFailures: 1,
    requireChangedFileEvidence: true,
  },
  {
    fixture: "timeout-js",
    expectedVerdict: "environment_failure",
    expectedConfidence: "low",
  },
];

function main() {
  const args = process.argv.slice(2);
  const outDir =
    readArg(args, "--out-dir") || path.join(os.tmpdir(), `regressproof-canonical-demo-${Date.now()}`);

  fs.mkdirSync(outDir, { recursive: true });

  const suiteSummary = runFixtureSuite(outDir, DEFAULT_SCENARIOS.map((scenario) => scenario.fixture));
  if (suiteSummary.failedCount !== 0) {
    throw new Error("Canonical demo requires all fixture runs to complete successfully.");
  }

  const scenarios = DEFAULT_SCENARIOS.map((scenario) => {
    const fixtureResult = suiteSummary.fixtures.find((entry) => entry.fixture === scenario.fixture);
    if (!fixtureResult) {
      throw new Error(`Missing canonical demo result for fixture: ${scenario.fixture}`);
    }

    const reportPath = path.join(fixtureResult.artifactDir, "regressproof-report.json");
    const markdownPath = path.join(fixtureResult.artifactDir, "regressproof-summary.md");
    const report = JSON.parse(fs.readFileSync(reportPath, "utf8"));

    assertScenario(report, scenario);

    return {
      fixture: scenario.fixture,
      verdict: report.verdict.classification,
      confidence: report.verdict.confidence,
      summary: report.verdict.summary,
      changedFileEvidence: report.verdict.changedFileEvidence,
      introducedFailures: report.failureSummary.metrics.introducedCount,
      preexistingFailures: report.failureSummary.metrics.preexistingCount,
      unchangedFailures: report.failureSummary.metrics.unchangedCount,
      fixedFailures: report.failureSummary.metrics.fixedCount,
      reportPath,
      markdownPath,
      artifactDir: fixtureResult.artifactDir,
      changedFiles: report.git.changedFiles,
    };
  });

  const demoSummary = {
    product: "RegressProof",
    mode: "canonical_fault_demo",
    outDir,
    generatedAt: new Date().toISOString(),
    status: "passed",
    scenarioCount: scenarios.length,
    scenarios,
  };

  const summaryPath = path.join(outDir, "regressproof-canonical-demo.json");
  const markdownPath = path.join(outDir, "regressproof-canonical-demo.md");

  fs.writeFileSync(summaryPath, JSON.stringify(demoSummary, null, 2));
  fs.writeFileSync(markdownPath, renderMarkdown(demoSummary));

  process.stdout.write(
    `${JSON.stringify({ ...demoSummary, summaryPath, markdownPath }, null, 2)}\n`,
  );
}

function runFixtureSuite(outDir, fixtures) {
  const runnerPath = path.join(regressproofRoot, "scripts", "run-all-fixtures.js");
  const args = [runnerPath, "--out-dir", path.join(outDir, "fixtures")];
  for (const fixture of fixtures) {
    args.push("--fixture", fixture);
  }

  const output = execFileSync("node", args, {
    cwd: regressproofRoot,
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"],
    maxBuffer: 1024 * 1024 * 20,
  });

  return JSON.parse(output);
}

function assertScenario(report, scenario) {
  const metrics = report.failureSummary.metrics;

  if (report.verdict.classification !== scenario.expectedVerdict) {
    throw new Error(
      `${scenario.fixture} expected verdict ${scenario.expectedVerdict}, received ${report.verdict.classification}`,
    );
  }

  if (scenario.expectedConfidence && report.verdict.confidence !== scenario.expectedConfidence) {
    throw new Error(
      `${scenario.fixture} expected confidence ${scenario.expectedConfidence}, received ${report.verdict.confidence}`,
    );
  }

  if (
    typeof scenario.minimumIntroducedFailures === "number" &&
    metrics.introducedCount < scenario.minimumIntroducedFailures
  ) {
    throw new Error(
      `${scenario.fixture} expected at least ${scenario.minimumIntroducedFailures} introduced failures, received ${metrics.introducedCount}`,
    );
  }

  if (
    typeof scenario.maximumIntroducedFailures === "number" &&
    metrics.introducedCount > scenario.maximumIntroducedFailures
  ) {
    throw new Error(
      `${scenario.fixture} expected at most ${scenario.maximumIntroducedFailures} introduced failures, received ${metrics.introducedCount}`,
    );
  }

  if (
    typeof scenario.minimumPreexistingFailures === "number" &&
    metrics.preexistingCount < scenario.minimumPreexistingFailures
  ) {
    throw new Error(
      `${scenario.fixture} expected at least ${scenario.minimumPreexistingFailures} preexisting failures, received ${metrics.preexistingCount}`,
    );
  }

  if (scenario.requireChangedFileEvidence && !report.verdict.changedFileEvidence) {
    throw new Error(`${scenario.fixture} expected changed-file evidence in the verdict.`);
  }
}

function renderMarkdown(summary) {
  const lines = [
    "# RegressProof Canonical Fault Demo",
    "",
    `- Status: \`${summary.status}\``,
    `- Generated at: \`${summary.generatedAt}\``,
    `- Scenario count: \`${summary.scenarioCount}\``,
    `- Output directory: \`${summary.outDir}\``,
    "",
    "| Fixture | Verdict | Confidence | Introduced | Preexisting | Changed-file evidence |",
    "| --- | --- | --- | --- | --- | --- |",
  ];

  for (const scenario of summary.scenarios) {
    lines.push(
      `| \`${scenario.fixture}\` | \`${scenario.verdict}\` | \`${scenario.confidence}\` | \`${scenario.introducedFailures}\` | \`${scenario.preexistingFailures}\` | \`${scenario.changedFileEvidence ? "yes" : "no"}\` |`,
    );
  }

  lines.push("", "## Scenario Notes", "");

  for (const scenario of summary.scenarios) {
    lines.push(`### ${scenario.fixture}`);
    lines.push("");
    lines.push(`- Summary: ${scenario.summary}`);
    lines.push(`- Artifact dir: \`${scenario.artifactDir}\``);
    lines.push(`- JSON report: \`${scenario.reportPath}\``);
    lines.push(`- Markdown report: \`${scenario.markdownPath}\``);
    lines.push(
      `- Changed files: ${
        scenario.changedFiles.length > 0
          ? scenario.changedFiles.map((file) => `\`${file}\``).join(", ")
          : "none"
      }`,
    );
    lines.push("");
  }

  return lines.join("\n");
}

function readArg(args, name) {
  const index = args.indexOf(name);
  if (index === -1) {
    return "";
  }

  return args[index + 1] || "";
}

main();
