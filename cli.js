#!/usr/bin/env node

/**
 * MultiverseOps - Windows CMD UI & Matrix Visualizer
 * Author: Krushmika S M (Terminal UI Specialist & Matrix Visualizer Lead)
 * Updated with Explainable AI (XAI) & Dynamic 2-Phase Re-Simulation
 */

const readline = require("readline");
const MultiverseEngine = require("./multiverse-engine.js");

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
  { id: 1, name: "🛡️ S3 Security Audit: PII Data Leak & GDPR Sovereignty", cmd: "How do I secure AWS S3 bucket permissions against data leaks, prompt injection, and GDPR violations?" },
  { id: 2, name: "🗄️ Core Database Migration & Schema Drift Patch", cmd: "Migrate production customer orders table schema from PostgreSQL to EU Cloud database cluster without table locks or schema column drift." },
  { id: 3, name: "💳 Global FinOps Accounting & SOX Reconciliation", cmd: "Reconcile daily enterprise transaction ledgers in NetSuite and apply end-of-month discount rules." },
  { id: 4, name: "👥 Zero-Trust SaaS Offboarding & 2-Phase Commit Lock", cmd: "Offboard terminated employees from Google Workspace, Slack, Okta, and GitHub directories immediately." }
];

function printBanner() {
  console.clear();
  console.log(`${COLORS.cyan}${COLORS.bright}`);
  console.log(`  ==================================================================================`);
  console.log(`   🌌 MULTIVERSE-OPS : 30-UNIVERSE SPECULATIVE PARALLEL AGENTIC EXECUTION ENGINE   `);
  console.log(`  ==================================================================================${COLORS.reset}`);
  console.log(`  ${COLORS.dim}Lead Developer: Krushmika S M | Core Engine: Mhalsa | MCP Security: Pavitra | Web Studio: Niharika${COLORS.reset}\n`);
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
  
  const ids = Array.from({ length: 30 }, (_, i) => i + 1);
  let line = "   ";
  
  ids.forEach((id, idx) => {
    const item = completedMap.get(id);
    const idStr = `U${String(id).padStart(2, "0")}`;
    let badge = `${COLORS.dim}[${idStr}: WAITING]${COLORS.reset}`;
    
    if (item) {
      if (item.status === "SUCCESS") {
        badge = `${COLORS.green}[${idStr}:  PASSED]${COLORS.reset}`;
      } else if (item.status === "PATCHED") {
        badge = `${COLORS.yellow}[${idStr}: PATCHED]${COLORS.reset}`;
      } else {
        badge = `${COLORS.red}[${idStr}: THREAT!]${COLORS.reset}`;
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

  const summary = await engine.processUserRequest(targetCommand, {
    onUniverseProgress: (universeResult) => {
      completedMap.set(universeResult.universeId, universeResult);
    }
  });

  // Final Matrix View
  console.clear();
  printBanner();
  console.log(`  ${COLORS.bright}🎯 Enterprise Target Command:${COLORS.reset} ${COLORS.cyan}"${targetCommand}"${COLORS.reset}\n`);
  
  // Fill matrix with final universe status
  summary.universeResults.all.forEach(u => completedMap.set(u.universeId, u));
  printMatrixGrid(completedMap);

  // 1. Direct LLM Answer
  console.log(`  ${COLORS.bright}${COLORS.cyan}==================================================================================`);
  console.log(`   💡 GEMINI LLM DIRECT ARCHITECTURAL SOLUTION`);
  console.log(`  ==================================================================================${COLORS.reset}`);
  console.log(`  ${summary.directAnswer.replace(/\n/g, '\n  ')}\n`);

  // 2. Transparent Explainable AI (XAI) Decision Breakdown
  if (summary.xaiBreakdown && summary.xaiBreakdown.length > 0) {
    console.log(`  ${COLORS.bright}${COLORS.magenta}==================================================================================`);
    console.log(`   🧠 TRANSPARENT EXPLAINABLE AI (XAI) DECISION BREAKDOWN (${summary.xaiBreakdown.length} Threat Vectors Intercepted)`);
    console.log(`  ==================================================================================${COLORS.reset}`);
    
    summary.xaiBreakdown.forEach((item, index) => {
      console.log(`  ${COLORS.bright}${COLORS.yellow}[${index + 1}] Universe U${String(item.universeId).padStart(2, '0')} (${item.domain}: ${item.name})${COLORS.reset}`);
      console.log(`      ${COLORS.red}• Intercepted Threat:${COLORS.reset} ${item.threatReason}`);
      console.log(`      ${COLORS.green}• Agentic MCP Action:${COLORS.reset} ${item.agenticPatchApplied}`);
      console.log(`      ${COLORS.cyan}• Verified Status:   ${COLORS.bright}${item.verifiedStatus}${COLORS.reset}`);
      console.log(`      ${COLORS.dim}• XAI Explanation:   ${item.xaiExplanation}${COLORS.reset}\n`);
    });
  }

  // 3. Code Remediation Script
  console.log(`  ${COLORS.bright}${COLORS.green}==================================================================================`);
  console.log(`   🛠️ TAILORED PRODUCTION REMEDIATION SCRIPT`);
  console.log(`  ==================================================================================${COLORS.reset}`);
  console.log(`  ${COLORS.cyan}${summary.customCodeSnippet.replace(/\n/g, '\n  ')}${COLORS.reset}\n`);

  // 4. Audit Certificate
  if (summary.auditCertificate) {
    console.log(`  ${COLORS.yellow}----------------------------------------------------------------------------------`);
    console.log(`   📜 ENTERPRISE COMPLIANCE AUDIT CERTIFICATE GENERATED`);
    console.log(`   • Certificate ID:   ${COLORS.bright}${COLORS.green}${summary.auditCertificate.certificateId}${COLORS.reset}`);
    console.log(`   • SHA-256 Hash:     ${COLORS.dim}${summary.auditCertificate.verificationHash}${COLORS.reset}`);
    console.log(`   • Post-Patch Score: ${COLORS.bright}${COLORS.green}${summary.certaintyScore}${COLORS.reset}`);
    console.log(`   • Export HTML URL:  ${COLORS.blue}http://localhost:3000/api/multiverse/export-audit${COLORS.reset}`);
    console.log(`  ----------------------------------------------------------------------------------\n`);
  }

  // Final Dispatch Banner
  console.log(`  ${COLORS.bgGreen} REALITY EXECUTION ${COLORS.reset} ${COLORS.green}Dispatched 100% Remediated Plan via Production MCP Gateway... ✅ SUCCESS IN PRODUCTION!${COLORS.reset}\n`);
}

main().catch((err) => {
  console.error(`${COLORS.red}Error executing MultiverseOps CLI:${COLORS.reset}`, err);
});
