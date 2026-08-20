import { Router } from "express";
import {
  getChannels,
  getPosts,
  createPost,
  addReply,
  getRegionalStats,
} from "../controllers/community.controller";

const router = Router();

router.get("/channels", getChannels);
router.get("/posts/:channelId", getPosts);
router.get("/stats/regional", getRegionalStats);
router.post("/posts", createPost);
router.post("/posts/:postId/replies", addReply);

export default router;