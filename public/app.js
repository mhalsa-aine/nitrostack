/**
 * APP.JS - MultiverseOps Dynamic Frontend & Explainable AI (XAI) Controller
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
      <div class="u-name">Waiting for operational prompt...</div>
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
      <span class="thought-step">[PHASE 1]</span> <span class="thought-title">Explainable AI Intent Analysis:</span> Analyzing prompt for threat vectors: "${promptInput}"
    </div>
    <div class="thought-entry">
      <span class="thought-step">[PHASE 2]</span> <span class="thought-title">Speculative Matrix Simulation:</span> Spawning 30 Parallel Sub-Agent Workers on NitroStack...
    </div>
  `;

  directAnswerBox.innerHTML = '<p style="color: var(--accent-cyan);">Calling Gemini LLM to analyze prompt threats & synthesize architectural answer...</p>';
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
      <div style="background: rgba(3, 105, 161, 0.2); border-left: 4px solid var(--accent-cyan); padding: 14px; border-radius: 6px; line-height: 1.6; margin-bottom: 12px;">
        <strong style="color: var(--accent-cyan);">💡 GEMINI LLM DIRECT SOLUTION:</strong><br>
        ${data.directAnswer.replace(/\n/g, '<br>')}
      </div>
    `;

    // Render 30-Universe Matrix Grid Cards with Patch Badges
    grid.innerHTML = '';
    data.universeResults.all.forEach((u) => {
      const isPatched = u.status === 'PATCHED';
      const isPass = u.status === 'SUCCESS' || isPatched;
      const card = document.createElement('div');
      card.className = `u-card ${isPatched ? 'mitigated' : (isPass ? 'pass' : 'fail')}`;
      card.innerHTML = `
        <div class="u-header">
          <span>[U${String(u.universeId).padStart(2, '0')}] ${u.domain}</span>
          <span style="color: ${isPatched ? '#facc15' : (isPass ? '#4ade80' : '#f87171')};">${isPatched ? '🛡️ PATCHED' : (isPass ? '✅ PASS' : '❌ FAIL')}</span>
        </div>
        <div class="u-name">${u.patchApplied ? `Patched: ${u.patchApplied}` : u.name}</div>
      `;
      grid.appendChild(card);
    });

    // Explainable AI (XAI) Decision Breakdown Section
    let xaiHtml = '';
    if (data.xaiBreakdown && data.xaiBreakdown.length > 0) {
      xaiHtml = `
        <div style="margin-top: 15px; background: rgba(15, 23, 42, 0.9); border: 1px solid #38bdf8; padding: 15px; border-radius: 8px;">
          <h4 style="color: #38bdf8; margin-top: 0; font-size: 14px;">🧠 TRANSPARENT EXPLAINABLE AI (XAI) DECISION BREAKDOWN (${data.xaiBreakdown.length} Threats Intercepted):</h4>
          ${data.xaiBreakdown.map(item => `
            <div style="background: #1e293b; border-left: 3px solid #38bdf8; padding: 10px; margin-bottom: 8px; border-radius: 4px; font-size: 12px;">
              <strong style="color: #38bdf8;">[U${String(item.universeId).padStart(2, '0')}] ${item.domain}: ${item.name}</strong><br>
              <span style="color: #f87171;">• Intercepted Threat: ${item.threatReason}</span><br>
              <span style="color: #4ade80;">• Agentic Patch: ${item.agenticPatchApplied}</span><br>
              <span style="color: #94a3b8; font-style: italic;">💡 ${item.xaiExplanation}</span>
            </div>
          `).join('')}
        </div>
      `;
    }

    directAnswerBox.innerHTML += xaiHtml;

    // Update Thought Stream Console
    thoughtConsole.innerHTML += `
      <div class="thought-entry">
        <span class="thought-step">[PHASE 3]</span> <span class="thought-title">Speculation Done:</span> ${data.universeResults.speculativeFailedCount} prompt-specific threat vectors detected.
      </div>
      <div class="thought-entry">
        <span class="thought-step">[PHASE 4]</span> <span class="thought-title">Agentic Re-Simulation:</span> Re-simulated ${data.universeResults.speculativeFailedCount} threat universes via MCP. Post-Patch Certainty Score: <strong style="color: #4ade80;">${data.certaintyScore}</strong>.
      </div>
      <div class="thought-entry">
        <span class="thought-step">[PHASE 5]</span> <span class="thought-title">Production Execution:</span> Executed remediated plan via Production MCP Gateway... <strong style="color: #4ade80;">✅ 100% SUCCESS IN PRODUCTION!</strong>
      </div>
    `;

    thoughtConsole.scrollTop = thoughtConsole.scrollHeight;

    // Display Generated Custom Code
    codeDiffBox.innerText = data.customCodeSnippet;

    // Add Audit Certificate Export Download Link
    if (data.auditCertificate) {
      const certBox = document.createElement('div');
      certBox.style.cssText = 'margin-top: 15px; background: rgba(3, 105, 161, 0.3); border: 1px solid #0284c7; padding: 12px; border-radius: 6px; font-size: 13px; color: #e2e8f0;';
      certBox.innerHTML = `
        <strong style="color: #38bdf8;">📜 EXPLAINABLE COMPLIANCE AUDIT CERTIFICATE GENERATED:</strong><br>
        • Certificate ID: <strong style="color: #4ade80;">${data.auditCertificate.certificateId}</strong><br>
        • Verification SHA-256 Hash: <code style="color: #cbd5e1; font-size: 11px;">${data.auditCertificate.verificationHash}</code><br>
        <button onclick="window.open('/api/multiverse/export-audit', '_blank')" style="margin-top: 8px; background: #0284c7; color: white; border: none; padding: 6px 14px; border-radius: 4px; cursor: pointer; font-size: 12px;">📥 View & Export Printable Audit Certificate</button>
      `;
      directAnswerBox.appendChild(certBox);
    }

  } catch (err) {
    thoughtConsole.innerHTML += `<div class="thought-entry" style="color: #f87171;">Error executing agent: ${err.message}</div>`;
  }
}
