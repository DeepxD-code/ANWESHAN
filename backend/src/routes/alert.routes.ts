import { Router } from "express";
import { createAlert, getAlerts, getAlertById, updateAlert, getAlertsByGuardian } from "../controllers/alert.controller";

const router = Router();

router.post("/", createAlert);
router.get("/", getAlerts);
router.get("/:id", getAlertById);
router.put("/:id", updateAlert);
router.get("/guardian/:guardianId", getAlertsByGuardian);

export default router;