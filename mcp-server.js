/**
 * MCP-SERVER.JS (Pavitra's Module - Lead)
 * Production Model Context Protocol (MCP) JSON-RPC 2.0 Server Gateway
 * Exposes 30 Enterprise Tool Definitions & Safety Context State Injectors
 */

const { UNIVERSES, MCP_TOOLS, MCP_TOOL_HANDLERS } = require('./mcp-tools');

class MCPServer {
  constructor() {
    this.tools = MCP_TOOLS;
    this.universes = UNIVERSES;
    this.handlers = MCP_TOOL_HANDLERS;
  }

  // Handles JSON-RPC 2.0 requests
  handleRPCRequest(request) {
    const { jsonrpc, method, params, id } = request;
    if (method === "tools/list") {
      return { jsonrpc: "2.0", result: { tools: this.tools }, id };
    }
    if (method === "tools/call") {
      const { name, arguments: args, universeId, isThreat, dynamicErr } = params;
      return { jsonrpc: "2.0", result: this.executeToolInUniverse(name, args, universeId, isThreat, dynamicErr), id };
    }
    return { jsonrpc: "2.0", error: { code: -32601, message: "Method not found" }, id };
  }

  executeToolInUniverse(toolName, args, universeId, isThreat = false, dynamicErr = null) {
    const universe = this.universes.find(u => u.id === universeId);
    
    // Check if custom tool handler exists in Pavitra's module
    const handler = this.handlers[toolName];
    let executionResult = null;

    if (handler && universe) {
      executionResult = handler(args, universe);
    }

    // Determine failure dynamically based on prompt-driven threat analysis or universe default
    const shouldFail = isThreat || (universe && universe.fail);
    const failureReason = dynamicErr || (universe ? universe.err : "Execution Exception");

    if (shouldFail) {
      return {
        status: "FAILURE",
        universeId: universe ? universe.id : universeId,
        domain: universe ? universe.domain : "General",
        code: universe ? universe.code : "ERR",
        name: universe ? universe.name : "Stress Exception",
        error: failureReason,
        detail: executionResult ? executionResult.detail : (universe ? universe.simulatedFailure : failureReason),
        toolCalled: toolName,
        timestamp: new Date().toISOString()
      };
    }

    return {
      status: "SUCCESS",
      universeId: universeId,
      domain: universe ? universe.domain : "General",
      code: universe ? universe.code : "OK",
      name: universe ? universe.name : "Standard Execution",
      toolCalled: toolName,
      output: executionResult ? executionResult.output : `Executed [${toolName}] successfully in Universe #${universeId}`,
      timestamp: new Date().toISOString()
    };
  }
}

module.exports = { MCPServer, UNIVERSES, MCP_TOOLS };
