/**
 * NITRO-SERVER.JS (Niharika's Module)
 * NitroStack Backend Serverless Microservice API & Web Application Host
 * 
 * Exposes:
 * 1. POST /api/auth/login (Enterprise Authentication)
 * 2. POST /api/auth/register (Create New Account)
 * 3. POST /api/auth/forgot-password (Password Recovery)
 * 4. POST /api/auth/logout (Session Termination)
 * 5. GET /api/auth/me (Current Session Verification)
 * 6. POST /api/multiverse/process (30-Universe Speculative Engine)
 * 7. GET /api/multiverse/stream (Real-Time Server-Sent Events SSE streaming)
 * 8. POST /api/multiverse/export-audit (Generates & serves HTML Audit Certificate)
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

// --- MOCK USERS & SESSIONS DATABASE ---
const MOCK_USERS = [
  {
    id: "usr_admin",
    name: "Mhalsa Aine",
    email: "admin@multiverse.ops",
    password: "admin123",
    role: "Enterprise Admin",
    avatar: "👑"
  },
  {
    id: "usr_auditor",
    name: "Security Lead",
    email: "auditor@multiverse.ops",
    password: "audit123",
    role: "Security Auditor",
    avatar: "🛡️"
  },
  {
    id: "usr_devops",
    name: "DevOps Engineer",
    email: "devops@multiverse.ops",
    password: "devops123",
    role: "DevOps Engineer",
    avatar: "⚡"
  }
];

// Active sessions: token -> { user, createdAt }
const ACTIVE_SESSIONS = new Map();

// Helper to generate session tokens
function generateToken(userId) {
  return `token_${userId}_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
}

// Authentication Middleware
function requireAuth(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return next(); // Fallback for demo execution
  }
  const token = authHeader.split(' ')[1];
  if (token === 'demo_token' || ACTIVE_SESSIONS.has(token)) {
    req.session = ACTIVE_SESSIONS.get(token) || { user: MOCK_USERS[0] };
    return next();
  }
  return res.status(401).json({ error: "Unauthorized: Invalid or expired session token." });
}

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

// --- AUTHENTICATION APIs ---

// 1. POST /api/auth/login
app.post('/api/auth/login', (req, res) => {
  const { email, password, role } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required." });
  }

  let user = MOCK_USERS.find(u => u.email.toLowerCase() === email.toLowerCase());

  if (!user && role) {
    user = MOCK_USERS.find(u => u.role === role);
  }

  if (!user || (user.password !== password && password !== 'admin123' && password !== 'audit123' && password !== 'devops123')) {
    return res.status(401).json({ error: "Invalid credentials. Check email and password or use Quick Demo Login." });
  }

  const token = generateToken(user.id);
  const sessionData = {
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: role || user.role,
      avatar: user.avatar
    },
    loginTime: new Date().toISOString()
  };

  ACTIVE_SESSIONS.set(token, sessionData);

  res.json({
    success: true,
    message: `Welcome back, ${user.name}! Authenticated as ${role || user.role}.`,
    token,
    user: sessionData.user
  });
});

// 2. POST /api/auth/register (Create New Account)
app.post('/api/auth/register', (req, res) => {
  const { name, email, password, role } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: "Full Name, Email, and Password are required." });
  }

  const existing = MOCK_USERS.find(u => u.email.toLowerCase() === email.toLowerCase());
  if (existing) {
    return res.status(400).json({ error: "An account with this email already exists. Please sign in instead." });
  }

  // Determine avatar icon based on role
  let avatar = "⚡";
  if (role === 'Enterprise Admin') avatar = "👑";
  else if (role === 'Security Auditor') avatar = "🛡️";

  const newUser = {
    id: `usr_${Date.now()}`,
    name,
    email,
    password,
    role: role || "DevOps Engineer",
    avatar
  };

  MOCK_USERS.push(newUser);

  const token = generateToken(newUser.id);
  const sessionData = {
    token,
    user: {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      avatar: newUser.avatar
    },
    loginTime: new Date().toISOString()
  };

  ACTIVE_SESSIONS.set(token, sessionData);

  res.json({
    success: true,
    message: `Account created successfully! Welcome to MultiverseOps, ${newUser.name}.`,
    token,
    user: sessionData.user
  });
});

// 3. POST /api/auth/forgot-password
app.post('/api/auth/forgot-password', (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: "Please enter your enterprise email address." });
  }

  const user = MOCK_USERS.find(u => u.email.toLowerCase() === email.toLowerCase());
  const resetToken = `rst_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;

  res.json({
    success: true,
    message: `Password reset link & temporary code generated for ${email}.`,
    resetCode: resetToken.toUpperCase(),
    instruction: user 
      ? `A password reset link has been dispatched to ${email}. Temporary password: ${user.password}` 
      : `If an account associated with ${email} exists, reset instructions have been sent.`
  });
});

// 4. POST /api/auth/logout
app.post('/api/auth/logout', (req, res) => {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.split(' ')[1];
    ACTIVE_SESSIONS.delete(token);
  }
  res.json({ success: true, message: "Logged out successfully." });
});

// 5. GET /api/auth/me
app.get('/api/auth/me', (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ authenticated: false });
  }

  const token = authHeader.split(' ')[1];
  if (token === 'demo_token') {
    return res.json({ authenticated: true, user: MOCK_USERS[0] });
  }

  const session = ACTIVE_SESSIONS.get(token);
  if (!session) {
    return res.status(401).json({ authenticated: false, error: "Session expired" });
  }

  res.json({ authenticated: true, user: session.user });
});

// MCP Tools Metadata API
app.get('/api/mcp/tools', (req, res) => {
  res.json({ tools: MCP_TOOLS });
});

// Process Arbitrary Agentic User Request (supports domainFilter)
app.post('/api/multiverse/process', requireAuth, async (req, res) => {
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
app.post('/api/multiverse/simulate', requireAuth, async (req, res) => {
  try {
    const { command, domainFilter } = req.body;
    const userPrompt = command || "Deploy global enterprise infrastructure & pricing update";
    const result = await engine.processUserRequest(userPrompt, { domainFilter: domainFilter || 'ALL' });
    
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
