import type { Request, Response } from "express";
import { getMcpClient } from "../services/mcp.service.ts";
import { generateAiResponse } from "../services/gemini.service.ts";

export const testMcpController = async (req: Request, res: Response) => {
  const client = await getMcpClient();

  const tools = await client.listTools();

  const result = await client.callTool({
    name: "recommend_cats",
    arguments: {
      kidsFriendly: true,
      apartmentFriendly: false,
    },
  });

  let catsData = result.content[0].text;

  let prompt = `
  
  Available cats

${catsData}

recommend best cats from this data

  `;

  let aiResponse = await generateAiResponse(prompt);

  return res.json({
    success: true,
    data: aiResponse,
  });
};
