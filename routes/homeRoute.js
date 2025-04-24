import express from "express";
const router = express.Router();

import { showHomePage } from "../controllers/homeController.js";

router.get("/", showHomePage);

export default router;
