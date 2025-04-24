import express from "express";

const router = express.Router();
import {valoresPontuacaoGet} from "../controllers/pontuacaoController.js";
import { get } from "mongoose";

// GET /pontuacao
router.get("/pontuacao", valoresPontuacaoGet);
export default router;

