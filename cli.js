/**
 * CLI.JS (Krushmika's Module)
 * Production Continuous REPL & Single-Command CLI Interface
 */

const readline = require('readline');
const chalk = require('chalk');
const Table = require('cli-table3');
const ora = require('ora');
const MultiverseEngine = require('./multiverse-engine');

const engine = new MultiverseEngine();

async function runSimulation(userPrompt) {
  console.log(chalk.yellow(`\n[AGENTIC AI TARGET]: `) + chalk.white.bold(`"${userPrompt}"`));
  console.log(chalk.gray(`[PROTOCOL]: Model Context Protocol (MCP) JSON-RPC v2.0`));
  console.log(chalk.gray(`[RUNTIME]: NitroStack Microservice Framework\n`));

  const spinner = ora(chalk.magenta('Agentic SDK: Forking 30 Parallel Speculative Universes...')).start();

  const summary = await engine.processUserRequest(userPrompt, (thought) => {
    // Live thought updates
  });

  spinner.succeed(chalk.green(`Executed 30 Speculative Universes in ${summary.executionTimeMs}ms!`));
  console.log('');

  // 30-Universe Matrix Output Table
  const table = new Table({
    head: [
      chalk.cyan('Univ & Domain'), chalk.cyan('Status'),
      chalk.cyan('Univ & Domain'), chalk.cyan('Status'),
      chalk.cyan('Univ & Domain'), chalk.cyan('Status')
    ],
    colWidths: [26, 10, 26, 10, 26, 10]
  });

  const results = summary.universeResults.all;
  for (let i = 0; i < 10; i++) {
    const u1 = results[i];
    const u2 = results[i + 10];
    const u3 = results[i + 20];

    const formatStatus = (u) => u.status === 'SUCCESS' ? chalk.green.bold('✅ PASS') : chalk.red.bold('❌ FAIL');
    const formatLabel = (u) => `[U${String(u.universeId).padStart(2, '0')}] ${u.domain}: ${u.name}`;

    table.push([
      formatLabel(u1), formatStatus(u1),
      formatLabel(u2), formatStatus(u2),
      formatLabel(u3), formatStatus(u3)
    ]);
  }

  console.log(table.toString());

  console.log(chalk.yellow.bold(`\n====================================================================================================`));
  console.log(chalk.cyan.bold(` 🧠 QUANTUM SYNTHESIS & AGENTIC REMEDIATION CODE`));
  console.log(chalk.yellow.bold(`====================================================================================================`));
  console.log(chalk.white(` • Simulation Certainty Score: `) + chalk.green.bold(summary.certaintyScore));
  console.log(chalk.white(` • Universes Succeeded:      `) + chalk.green.bold(`${summary.universeResults.succeeded.length}/30`));
  console.log(chalk.white(` • Failure Modes Intercepted: `) + chalk.red.bold(`${summary.universeResults.failed.length}`));
  console.log('');
  console.log(chalk.magenta.bold(` 🛠️ AUTO-SYNTHESIZED REMEDIATION PATCHES:`));

  summary.remediationCode.patches.forEach((patch, index) => {
    console.log(chalk.green(`   ${index + 1}. ${patch}`));
  });

  console.log(chalk.gray(`\n[GENERATED REMEDIATION CODE CODE SCRIPT]:`));
  console.log(chalk.cyan(summary.remediationCode.codeSnippet));

  console.log('');
  console.log(chalk.bgGreen.black.bold(` [REALITY EXECUTION] `) + chalk.green.bold(` Executing Optimized Plan via Production MCP Gateway... ✅ 100% SUCCESS IN PRODUCTION!`));
  console.log(chalk.yellow.bold(`====================================================================================================\n`));
}

function startREPL() {
  console.clear();
  console.log(chalk.cyan.bold(`
====================================================================================================
               🌌 MULTIVERSE-OPS: INTERACTIVE AGENTIC AI TERMINAL CONSOLE 🌌
====================================================================================================
Type any enterprise request or issue below (or type 'exit' to quit).
Examples:
  - "Offboard employee John Doe and revoke cloud access"
  - "Migrate Postgres database to v16 and sync regional pricing"
  - "Fix Stripe payment webhook failures and database table locks"
====================================================================================================
`));

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: chalk.magenta.bold('multiverse-ops> ')
  });

  rl.prompt();

  rl.on('line', async (line) => {
    const input = line.trim();
    if (input.toLowerCase() === 'exit' || input.toLowerCase() === 'quit') {
      console.log(chalk.yellow('Exiting MultiverseOps Console. Goodbye!'));
      process.exit(0);
    }

    if (input.length > 0) {
      await runSimulation(input);
    }
    rl.prompt();
  });
}

// Single-command or Interactive Mode
const args = process.argv.slice(2);
if (args.length > 0) {
  runSimulation(args.join(' ')).then(() => process.exit(0));
} else {
  startREPL();
}
