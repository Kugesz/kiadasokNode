import express from "express";

import * as authController from "../controllers/authChecks.js";
import * as userController from "../controllers/user.js";

const router = express.Router();

router.post(
  "/newExpense",
  authController.checkAuthenticated,
  userController.newExpense
);

router.put(
  "/editExpense",
  authController.checkAuthenticated,
  userController.editExpense
);

router.delete(
  "/deleteExpense",
  authController.checkAuthenticated,
  userController.deleteExpense
);

router.post(
  "/setBudget",
  authController.checkAuthenticated,
  userController.setBudget
);

router.get(
  "/getBudget",
  authController.checkAuthenticated,
  userController.getUserBudget
);

router.get(
  "/getSpending",
  authController.checkAuthenticated,
  userController.getUserSpending
);

router.put(
  "/changePassword",
  authController.checkAuthenticated,
  userController.changePassword
);

export default router;
