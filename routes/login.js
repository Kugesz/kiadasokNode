import express from "express";

import * as loginController from "../controllers/login.js";

const router = express.Router();

//Ide jonneg a connectionok get set stb.
router.get("/", loginController.loadePage);

router.post("/", loginController.loginCheck);

export default router;
