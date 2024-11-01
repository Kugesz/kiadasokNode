import express from "express";

import * as indexController from "../controllers/index.js";
import * as authController from "../controllers/authChecks.js";

const router = express.Router();

//Ide jonneg a connectionok get set stb.
router.get("/", authController.checkAuthenticated, indexController.loadePage);

router.post(
  "/newExpense",
  authController.checkAuthenticated,
  indexController.newExpense
);

// router.put("/editExpense")

router.delete(
  "/deleteExpense",
  authController.checkAuthenticated,
  indexController.deleteExpense
);

router.put("/setBalance");

export default router;
