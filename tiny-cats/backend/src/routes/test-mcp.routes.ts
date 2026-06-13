import express from "express";
import { testMcpController } from "../controller/test-mcp.controller.ts";

const router = express.Router();

router.get("/test-mcp", testMcpController);

export default router;
