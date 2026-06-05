import express, { type Request, type Response } from "express";
import catsRoute from "./routes/cat.routes.ts";
import aiRoutes from "./routes/ai.routes.ts";
import aiRecommendRoutes from "./routes/aiRecommend.routes.ts";

const app = express();

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send({
    success: true,
    message: "Tiny cats backend running...",
  });
});

app.use("/api/cats", catsRoute);
app.use("/api/ai", aiRoutes);
app.use("/api/aiRecommend", aiRecommendRoutes);

export default app;
