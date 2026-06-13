import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";

let client: Client | null = null;

export const getMcpClient = async () => {
  const transport = new StdioClientTransport({
    command: "npx",
    args: ["tsx", "../mcp_server/src/index.ts"],
  });

  client = new Client({
    name: "tiny-cats-client",
    version: "1.0.0",
  });

  await client.connect(transport);

  return client;
};
