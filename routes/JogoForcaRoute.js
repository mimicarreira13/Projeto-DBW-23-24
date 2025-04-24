import express from "express";

const router = express.Router();

import { showInicioJogoForca } from "../controllers/JogoForcaController.js";
import { showDificuldadeJogoForca } from "../controllers/JogoForcaController.js";
import { showJogoForca } from "../controllers/JogoForcaController.js";

router.get("/JogoForcaInicio", showInicioJogoForca);
router.get("/JogoForcaDificuldade", showDificuldadeJogoForca);
router.get("/JogoForca", showJogoForca);

export default router;
