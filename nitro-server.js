/**
 * NITRO-SERVER.JS (Niharika's Module)
 * NitroStack Backend Serverless Microservice API & Web Application Host
 */

const express = require('express');
const path = require('path');
const MultiverseEngine = require('./multiverse-engine');
const { MCP_TOOLS } = require('./mcp-server');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const engine = new MultiverseEngine();

// Health Check API
app.get('/api/health', (req, res) => {
  res.json({
    status: "ONLINE",
    service: "MultiverseOps NitroStack Backend",
    protocol: "Model Context Protocol (MCP) JSON-RPC v2.0",
    activeUniverses: 30,
    timestamp: new Date().toISOString()
  });
});

// MCP Tools Metadata API
app.get('/api/mcp/tools', (req, res) => {
  res.json({ tools: MCP_TOOLS });
});

// Process Arbitrary Agentic User Request
app.post('/api/multiverse/process', async (req, res) => {
  try {
    const { prompt } = req.body;
    const userPrompt = prompt || "Deploy global enterprise infrastructure & pricing update";
    const result = await engine.processUserRequest(userPrompt);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Fallback Route for Web Interface
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`\n🚀 NitroStack Serverless Microservice Running on http://localhost:${PORT}`);
  console.log(`💻 Modern Web Application UI available at http://localhost:${PORT}\n`);
});
