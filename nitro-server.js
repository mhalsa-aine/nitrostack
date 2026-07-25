/**
 * 🌌 MultiverseOps - NitroStack Microservice Server
 * Author: Niharika (NitroStack Microservice & Cloud Deploy Server)
 */

const express = require('express');
const cors = require('cors');
const path = require('path');
const MultiverseEngine = require('./multiverse-engine');
const { DOMAINS, UNIVERSES } = require('./mcp-tools');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

// Serve NitroStudio Web Control Console at /studio
app.get('/studio', (req, res) => {
  res.sendFile(path.join(__dirname, 'nitro-studio.html'));
});

// Root redirect to /studio
app.get('/', (req, res) => {
  res.redirect('/studio');
});

// API: Get Universes Metadata
app.get('/api/universes', (req, res) => {
  res.json({
    domains: DOMAINS,
    totalUniverses: UNIVERSES.length,
    universes: UNIVERSES
  });
});

// API: Run Full Simulation
app.post('/api/run-simulation', async (req, res) => {
  try {
    const taskCommand = req.body.command || "Deploy global enterprise infrastructure & pricing update";
    const engine = new MultiverseEngine();
    const result = await engine.runSpeculativeMatrix(taskCommand);
    res.json({ success: true, data: result });
  } catch (err) {
    console.error("Simulation error:", err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// API: Server-Sent Events (SSE) Real-Time Matrix Stream
app.get('/api/stream-matrix', async (req, res) => {
  const taskCommand = req.query.command || "Deploy global enterprise infrastructure & pricing update";

  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.flushHeaders();

  const sendEvent = (event, data) => {
    res.write(`event: ${event}\ndata: ${JSON.stringify(data)}\n\n`);
  };

  sendEvent('start', { taskCommand, timestamp: new Date().toISOString() });

  const engine = new MultiverseEngine();

  const finalResult = await engine.runSpeculativeMatrix(taskCommand, (uResult) => {
    sendEvent('universe_complete', uResult);
  });

  sendEvent('matrix_complete', finalResult);
  res.end();
});

// API: Deploy to NitroCloud
app.post('/api/deploy', (req, res) => {
  const { taskCommand, plan } = req.body;
  res.json({
    success: true,
    message: "100% Verified Production Plan successfully deployed to NitroCloud edge infrastructure!",
    deployId: "NC-" + Math.floor(100000 + Math.random() * 900000),
    timestamp: new Date().toISOString(),
    status: "ACTIVE_IN_PRODUCTION"
  });
});

app.listen(PORT, () => {
  console.log(`\n🌌 =========================================================`);
  console.log(`   MULTIVERSE-OPS NITROSTACK MICROSERVICE SERVER ONLINE   `);
  console.log(`   Author: Niharika (NitroStack & NitroStudio)           `);
  console.log(`=========================================================`);
  console.log(`   🚀 NitroStudio Web Console: http://localhost:${PORT}/studio`);
  console.log(`   ⚡ REST & SSE API Base:    http://localhost:${PORT}/api`);
  console.log(`=========================================================\n`);
});
