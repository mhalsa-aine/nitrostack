#!/usr/bin/env node

/**
 * MultiverseOps - Windows CMD UI & Matrix Visualizer
 * Author: Krushmika S M (Terminal UI Specialist & Matrix Visualizer Lead)
 */

import { MultiverseEngine } from "./multiverse-engine.js";
import readline from "readline";

// ANSI Color Constants for Terminal UI
const COLORS = {
  reset: "\x1b[0m",
  bright: "\x1b[1m",
  dim: "\x1b[2m",
  cyan: "\x1b[36m",
  magenta: "\x1b[35m",
  blue: "\x1b[34m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  red: "\x1b[31m",
  bgCyan: "\x1b[46m\x1b[30m",
  bgGreen: "\x1b[42m\x1b[30m",
  bgYellow: "\x1b[43m\x1b[30m",
  bgMagenta: "\x1b[45m\x1b[37m"
};

const PRESET_COMMANDS = [
  { id: 1, name: "🚀 Enterprise Infrastructure & Pricing Rollout", cmd: "Deploy global enterprise infrastructure & pricing update" },
  { id: 2, name: "🗄️ Core Database Migration & Schema Patch", cmd: "Migrate multi-region PostgreSQL clusters to v16 with zero lock-time" },
  { id: 3, name: "💳 Global Flash Sale Payment & Inventory Surge", cmd: "Process 50,000 concurrent payment transactions & apply 20% discount cap" },
  { id: 4, name: "👥 Bulk Offboarding & Zero-Trust SaaS Revocation", cmd: "Execute automated offboarding for 500 departing enterprise employees" }
];

function printBanner() {
  console.clear();
  console.log(`${COLORS.cyan}${COLORS.bright}`);
  console.log(`  ==================================================================================`);
  console.log(`   🌌 MULTIVERSE-OPS : 30-UNIVERSE SPECULATIVE PARALLEL AGENTIC EXECUTION ENGINE   `);
  console.log(`  ==================================================================================${COLORS.reset}`);
  console.log(`  ${COLORS.dim}Lead Developer: Krushmika S M (Terminal UI Specialist & Matrix Visualizer Lead)${COLORS.reset}`);
  console.log(`  ${COLORS.dim}Core Engine: Mhalsa | MCP Security: Pavitra | Web Studio: Niharika${COLORS.reset}\n`);
}

function printProgressBar(current, total = 30) {
  const width = 30;
  const ratio = Math.min(1, Math.max(0, current / total));
  const filled = Math.round(width * ratio);
  const empty = width - filled;
  const percent = Math.round(ratio * 100);
  const bar = "█".repeat(filled) + "░".repeat(empty);
  return `${COLORS.cyan}[${bar}]${COLORS.reset} ${COLORS.bright}${percent}%${COLORS.reset} (${current}/${total} Universes Simulated)`;
}

function printMatrixGrid(completedMap) {
  console.log(`  ${COLORS.bright}${COLORS.magenta}--- 30-UNIVERSE VIRTUAL AGENT MATRIX SIMULATION ---${COLORS.reset}\n`);
  
  const ids = Array.from({ length: 30 }, (_, i) => `U${String(i + 1).padStart(2, "0")}`);
  let line = "   ";
  
  ids.forEach((id, idx) => {
    const item = completedMap.get(id);
    let badge = `${COLORS.dim}[${id}: WAITING]${COLORS.reset}`;
    
    if (item) {
      if (item.status === "PASSED") {
        badge = `${COLORS.green}[${id}:  PASSED]${COLORS.reset}`;
      } else if (item.status === "MITIGATED") {
        badge = `${COLORS.yellow}[${id}: MITIGATE]${COLORS.reset}`;
      } else {
        badge = `${COLORS.red}[${id}:  FAILED ]${COLORS.reset}`;
      }
    }

    line += badge + "  ";
    if ((idx + 1) % 5 === 0) {
      console.log(line);
      line = "   ";
    }
  });
  console.log("");
  console.log(`  ${printProgressBar(completedMap.size, 30)}\n`);
}

async function promptForCommand() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  return new Promise((resolve) => {
    console.log(`  ${COLORS.bright}${COLORS.yellow}Select High-Stakes Target Operational Command:${COLORS.reset}\n`);
    PRESET_COMMANDS.forEach(p => {
      console.log(`   ${COLORS.cyan}[${p.id}]${COLORS.reset} ${p.name}`);
    });
    console.log(`   ${COLORS.cyan}[5]${COLORS.reset} ✏️  Type a custom operational command\n`);

    rl.question(`  ${COLORS.bright}Choose option [1-5] (Default: 1): ${COLORS.reset}`, (answer) => {
      rl.close();
      const choice = parseInt(answer.trim(), 10);
      if (choice >= 1 && choice <= 4) {
        resolve(PRESET_COMMANDS[choice - 1].cmd);
      } else if (choice === 5) {
        const rlCustom = readline.createInterface({ input: process.stdin, output: process.stdout });
        rlCustom.question(`  ${COLORS.bright}Enter custom operational script: ${COLORS.reset}`, (cust) => {
          rlCustom.close();
          resolve(cust.trim() || PRESET_COMMANDS[0].cmd);
        });
      } else {
        resolve(PRESET_COMMANDS[0].cmd);
      }
    });
  });
}

