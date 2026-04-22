#!/usr/bin/env node

const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const { execFileSync } = require("node:child_process");

const regressproofRoot = path.resolve(__dirname, "..");
const defaultCatalogPath = path.join(regressproofRoot, "examples", "external-runs.json");

function main() {
  const args = process.argv.slice(2);
  const catalogPath = path.resolve(readArg(args, "--catalog") || defaultCatalogPath);
  const format = readArg(args, "--format") || "text";
  const idFilter = readArg(args, "--id");
  const limit = Number(readArg(args, "--limit") || "0");
  const execute = args.includes("--execute");
  const catalog = JSON.parse(fs.readFileSync(catalogPath, "utf8"));
  const candidates = selectCandidates(catalog.candidateQueue || [], idFilter, limit);
  const plan = candidates.map(toPlanItem);

  if (!execute) {
    writePlan(plan, format);
    return;
  }

  const runnable = plan.filter((item) => item.ready);
  if (runnable.length === 0) {
    throw new Error(
      "No runnable external corpus candidates. Promote a candidate by adding configPath, headRef, and artifactDir first.",
    );
  }

  for (const item of runnable) {
    runCandidate(item);
  }
}

function selectCandidates(candidates, idFilter, limit) {
  let selected = candidates;
  if (idFilter) {
    selected = selected.filter((candidate) => candidate.id === idFilter);
  }
  if (limit > 0) {
    selected = selected.slice(0, limit);
  }
  return selected;
}

function toPlanItem(candidate) {
  const missing = [];
  for (const field of ["id", "repo", "url", "language", "status", "rationale", "firstPass"]) {
    if (!candidate[field] || typeof candidate[field] !== "string") {
      missing.push(field);
    }
  }

  const execution = candidate.execution || {};
  for (const field of ["configPath", "headRef", "artifactDir"]) {
    if (!execution[field] || typeof execution[field] !== "string") {
      missing.push(`execution.${field}`);
    }
  }

  const headRef = execution.headRef || "";
  if (headRef === "HEAD") {
    missing.push("execution.headRef must be pinned, not HEAD");
  }

  return {
    id: candidate.id || "",
    repo: candidate.repo || "",
    url: candidate.url || "",
    language: candidate.language || "",
    status: candidate.status || "",
    rationale: candidate.rationale || "",
    firstPass: candidate.firstPass || "",
    execution,
    ready: missing.length === 0 && candidate.status === "ready",
    missing,
  };
}

function writePlan(plan, format) {
  if (format === "json") {
    process.stdout.write(`${JSON.stringify({ candidateCount: plan.length, candidates: plan }, null, 2)}\n`);
    return;
  }

  const lines = [
    "RegressProof External Corpus Plan",
    `Candidates: ${plan.length}`,
    "",
  ];

  for (const item of plan) {
    lines.push(
      `- ${item.id}`,
      `  repo: ${item.repo}`,
      `  language: ${item.language}`,
      `  status: ${item.status}`,
      `  ready: ${item.ready ? "yes" : "no"}`,
      `  first pass: ${item.firstPass}`,
    );
    if (item.missing.length > 0) {
      lines.push(`  missing: ${item.missing.join(", ")}`);
    }
  }

  process.stdout.write(`${lines.join("\n")}\n`);
}

function runCandidate(item) {
  const artifactDir = item.execution.artifactDir.replace(
    "${tmpdir}",
    os.tmpdir().replace(/\\/g, "/"),
  );
  const runnerArgs = [
    path.join(regressproofRoot, "scripts", "run-public-repo-validation.js"),
    "--url",
    item.url,
    "--config",
    path.resolve(regressproofRoot, item.execution.configPath),
    "--head-ref",
    item.execution.headRef,
    "--artifact-dir",
    artifactDir,
  ];

  if (item.execution.branch) {
    runnerArgs.push("--branch", item.execution.branch);
  }
  if (item.execution.baselineRef) {
    runnerArgs.push("--baseline-ref", item.execution.baselineRef);
  }

  execFileSync("node", runnerArgs, {
    cwd: regressproofRoot,
    stdio: "inherit",
  });
}

function readArg(args, name) {
  const index = args.indexOf(name);
  if (index === -1) {
    return "";
  }
  return args[index + 1] || "";
}

main();
