import { Router } from "express";
import {
  createCheckIn,
  getCheckInHistory,
  getMissedCheckIns,
  triggerMissedCheckInAlert,
} from "../controllers/checkin.controller";

const router = Router();

router.post("/", createCheckIn);
router.get("/missed", getMissedCheckIns);
router.post("/missed/trigger", triggerMissedCheckInAlert);
router.get("/:seniorId", getCheckInHistory);

export default router;