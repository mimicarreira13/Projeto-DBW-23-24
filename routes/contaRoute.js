import express from "express";
const router = express.Router();

import { showCriarContaPage } from "../controllers/CriarContaController.js";
router.get("/criar_conta", showCriarContaPage);

export default router;
