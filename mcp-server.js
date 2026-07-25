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
      const { name, arguments: args, universeId } = params;
      return { jsonrpc: "2.0", result: this.executeToolInUniverse(name, args, universeId), id };
    }
    return { jsonrpc: "2.0", error: { code: -32601, message: "Method not found" }, id };
  }

  executeToolInUniverse(toolName, args, universeId) {
    const universe = this.universes.find(u => u.id === universeId);
    
    // Check if custom tool handler exists in Pavitra's module
    const handler = this.handlers[toolName];
    let executionResult = null;

    if (handler && universe) {
      executionResult = handler(args, universe);
    }

    if (universe && universe.fail) {
      return {
        status: "FAILURE",
        universeId: universe.id,
        domain: universe.domain,
        code: universe.code,
        name: universe.name,
        error: universe.err || (executionResult ? executionResult.error : "Execution Exception"),
        detail: executionResult ? executionResult.detail : universe.simulatedFailure,
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
