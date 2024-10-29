import express from "express";

import * as registerController from "../controllers/register.js";
import * as authController from "../controllers/authChecks.js";

const router = express.Router();

//Ide jonneg a connectionok get set stb.

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
