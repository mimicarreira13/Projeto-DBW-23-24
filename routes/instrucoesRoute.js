import express from "express";

const router = express.Router();

import { showInstrucoesPage } from "../controllers/instrucoesController.js";
router.get("/instrucoes", showInstrucoesPage);

export default router;
