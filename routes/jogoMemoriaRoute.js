import express from "express";
const router = express.Router();

import { showJogoMemoriaPage } from "../controllers/jogoMemoriaController.js";
import { showJogoMemoriaIn } from "../controllers/jogoMemoriaController.js";
import { showJogoMemoriaDif } from "../controllers/jogoMemoriaController.js";

router.get("/jogoMemoria", showJogoMemoriaPage);
router.get("/jogoMemoriaIn",showJogoMemoriaIn);
router.get("/jogoMemoriaDif",showJogoMemoriaDif);

export default router;