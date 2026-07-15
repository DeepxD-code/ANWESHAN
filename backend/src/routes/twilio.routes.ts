import { Router } from "express";
import { handleVoiceTrigger } from "../controllers/twilio.controller";

const router = Router();

router.post("/voice-trigger", handleVoiceTrigger);

export default router;
