import express from "express";

import * as registerController from "../controllers/register.js";

const router = express.Router();

//Ide jonneg a connectionok get set stb.

router.get("/", registerController.loadePage);

export default router;
