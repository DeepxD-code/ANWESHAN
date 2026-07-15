import { Router } from "express";
import { analyzeUrl } from "../controllers/ml.controller";

const router = Router();

router.post("/analyze-url", analyzeUrl);

export default router;
