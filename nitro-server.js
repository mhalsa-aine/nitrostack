/**
 * NITRO-SERVER.JS (Niharika's Module)
 * NitroStack Backend Serverless Microservice & NitroCloud Hosting Gateway
 */

const express = require('express');
const path = require('path');
const MultiverseEngine = require('./multiverse-engine');
const { MCP_TOOLS } = require('./mcp-tools');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(__dirname));

const engine = new MultiverseEngine();

// NitroStack API Route: Health Check
app.get('/api/health', (req, res) => {
  res.json({
    status: "ONLINE",
    service: "MultiverseOps NitroStack Backend",
    protocol: "Model Context Protocol (MCP) JSON-RPC v2.0",
    activeUniverses: 30,
    timestamp: new Date().toISOString()
  });
});

// NitroStack API Route: MCP Tools Metadata
app.get('/api/mcp/tools', (req, res) => {
  res.json({
    tools: MCP_TOOLS
  });
});

// NitroStack API Route: Run 30-Universe Simulation
app.post('/api/multiverse/simulate', async (req, res) => {
  try {
    const { command } = req.body;
    const prompt = command || "Deploy global enterprise infrastructure update";
    const result = await engine.runSpeculativeMatrix(prompt);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Serve NitroStudio Web Visual Dashboard
app.get('/studio', (req, res) => {
  res.sendFile(path.join(__dirname, 'nitro-studio.html'));
});

app.listen(PORT, () => {
  console.log(`\n🚀 NitroStack Microservice Running on http://localhost:${PORT}`);
  console.log(`📊 NitroStudio Visual Dashboard available at http://localhost:${PORT}/studio\n`);
});
