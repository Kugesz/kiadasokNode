import express from "express";

import * as loginController from "../controllers/login.js";
import * as authController from "../controllers/authChecks.js";

const router = express.Router();

//Ide jonneg a connectionok get set stb.
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
