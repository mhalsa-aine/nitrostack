/**
 * MultiverseOps - MCP Tools & 30-Universe Scenario Engine
 * Author: Pavitra (MCP Protocol Schemas & 30 Scenario Payloads)
 */

export const DOMAINS = {
  DOMAIN_1: "Infrastructure & Traffic Resiliency",
  DOMAIN_2: "Cybersecurity & Zero-Trust Threat Vectors",
  DOMAIN_3: "Data Mesh, Schema Drift & RAG Integrity",
  DOMAIN_4: "Network Reliability & Distributed Cloud",
  DOMAIN_5: "Regulatory Compliance & Legal Governance",
  DOMAIN_6: "Workplace SaaS & Financial FinOps"
};

export const UNIVERSES = [
  // Domain 1: Infrastructure & Traffic Resiliency (U01 – U05)
  {
    id: "U01",
    code: "LOAD_10X_SPIKE",
    domain: DOMAINS.DOMAIN_1,
    name: "10x Traffic Spike Stress",
    stressCondition: "High concurrency burst causing request queuing (10,000 req/sec)",
    defaultRisk: "HIGH",
    mitigation: "Dynamic connection pooling & auto-scaled worker queue",
    mcpTool: "mcp://infra/connection_pool_optimizer",
    patchSnippet: "const pool = createDynamicPool({ min: 10, max: 250, idleTimeoutMillis: 30000 });"
  },
  {
    id: "U02",
    code: "LOAD_50X_FLASH",
    domain: DOMAINS.DOMAIN_1,
    name: "50x Flash Crowd Burst",
    stressCondition: "Massive unexpected surge overwhelming primary origin server",
    defaultRisk: "CRITICAL",
    mitigation: "Reroute ingress traffic to NitroCloud Edge CDN nodes",
    mcpTool: "mcp://infra/nitrocloud_edge_router",
    patchSnippet: "await NitroEdge.enableFlashGuard({ originFailover: true, edgeCacheTTL: 60 });"
  },
  {
    id: "U03",
    code: "MEMORY_LEAK",
    domain: DOMAINS.DOMAIN_1,
    name: "Node OOM Garbage Collection Leak",
    stressCondition: "V8 heap exhausted during batch stream transformation",
    defaultRisk: "HIGH",
    mitigation: "Inject manual GC triggers & enforce 512MB container RAM cap",
    mcpTool: "mcp://infra/v8_memory_guard",
    patchSnippet: "if (process.memoryUsage().heapUsed > 0.85 * MAX_RAM) global.gc();"
  },
  {
    id: "U04",
    code: "CONN_EXHAUST",
    domain: DOMAINS.DOMAIN_1,
    name: "DB Connection Pool Starvation",
    stressCondition: "Connections locked by long-running synchronous transactions",
    defaultRisk: "HIGH",
    mitigation: "Wrap DB execution inside Async NitroQueue manager",
    mcpTool: "mcp://infra/nitro_queue_manager",
    patchSnippet: "await NitroQueue.enqueueWithTimeout(dbTask, { timeoutMs: 2500 });"
  },
  {
    id: "U05",
    code: "COLD_START",
    domain: DOMAINS.DOMAIN_1,
    name: "Serverless 4s Cold Start Spike",
    stressCondition: "Microservice cold-start causing downstream gateway timeouts",
    defaultRisk: "MEDIUM",
    mitigation: "Pre-warm worker nodes via speculative execution ping",
    mcpTool: "mcp://infra/serverless_prewarmer",
    patchSnippet: "await NitroCloud.prewarmPool({ instances: 5, keepAliveMs: 300000 });"
  },

  // Domain 2: Cybersecurity & Zero-Trust Threat Vectors (U06 – U10)
  {
    id: "U06",
    code: "PROMPT_INJECT",
    domain: DOMAINS.DOMAIN_2,
    name: "Indirect Prompt Injection Attack",
    stressCondition: "Untrusted payload contains hidden instructions: 'Ignore previous rules'",
    defaultRisk: "CRITICAL",
    mitigation: "Sanitize untrusted input via MCP Prompt Firewall",
    mcpTool: "mcp://security/prompt_firewall",
    patchSnippet: "const cleanInput = MCPFirewall.sanitizeText(rawPayload, { strict: true });"
  },
  {
    id: "U07",
    code: "SQL_INJECTION",
    domain: DOMAINS.DOMAIN_2,
    name: "SQL Parameter Injection Attack",
    stressCondition: "Query string contains raw concatenation: OR '1'='1'",
    defaultRisk: "CRITICAL",
    mitigation: "Convert all dynamic query fragments into parameterized SQL statements",
    mcpTool: "mcp://security/sql_parameterizer",
    patchSnippet: "const stmt = db.prepare('SELECT * FROM users WHERE org_id = $1');"
  },
  {
    id: "U08",
    code: "PRIV_ESCALATION",
    domain: DOMAINS.DOMAIN_2,
    name: "Unauthorized Admin Escalation",
    stressCondition: "Execution context attempts root privileges without MFA authorization",
    defaultRisk: "CRITICAL",
    mitigation: "Trigger terminal Human-in-the-Loop approval gate",
    mcpTool: "mcp://security/terminal_approval_gate",
    patchSnippet: "await HumanGate.verifyApprovalToken({ requiredRole: 'SYS_ADMIN' });"
  },
  {
    id: "U09",
    code: "EXPIRED_TOKEN",
    domain: DOMAINS.DOMAIN_2,
    name: "Stale OAuth API Token",
    stressCondition: "Upstream SaaS API call fails with 401 Unauthorized",
    defaultRisk: "MEDIUM",
    mitigation: "Auto-refresh OAuth tokens via Secret Manager before invocation",
    mcpTool: "mcp://security/secret_vault_refresher",
    patchSnippet: "const freshToken = await Vault.getRefreshedToken('SAAS_PROV_ID');"
  },
  {
    id: "U10",
    code: "DATA_EXFIL",
    domain: DOMAINS.DOMAIN_2,
    name: "Unencrypted PII Data Transmission",
    stressCondition: "Payload exposes raw SSN / Credit Card data over plaintext connection",
    defaultRisk: "CRITICAL",
    mitigation: "Enforce TLS 1.3 & run automated PII scrubbing filter",
    mcpTool: "mcp://security/pii_anonymizer",
    patchSnippet: "const redacted = PIIScrubber.maskSensitiveData(payload, { maskChar: '*' });"
  },

  // Domain 3: Data Mesh, Schema Drift & RAG Integrity (U11 – U15)
  {
    id: "U11",
    code: "NULL_VALUES",
    domain: DOMAINS.DOMAIN_3,
    name: "Missing Record Attributes (Null Pointer)",
    stressCondition: "JSON response lacks required field 'user.billing.tier'",
    defaultRisk: "MEDIUM",
    mitigation: "Inject defensive fallback defaults into data parser",
    mcpTool: "mcp://datamesh/schema_fallback",
    patchSnippet: "const tier = payload?.user?.billing?.tier ?? 'STANDARD_DEFAULT';"
  },
  {
    id: "U12",
    code: "MISSING_FK",
    domain: DOMAINS.DOMAIN_3,
    name: "Foreign Key Relational Violation",
    stressCondition: "Attempting insert into child table before parent ID exists",
    defaultRisk: "HIGH",
    mitigation: "Auto-create parent entity stubs within single database transaction",
    mcpTool: "mcp://datamesh/fk_stub_creator",
    patchSnippet: "await db.transaction(tx => tx.ensureParentEntity(entityId));"
  },
  {
    id: "U13",
    code: "CORRUPT_JSON",
    domain: DOMAINS.DOMAIN_3,
    name: "Malformed JSON Syntax",
    stressCondition: "Upstream API returns trailing comma or unescaped quotes",
    defaultRisk: "HIGH",
    mitigation: "Auto-repair structural JSON parser using lenient AST parser",
    mcpTool: "mcp://datamesh/json_repair_engine",
    patchSnippet: "const parsedData = JSONRepair.parseLenient(rawCorruptJson);"
  },
  {
    id: "U14",
    code: "SCHEMA_DRIFT",
    domain: DOMAINS.DOMAIN_3,
    name: "Database Column Drift",
    stressCondition: "Production table missing column 'region_code'",
    defaultRisk: "HIGH",
    mitigation: "Inject dynamic SQL column alias & trigger schema auto-migration",
    mcpTool: "mcp://datamesh/schema_migration_guard",
    patchSnippet: "ALTER TABLE infra_config ADD COLUMN IF NOT EXISTS region_code VARCHAR(16);"
  },
  {
    id: "U15",
    code: "STALE_RAG",
    domain: DOMAINS.DOMAIN_3,
    name: "Hallucinated Vector Embedding (Stale RAG)",
    stressCondition: "RAG lookup returns outdated policy document from 2022",
    defaultRisk: "MEDIUM",
    mitigation: "Execute live vector database re-indexing with timestamp filter",
    mcpTool: "mcp://datamesh/vector_reindexer",
    patchSnippet: "await VectorDB.reindexNamespace('policies', { minVersion: '2026-v1' });"
  },

  // Domain 4: Network Reliability & Distributed Cloud (U16 – U20)
  {
    id: "U16",
    code: "REGION_TIMEOUT",
    domain: DOMAINS.DOMAIN_4,
    name: "5s Regional Network Delay",
    stressCondition: "Inter-datacenter RPC latency spikes to 5.2s",
    defaultRisk: "HIGH",
    mitigation: "Tight 1500ms timeout with exponential jitter backoff",
    mcpTool: "mcp://network/adaptive_timeout",
    patchSnippet: "await fetchWithTimeout(url, { timeout: 1500, retries: 3, backoffRatio: 1.5 });"
  },
  {
    id: "U17",
    code: "DNS_FAILURE",
    domain: DOMAINS.DOMAIN_4,
    name: "DNS Resolution Failure",
    stressCondition: "Core domain name resolution returns SERVFAIL",
    defaultRisk: "CRITICAL",
    mitigation: "Swap domain to static fallback IP mesh pool",
    mcpTool: "mcp://network/dns_failover",
    patchSnippet: "const endpoint = await DNSGuard.resolveWithFallback('api.internal.net');"
  },
  {
    id: "U18",
    code: "RATE_LIMIT_429",
    domain: DOMAINS.DOMAIN_4,
    name: "HTTP 429 Rate Throttling",
    stressCondition: "Target Cloud API rejects requests with retry-after header",
    defaultRisk: "MEDIUM",
    mitigation: "Route requests through Outgoing API quota queue manager",
    mcpTool: "mcp://network/quota_queue_manager",
    patchSnippet: "await RateLimiter.executeThrottled('STRIPE_API', fn, { tokenBucket: 100 });"
  },
  {
    id: "U19",
    code: "EXPIRED_SSL",
    domain: DOMAINS.DOMAIN_4,
    name: "Expired TLS / SSL Certificate",
    stressCondition: "Handshake fails due to expired domain cert",
    defaultRisk: "CRITICAL",
    mitigation: "Route request via secure internal mTLS mesh proxy",
    mcpTool: "mcp://network/mtls_mesh_proxy",
    patchSnippet: "const agent = new mTLSAgent({ certVault: NitroVault.getMeshCert() });"
  },
  {
    id: "U20",
    code: "DB_TABLE_LOCK",
    domain: DOMAINS.DOMAIN_4,
    name: "Database Table Row Lock Lockout",
    stressCondition: "Exclusive lock on ledger table blocks concurrent reads",
    defaultRisk: "HIGH",
    mitigation: "Apply non-blocking READ_UNCOMMITTED (WITH NOLOCK) strategy",
    mcpTool: "mcp://network/lock_free_query",
    patchSnippet: "SELECT * FROM billing_ledger WITH (NOLOCK) WHERE sync_status = 'PENDING';"
  },

  // Domain 5: Regulatory Compliance & Legal Governance (U21 – U25)
  {
    id: "U21",
    code: "GDPR_LEAK",
    domain: DOMAINS.DOMAIN_5,
    name: "Cross-Border EU Data Transfer Violation",
    stressCondition: "EU user dataset directed to US-East S3 bucket",
    defaultRisk: "CRITICAL",
    mitigation: "Enforce strict geo-routing to EU-Frankfurt NitroCloud buckets",
    mcpTool: "mcp://governance/gdpr_geo_fence",
    patchSnippet: "const bucket = GeoFence.getCompliantStorageBucket(userRegion: 'EU');"
  },
  {
    id: "U22",
    code: "SOX_MISMATCH",
    domain: DOMAINS.DOMAIN_5,
    name: "Unbalanced Financial Ledger (SOX)",
    stressCondition: "Credits and debits mismatch by $0.01 during multi-currency conversion",
    defaultRisk: "HIGH",
    mitigation: "Inject automated 1-cent round-off adjustment ledger entry",
    mcpTool: "mcp://governance/sox_ledger_balancer",
    patchSnippet: "LedgerBalancer.reconcileCentMismatch(transactionGroup, { autoBalance: true });"
  },
  {
    id: "U23",
    code: "HIPAA_BREACH",
    domain: DOMAINS.DOMAIN_5,
    name: "Patient PHI Log Exposure",
    stressCondition: "Medical ICD-10 diagnostic code logged to stdout console",
    defaultRisk: "CRITICAL",
    mitigation: "Attach medical record PHI log scrubber wrapper",
    mcpTool: "mcp://governance/hipaa_log_filter",
    patchSnippet: "logger.addFilter(HIPAALogFilter.createRedactor(['icd10', 'patient_name']));"
  },
  {
    id: "U24",
    code: "NEG_INVENTORY",
    domain: DOMAINS.DOMAIN_5,
    name: "Negative Inventory Overselling",
    stressCondition: "Concurrent orders decrement stock below 0",
    defaultRisk: "HIGH",
    mitigation: "Trigger atomic row reservation & automated backorder workflow",
    mcpTool: "mcp://governance/atomic_inventory_guard",
    patchSnippet: "UPDATE inventory SET stock = stock - 1 WHERE item_id = $1 AND stock > 0;"
  },
  {
    id: "U25",
    code: "BAD_DISCOUNT",
    domain: DOMAINS.DOMAIN_5,
    name: "Excessive Pricing Discount Bug (>20%)",
    stressCondition: "Discount rule applies 90% markdown due to string concatenation error",
    defaultRisk: "CRITICAL",
    mitigation: "Enforce hard governance discount cap at 20.0%",
    mcpTool: "mcp://governance/discount_cap_rule",
    patchSnippet: "const safeDiscount = Math.min(requestedDiscount, 0.20);"
  },

  // Domain 6: Workplace SaaS & Financial FinOps (U26 – U30)
  {
    id: "U26",
    code: "SAAS_DUP_SEAT",
    domain: DOMAINS.DOMAIN_26,
    domain: DOMAINS.DOMAIN_6,
    name: "Redundant SaaS License Purchase",
    stressCondition: "Purchasing new license for user who already holds inactive seat",
    defaultRisk: "LOW",
    mitigation: "Pre-provisioning user lookup & license reallocation check",
    mcpTool: "mcp://saas/seat_allocator",
    patchSnippet: "await SaaSProvisioner.reallocateUnusedSeatOrPurchase(userEmail);"
  },
  {
    id: "U27",
    code: "DEADLOCK_DELAY",
    domain: DOMAINS.DOMAIN_6,
    name: "Stalled Human Approval Task (>48h)",
    stressCondition: "Primary manager on PTO causing workflow deadlock",
    defaultRisk: "MEDIUM",
    mitigation: "Auto-escalate approval ticket to secondary backup manager after 24h",
    mcpTool: "mcp://saas/approval_escalator",
    patchSnippet: "ApprovalEngine.setEscalationTimer({ maxWaitHours: 24, fallbackRole: 'VP_OPS' });"
  },
  {
    id: "U28",
    code: "FINOPS_OVERRUN",
    domain: DOMAINS.DOMAIN_6,
    name: "Cloud Spend Budget Breach",
    stressCondition: "Parallel cluster spin-up exceeds daily budget cap ($5,000/day)",
    defaultRisk: "HIGH",
    mitigation: "Auto-downscale high-cost GPU instances to CPU spot instances",
    mcpTool: "mcp://saas/finops_budget_throttle",
    patchSnippet: "if (dailySpend > DAILY_BUDGET) await Cluster.scaleToSpotInstances();"
  },
  {
    id: "U29",
    code: "SAAS_DESYNC",
    domain: DOMAINS.DOMAIN_6,
    name: "Partial Offboarding Sync Failure",
    stressCondition: "Employee revoked in Okta but retained in GitHub Org",
    defaultRisk: "HIGH",
    mitigation: "Execute 2-phase transactional commit lock across all SaaS endpoints",
    mcpTool: "mcp://saas/offboard_transaction_lock",
    patchSnippet: "await OffboardTransaction.commitAll(['okta', 'github', 'slack', 'google']);"
  },
  {
    id: "U30",
    code: "TRIBAL_GAP",
    domain: DOMAINS.DOMAIN_6,
    name: "Undocumented SOP Execution Step",
    stressCondition: "Script relies on implicit manual environment variable setup",
    defaultRisk: "MEDIUM",
    mitigation: "Auto-synthesize documentation stubs & validation assertions",
    mcpTool: "mcp://saas/sop_auto_doc",
    patchSnippet: "assertEnvVars(['NITRO_API_KEY', 'DATABASE_URL', 'VAULT_SECRET']);"
  }
];

