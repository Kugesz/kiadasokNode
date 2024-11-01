import express from "express";

import * as indexController from "../controllers/index.js";
import * as authController from "../controllers/authChecks.js";

const router = express.Router();

router.get("/", authController.checkAuthenticated, indexController.loadePage);

router.post(
  "/newExpense",
  authController.checkAuthenticated,
  indexController.newExpense
);

router.put(
  "/editExpense",
  //authController.checkAuthenticated,
  indexController.editExpense
);

router.delete(
  "/deleteExpense",
  authController.checkAuthenticated,
  indexController.deleteExpense
);

router.post(
  "/setBudget",
  authController.checkAuthenticated,
  indexController.setBudget
);

export default router;
