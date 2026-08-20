import { Router } from "express";

import {
  register,
  login,
  updateProfile,
  linkCaretaker,
  verifyCaretakerToken,
} from "../controllers/auth.controller";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.put("/profile", updateProfile);
router.post("/link-caretaker", linkCaretaker);
router.post("/verify-caretaker-token", verifyCaretakerToken);

export default router;