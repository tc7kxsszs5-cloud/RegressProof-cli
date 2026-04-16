#!/usr/bin/env node

const fs = require("node:fs");
const path = require("node:path");

const repoRoot = process.cwd();

const REQUIRED_FILES = [
  "package.json",
  "regressproof.real-repo.config.json",
  "src/cli.js",
  "src/config.js",
  "src/git.js",
  "src/report.js",
  "src/run.js",
  "src/verify.js",
  "docs/REGRESSPROOF_INDEX.md",
];

function main() {
  for (const relativePath of REQUIRED_FILES) {
    const absolutePath = path.join(repoRoot, relativePath);
    if (!fs.existsSync(absolutePath)) {
      throw new Error(`Missing required RegressProof file: ${relativePath}`);
    }
  }

  const packageJson = readJson("package.json");
  const realRepoConfig = readJson("regressproof.real-repo.config.json");

  if (packageJson.name !== "regressproof") {
    throw new Error("Unexpected package name in package.json");
  }

  if (!Array.isArray(realRepoConfig.checks?.quick) || realRepoConfig.checks.quick.length === 0) {
    throw new Error("Real-repo config must define at least one quick check.");
  }

  if (!Array.isArray(realRepoConfig.checks?.full) || realRepoConfig.checks.full.length === 0) {
    throw new Error("Real-repo config must define at least one full check.");
  }

  require(path.join(repoRoot, "src/config.js"));
  require(path.join(repoRoot, "src/git.js"));
  require(path.join(repoRoot, "src/report.js"));
  require(path.join(repoRoot, "src/run.js"));
  require(path.join(repoRoot, "src/verify.js"));

  process.stdout.write("RegressProof self-check passed\n");
}

function readJson(relativePath) {
  return JSON.parse(fs.readFileSync(path.join(repoRoot, relativePath), "utf8"));
}

main();
