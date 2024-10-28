import express from "express";

import * as registerController from "../controllers/register.js";

const router = express.Router();

//Ide jonneg a connectionok get set stb.

router.get("/", registerController.loadePage);

router.post("/newRegister", registerController.newRegister);

export default router;