async function main() {
  printBanner();

  const userArgs = process.argv.slice(2);
  let targetCommand = "";

  if (userArgs.length > 0) {
    targetCommand = userArgs.join(" ");
  } else {
    targetCommand = await promptForCommand();
  }

  printBanner();
  console.log(`  ${COLORS.bright}🎯 Enterprise Target Command:${COLORS.reset} ${COLORS.cyan}"${targetCommand}"${COLORS.reset}`);
  console.log(`  ${COLORS.dim}Forking 30 speculative parallel sub-agents across NitroCloud edge workers...${COLORS.reset}\n`);

  const engine = new MultiverseEngine();
  const completedMap = new Map();

  // Execute with real-time matrix updates
  const summary = await engine.executeSpeculativeMatrix(targetCommand, (universeResult) => {
    completedMap.set(universeResult.universeId, universeResult);
    // Clear screen redraw cleanly to avoid line bleed in PowerShell
    console.clear();
    printBanner();
    console.log(`  ${COLORS.bright}🎯 Enterprise Target Command:${COLORS.reset} ${COLORS.cyan}"${targetCommand}"${COLORS.reset}`);
    console.log(`  ${COLORS.dim}Forking 30 speculative parallel sub-agents across NitroCloud edge workers...${COLORS.reset}\n`);
    printMatrixGrid(completedMap);
  });

  // Final Matrix View
  console.clear();
  printBanner();
  console.log(`  ${COLORS.bright}🎯 Enterprise Target Command:${COLORS.reset} ${COLORS.cyan}"${targetCommand}"${COLORS.reset}\n`);
  printMatrixGrid(completedMap);

  // Render Quantum Remediated Execution Summary Box
  console.log(`  ${COLORS.bright}${COLORS.cyan}+----------------------------------------------------------------------------------+`);
  console.log(`  | 🌌 QUANTUM SYNTHESIS & REMEDIATION PLAN SUMMARY                                  |`);
  console.log(`  +----------------------------------------------------------------------------------+${COLORS.reset}`);
  console.log(`   * Safety Index:        ${COLORS.bright}${COLORS.green}${summary.remediatedPlan.synthesizedSafetyIndex}${COLORS.reset}`);
  console.log(`   * Simulation Time:     ${COLORS.yellow}${summary.totalDurationMs} ms${COLORS.reset} (30 Parallel Sub-Agents)`);
  console.log(`   * Universes Passed:    ${COLORS.green}${summary.passedCount} / 30${COLORS.reset}`);
  console.log(`   * Universes Mitigated: ${COLORS.yellow}${summary.mitigatedCount} / 30${COLORS.reset} (Defensive MCP Auto-Patched)`);
  console.log(`   * Failure Vulnerability:${COLORS.red}${summary.failedCount}${COLORS.reset} detected & remediated`);
  console.log(`   * Active MCP Patches:  ${COLORS.cyan}${summary.activePatches.length} Dynamic Hot-Patches Generated${COLORS.reset}\n`);

  // Domain Breakdown Table
  console.log(`  ${COLORS.bright}${COLORS.magenta}--- DOMAIN VULNERABILITY BREAKDOWN ---${COLORS.reset}`);
  Object.entries(summary.domainBreakdown).forEach(([domain, stats]) => {
    const health = stats.failed === 0 ? `${COLORS.green}SECURE${COLORS.reset}` : `${COLORS.yellow}REMEDIATED${COLORS.reset}`;
    console.log(`   • ${domain.padEnd(42, " ")} | Status: ${health} | Risk: ${stats.maxRisk}/100`);
  });
  console.log("");

  // Print Synthesized Execution Plan Stages
  console.log(`  ${COLORS.bright}${COLORS.cyan}--- SYNTHESIZED 100% VERIFIED PRODUCTION PLAN ---${COLORS.reset}`);
  summary.remediatedPlan.stages.forEach((stage) => {
    console.log(`   ${COLORS.bright}${COLORS.yellow}[STAGE ${stage.stage}] ${stage.title}${COLORS.reset}`);
    stage.actions.forEach((act) => {
      console.log(`      ✓ ${act}`);
    });
  });
  console.log("");

  // Code Patches Sample
  if (summary.activePatches.length > 0) {
    console.log(`  ${COLORS.bright}${COLORS.green}--- SYNTHESIZED MCP HOT-PATCH SAMPLE ---${COLORS.reset}`);
    const sample = summary.activePatches.slice(0, 2);
    sample.forEach(p => {
      console.log(`   ${COLORS.cyan}// [Patch ${p.universeId}:${p.code}] ${p.name}${COLORS.reset}`);
      console.log(`   ${COLORS.dim}${p.patch}${COLORS.reset}\n`);
    });
  }

  // Simulated Production Execution
  console.log(`  ${COLORS.bgGreen} PRODUCTION DISPATCH ${COLORS.reset} ${COLORS.green}Plan ${summary.remediatedPlan.planId} executed successfully on Production (U00). Zero downtime!${COLORS.reset}\n`);
  console.log(`  ${COLORS.dim}Designed by Krushmika S M | Run NitroStudio Web Console: node nitro-server.js -> http://localhost:3000/studio${COLORS.reset}\n`);
}

main().catch((err) => {
  console.error(`${COLORS.red}Error executing MultiverseOps CLI:${COLORS.reset}`, err);
});

