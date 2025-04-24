import express from "express";
const router = express.Router();
import * as userController from "../controllers/userController.js";
import passport from "passport";

// Criação de um utilizador (Conta)
router.get("/criar_conta", userController.registerGet);
router.post("/registar", userController.registerPost);
router.get("/conta_existe", userController.RegisterFailedGet);

// Login de um utilizador
router.get("/login", userController.loginGet);
router.post("/login", userController.loginPost);
router.get("/loginFailed", userController.loginFailedGet);

// Logout de um utilizador
router.get("/logout", userController.logoutGet);

// Para o score do jogo da Forca
router.post("/JogoForca/user/score", userController.updateScoreForcaPOST);

// Para o score do jogo da Memória
router.post("/JogoMemoria/user/score", userController.updateScoreMemmoriaPOST);

// Para o score do jogo do galo
router.post("/JogoGalo/user/score", userController.updateScoreGaloPOST);

// Para o ranking
router.get("/classificacoes", userController.getUserByScore);

export default router;
