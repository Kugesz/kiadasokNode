import express from "express";
import * as indexController from "../controllers/index.js";
import * as authController from "../controllers/authChecks.js";
import pwController from "../controllers/pw-change.js";

const router = express.Router();

router.get("/", authController.checkAuthenticated, indexController.loadePage);

router.post(
  "/newExpense",
  authController.checkAuthenticated,
  indexController.newExpense
);

router.delete(
  "/deleteExpense",
  authController.checkAuthenticated,
  indexController.deleteExpense
);

router.put("/setBalance");

router.put(
  "/changePassword",
  authController.checkAuthenticated,
  pwController.changePassword
);

export default router;
