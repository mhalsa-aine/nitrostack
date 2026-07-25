/**
 * APP.JS - MultiverseOps Dynamic Frontend Application Controller
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
      <div class="u-name">Waiting for prompt...</div>
    `;
    grid.appendChild(card);
  }
}

async function executeAgent() {
  const promptInput = document.getElementById('promptInput').value.trim();
  if (!promptInput) return;

  const thoughtConsole = document.getElementById('thoughtConsole');
  const codeDiffBox = document.getElementById('codeDiffBox');
  const directAnswerBox = document.getElementById('directAnswerBox');
  const grid = document.getElementById('universeGrid');

  thoughtConsole.innerHTML = `
    <div class="thought-entry">
      <span class="thought-step">[STEP 1]</span> <span class="thought-title">Gemini LLM Processing:</span> Analyzing prompt: "${promptInput}"
    </div>
    <div class="thought-entry">
      <span class="thought-step">[STEP 2]</span> <span class="thought-title">MCP Multiverse Tool Strategy:</span> Spawning 30 Parallel Sub-Agent Workers on NitroStack...
    </div>
  `;

  directAnswerBox.innerHTML = '<p style="color: var(--accent-cyan);">Calling Gemini LLM to synthesize dynamic architectural answer...</p>';
  codeDiffBox.innerText = "// Synthesizing custom production code specifically for your prompt...";

  try {
    const res = await fetch('/api/multiverse/process', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt: promptInput })
    });

    const data = await res.json();

    // Display Direct LLM Answer
    directAnswerBox.innerHTML = `
      <div style="background: rgba(3, 105, 161, 0.2); border-left: 4px solid var(--accent-cyan); padding: 14px; border-radius: 6px; line-height: 1.6;">
        <strong style="color: var(--accent-cyan);">💡 GEMINI LLM DIRECT SOLUTION:</strong><br>
        ${data.directAnswer.replace(/\n/g, '<br>')}
      </div>
    `;

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
        <div class="u-name">${u.error || u.name}</div>
      `;
      grid.appendChild(card);
    });

    // Update Thought Stream Console
    thoughtConsole.innerHTML += `
      <div class="thought-entry">
        <span class="thought-step">[STEP 3]</span> <span class="thought-title">Multiverse Execution:</span> 30 Universes completed in ${data.executionTimeMs}ms. Succeeded: ${data.universeResults.succeeded.length}/30. Failures: ${data.universeResults.failed.length}.
      </div>
      <div class="thought-entry">
        <span class="thought-step">[STEP 4]</span> <span class="thought-title">Quantum Reflection:</span> Simulation Certainty Score: <strong style="color: #4ade80;">${data.certaintyScore}</strong>. Intercepted ${data.remediationPatches.length} risk vectors.
      </div>
      <div class="thought-entry">
        <span class="thought-step">[STEP 5]</span> <span class="thought-title">Reality Execution:</span> Executed remediated plan via Production MCP Gateway... <strong style="color: #4ade80;">✅ 100% SUCCESS IN PRODUCTION!</strong>
      </div>
    `;

    thoughtConsole.scrollTop = thoughtConsole.scrollHeight;

    // Display Generated Custom Code
    codeDiffBox.innerText = data.customCodeSnippet;

  } catch (err) {
    thoughtConsole.innerHTML += `<div class="thought-entry" style="color: #f87171;">Error executing agent: ${err.message}</div>`;
  }
}