/**
 * Simulates a single speculative universe execution for a given command.
 */
export async function simulateUniverse(universe, commandPrompt) {
  const startTime = Date.now();
  
  // Random delay between 40ms and 220ms to simulate parallel cloud sub-agents
  const simulatedLatency = Math.floor(Math.random() * 180) + 40;
  await new Promise(res => setTimeout(res, simulatedLatency));

  // Determine failure triggers based on command keywords & universe domain logic
  const lowerCmd = (commandPrompt || "").toLowerCase();
  let status = "PASSED"; // PASSED, MITIGATED, FAILED
  let riskScore = Math.floor(Math.random() * 15) + 5; // base low risk
  let details = `Simulated normal execution in ${universe.id}`;

  // Check if command triggers potential stress in this universe
  const isHighRiskKeyword = lowerCmd.includes("deploy") || 
                           lowerCmd.includes("migration") || 
                           lowerCmd.includes("pricing") || 
                           lowerCmd.includes("offboard") ||
                           lowerCmd.includes("delete") ||
                           lowerCmd.includes("update");

  if (isHighRiskKeyword) {
    // 60% chance of encountering simulated stress condition
    const randomTrigger = Math.random();
    if (randomTrigger > 0.4) {
      status = "MITIGATED"; // Successfully caught by MultiverseOps mitigation engine!
      riskScore = Math.floor(Math.random() * 35) + 45;
      details = `Stress condition triggered: [${universe.stressCondition}]. Applied mitigation: ${universe.mitigation}`;
    } else if (randomTrigger < 0.1) {
      // 10% chance of initial unhandled failure before remediation synthesis
      status = "FAILED";
      riskScore = Math.floor(Math.random() * 20) + 80;
      details = `CRITICAL FAILURE DETECTED: ${universe.stressCondition}. Remediation patch generated.`;
    }
  }

  return {
    universeId: universe.id,
    code: universe.code,
    name: universe.name,
    domain: universe.domain,
    stressCondition: universe.stressCondition,
    mitigation: universe.mitigation,
    mcpTool: universe.mcpTool,
    status: status,
    riskScore: riskScore,
    latencyMs: Date.now() - startTime,
    details: details,
    patchSnippet: universe.patchSnippet
  };
}
