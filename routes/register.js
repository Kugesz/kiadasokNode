import express from "express";

import * as authController from "../controllers/authChecks.js";
import * as registerController from "../controllers/register.js";

const router = express.Router();

router.get(
  "/",
  authController.checkNotAuthenticated,
  registerController.loadePage
);

router.post(
  "/",
  authController.checkNotAuthenticated,
  registerController.newRegister
);

export default router;
