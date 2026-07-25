/**
 * NITRO-SERVER.JS (Niharika's Module)
 * NitroStack Backend Serverless Microservice API & Web Application Host
 * 
 * Exposes:
 * 1. POST /api/multiverse/process (supports domainFilter)
 * 2. GET /api/multiverse/stream (Real-Time Server-Sent Events SSE streaming)
 * 3. POST /api/multiverse/export-audit (Generates & serves HTML Audit Certificate)
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

// Process Arbitrary Agentic User Request (supports domainFilter)
app.post('/api/multiverse/process', async (req, res) => {
  try {
    const { prompt, domainFilter } = req.body;
    const userPrompt = prompt || "Deploy global enterprise infrastructure & pricing update";
    const result = await engine.processUserRequest(userPrompt, { domainFilter: domainFilter || 'ALL' });
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Backward compatibility route for studio
app.post('/api/multiverse/simulate', async (req, res) => {
  try {
    const { command, domainFilter } = req.body;
    const userPrompt = command || "Deploy global enterprise infrastructure & pricing update";
    const result = await engine.processUserRequest(userPrompt, { domainFilter: domainFilter || 'ALL' });
    
    // Map to studio format
    res.json({
      results: result.universeResults.all.map(u => ({
        id: u.universeId,
        domain: u.domain,
        name: u.name,
        status: u.status
      })),
      successCount: result.universeResults.succeeded.length,
      failureCount: result.universeResults.failed.length,
      synthesis: {
        certaintyScore: result.certaintyScore,
        patches: result.remediationPatches
      },
      auditCertificate: result.auditCertificate
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Real-Time Server-Sent Events (SSE) Streaming Endpoint
app.get('/api/multiverse/stream', async (req, res) => {
  const userPrompt = req.query.prompt || "Deploy global enterprise infrastructure & pricing update";
  const domainFilter = req.query.domainFilter || "ALL";

  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  const sendEvent = (event, data) => {
    res.write(`event: ${event}\ndata: ${JSON.stringify(data)}\n\n`);
  };

  try {
    sendEvent('start', { prompt: userPrompt, domainFilter });

    const result = await engine.processUserRequest(userPrompt, {
      domainFilter,
      onThoughtUpdate: (thought) => {
        sendEvent('thought', thought);
      },
      onUniverseProgress: (universeResult) => {
        sendEvent('universe', universeResult);
      }
    });

    sendEvent('complete', result);
    res.end();
  } catch (err) {
    sendEvent('error', { message: err.message });
    res.end();
  }
});

// Export Enterprise Audit Certificate API (Serves HTML Certificate)
app.post('/api/multiverse/export-audit', async (req, res) => {
  try {
    const { prompt, domainFilter } = req.body;
    const userPrompt = prompt || "Deploy global enterprise infrastructure & pricing update";
    const result = await engine.processUserRequest(userPrompt, { domainFilter: domainFilter || 'ALL' });
    
    res.setHeader('Content-Type', 'text/html');
    res.send(result.auditCertificate.auditReportHtml);
  } catch (error) {
    res.status(500).send(`<h2>Audit Export Failed: ${error.message}</h2>`);
  }
});

// Fallback Route for Web Interface
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
