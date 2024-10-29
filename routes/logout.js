import express from "express";

import * as logoutController from "../controllers/logout.js";
import * as authController from "../controllers/authChecks.js";

const router = express.Router();

router.delete("/", authController.checkAuthenticated, logoutController.logout);

export default router;
