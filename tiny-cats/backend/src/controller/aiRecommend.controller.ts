import type { Request, Response } from "express";
import { aiRecommendService } from "../services/aiRecommend.service.ts";

export const aiRecommendController = async (req: Request, res: Response) => {
  const { kidsFriendly, apartmentFriendly } = req.body;

  const result = await aiRecommendService(kidsFriendly, apartmentFriendly);

  return res.status(200).json({
    success: true,
    count: result!.length || 0,
    data: result,
  });
};
