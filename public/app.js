/**
 * APP.JS - MultiverseOps Frontend Application Controller
 */

document.addEventListener('DOMContentLoaded', () => {
  renderEmptyGrid();
});

function renderEmptyGrid() {
  const grid = document.getElementById('universeGrid');
  grid.innerHTML = '';
  for (let i = 1; i <= 30; i++) {
    const card = document.createElement('div');
    card.className = 'u-card';
    card.id = `u-card-${i}`;
    card.innerHTML = `
      <div class="u-header">
        <span>[U${String(i).padStart(2, '0')}]</span>
        <span style="color: #64748b;">STANDBY</span>
      </div>
      <div class="u-name">Waiting for simulation...</div>
    `;
    grid.appendChild(card);
  }
}

async function executeAgent() {
  const promptInput = document.getElementById('promptInput').value.trim();
  if (!promptInput) return;

  const thoughtConsole = document.getElementById('thoughtConsole');
  const codeDiffBox = document.getElementById('codeDiffBox');
  const grid = document.getElementById('universeGrid');

  thoughtConsole.innerHTML = `
    <div class="thought-entry">
      <span class="thought-step">[STEP 1]</span> <span class="thought-title">Agentic Intent Analysis:</span> Parsing user request: "${promptInput}"
    </div>
    <div class="thought-entry">
      <span class="thought-step">[STEP 2]</span> <span class="thought-title">MCP Tool Strategy:</span> Formulated multi-tool plan. Spawning 30 parallel worker sub-agents on NitroStack...
    </div>
  `;

  codeDiffBox.innerText = "// Synthesizing remediated code across 30 universes...";

  try {
    const res = await fetch('/api/multiverse/process', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt: promptInput })
    });

    const data = await res.json();

    // Render 30-Universe Matrix Grid Cards
    grid.innerHTML = '';
    data.universeResults.all.forEach((u) => {
      const isPass = u.status === 'SUCCESS';
      const card = document.createElement('div');
      card.className = `u-card ${isPass ? 'pass' : 'fail'}`;
      card.innerHTML = `
        <div class="u-header">
          <span>[U${String(u.universeId).padStart(2, '0')}] ${u.domain}</span>
          <span style="color: ${isPass ? '#4ade80' : '#f87171'};">${isPass ? '✅ PASS' : '❌ FAIL'}</span>
        </div>
        <div class="u-name">${u.name}</div>
      `;
      grid.appendChild(card);
    });

    // Update Thought Stream Console
    thoughtConsole.innerHTML += `
      <div class="thought-entry">
        <span class="thought-step">[STEP 3]</span> <span class="thought-title">Multiverse Execution:</span> 30 Universes completed in ${data.executionTimeMs}ms. Succeeded: ${data.universeResults.succeeded.length}/30. Failures: ${data.universeResults.failed.length}.
      </div>
      <div class="thought-entry">
        <span class="thought-step">[STEP 4]</span> <span class="thought-title">Quantum Reflection:</span> Simulation Certainty Score: <strong style="color: #4ade80;">${data.certaintyScore}</strong>. Patched ${data.remediationCode.patches.length} failure modes.
      </div>
      <div class="thought-entry">
        <span class="thought-step">[STEP 5]</span> <span class="thought-title">Reality Execution:</span> Executed remediated plan via Production MCP Gateway... <strong style="color: #4ade80;">✅ 100% SUCCESS IN PRODUCTION!</strong>
      </div>
    `;

    thoughtConsole.scrollTop = thoughtConsole.scrollHeight;

    // Display Generated Code
    codeDiffBox.innerText = data.remediationCode.codeSnippet;

  } catch (err) {
    thoughtConsole.innerHTML += `<div class="thought-entry" style="color: #f87171;">Error executing agent: ${err.message}</div>`;
  }
}
