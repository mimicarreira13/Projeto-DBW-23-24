import express from "express";
const router = express.Router();

import { showSobrePage } from "../controllers/sobreController.js";
router.get("/sobre", showSobrePage);

export default router;