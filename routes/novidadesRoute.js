import express from "express";
const router = express.Router();

import { showNovidadePage } from "../controllers/novidadeController.js";

router.get("/novidade", showNovidadePage);

export default router;
