import { Router } from "express";
import {
  createThread,
  getThreads,
  getThreadById,
  addPost,
  getThreadPosts,
  markPostHelpful,
  likePost,
  getScamCategories,
  searchThreads,
} from "../controllers/community.controller";

const router = Router();

// Thread endpoints
router.post("/threads", createThread);
router.get("/threads", getThreads);
router.get("/threads/search", searchThreads);
router.get("/threads/:id", getThreadById);

// Post endpoints
router.post("/threads/:id/posts", addPost);
router.get("/threads/:threadId/posts", getThreadPosts);
router.put("/posts/:id/helpful", markPostHelpful);
router.put("/posts/:id/like", likePost);

// Categories
router.get("/categories/scams", getScamCategories);

export default router;
