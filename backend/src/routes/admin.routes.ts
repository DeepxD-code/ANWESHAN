import { Router } from "express";
import {
  getPlatformStats,
  listUsers,
  toggleUserStatus,
  getRecentActivity,
} from "../controllers/admin.controller";

const router = Router();

router.get("/stats", getPlatformStats);
router.get("/users", listUsers);
router.get("/activity", getRecentActivity);
router.put("/users/:userId/status", toggleUserStatus);

export default router;