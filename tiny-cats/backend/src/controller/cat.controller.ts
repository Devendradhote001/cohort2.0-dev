import type { Request, Response } from "express";
import {
  getSingleCatService,
  createCatService,
  getAllCatsService,
  searchCatsService,
  recommendService,
} from "../services/cat.service.ts";

export const createCatController = async (req: Request, res: Response) => {
  let result = await createCatService(req.body);

  return res.status(201).json({
    success: true,
    message: "Cat created",
    data: result,
  });
};

export const getAllCatsController = async (req: Request, res: Response) => {
  let result = await getAllCatsService();

  return res.status(200).json({
    success: true,
    message: "Cats fetched",
    data: result,
  });
};

export const getSingleCatController = async (req: Request, res: Response) => {
  let id = req.params.id as string;

  let result = await getSingleCatService(id);

  return res.status(200).json({
    success: true,
    message: "Cat fetched",
    data: result,
  });
};

export const searchCatController = async (req: Request, res: Response) => {
  let q = req.query.q as string;

  console.log(q);

  let result = await searchCatsService(q);

  return res.status(200).json({
    success: true,
    message: "Cats fetched",
    data: result,
  });
};

export const recommendCatsController = async (req: Request, res: Response) => {
  const { kidsFriendly, apartmentFriendly } = req.body;

  const result = await recommendService(kidsFriendly, apartmentFriendly);

  return res.status(200).json({
    success: true,
    message: "Cat fetched",
    data: result,
  });
};
