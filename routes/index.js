import express from "express";

import * as authController from "../controllers/authChecks.js";
import * as indexController from "../controllers/index.js";
import * as pwController from "../controllers/pw-change.js";

const router = express.Router();

router.get("/", authController.checkAuthenticated, indexController.loadePage);

router.post(
  "/newExpense",
  //authController.checkAuthenticated,
  indexController.newExpense
);

router.put(
  "/editExpense",
  authController.checkAuthenticated,
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

router.put(
  "/changePassword",
  authController.checkAuthenticated,
  pwController.changePassword
);

export default router;
