import { Router } from "express";
import {
  uploadEvidence,
  getEvidenceForReview,
  approveEvidence,
  rejectEvidence,
  getEvidenceStats,
} from "../controllers/evidence.controller";

const router = Router();

router.post("/", uploadEvidence);
router.get("/review", getEvidenceForReview);
router.get("/stats", getEvidenceStats);
router.put("/approve/:reviewId", approveEvidence);
router.put("/reject/:reviewId", rejectEvidence);

export default router;