import express from "express";

import * as indexController from "../controllers/index.js";

const router = express.Router();

//Ide jonneg a connectionok get set stb.
router.get("/", indexController.loadePage);

export default router;
