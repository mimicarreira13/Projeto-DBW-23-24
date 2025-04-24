import express from "express";

const router = express.Router();

import { showInicioJogoGalo } from "../controllers/JogoGaloController.js";
import { showDificuldadeJogoGalo } from "../controllers/JogoGaloController.js";
import { showJogoGalo } from "../controllers/JogoGaloController.js";

router.get("/JogoGaloInicio", showInicioJogoGalo);
router.get("/JogoGaloDificuldade", showDificuldadeJogoGalo);
router.get("/JogoGalo", showJogoGalo);

export default router;
