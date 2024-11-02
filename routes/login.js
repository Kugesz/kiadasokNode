import express from "express";

import * as authController from "../controllers/authChecks.js";
import * as loginController from "../controllers/login.js";

const router = express.Router();

router.get(
  "/",
  authController.checkNotAuthenticated,
  loginController.loadePage
);

router.post(
  "/",
  authController.checkNotAuthenticated,
  loginController.loginCheck
);

export default router;
