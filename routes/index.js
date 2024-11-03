import express from "express";

import * as authController from "../controllers/authChecks.js";
import * as indexController from "../controllers/index.js";

const router = express.Router();

router.get("/", authController.checkAuthenticated, indexController.loadePage);

export default router;
