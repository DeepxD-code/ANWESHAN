import { Router } from "express";
import { linkGuardian, getGuardians, getAlertsForGuardian, classifyAlert } from "../controllers/guardian.controller";

const router = Router();

router.post("/link", linkGuardian);
router.get("/:guardianId", getGuardians);
router.get("/:guardianId/alerts", getAlertsForGuardian);
router.put("/classify/:alertId", classifyAlert);

export default router;