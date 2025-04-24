import express from "express";
const router = express.Router();

import { showLoginPage } from "../controllers/loginController.js";

router.get("/login", showLoginPage);

export default router;
