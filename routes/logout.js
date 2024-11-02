import express from "express";

import * as authController from "../controllers/authChecks.js";
import * as logoutController from "../controllers/logout.js";

const router = express.Router();

router.delete("/", authController.checkAuthenticated, logoutController.logout);

export default router;
