"use strict";

import express from "express";
import methodOverride from "method-override";
import mongoose from "mongoose";

import homeRoute from "./routes/homeRoute.js";
import instrucoesRoute from "./routes/instrucoesRoute.js";

import minhaContaRoute from "./routes/minhaContaRoute.js";
import sobreRoute from "./routes/sobreRoute.js";
import novidadesRoute from "./routes/novidadesRoute.js";
import userRoute from "./routes/userRoute.js";
import jogoMemoriaRoute from "./routes/jogoMemoriaRoute.js";
import pontuacaoRoute from "./routes/pontuacaoRoute.js";
import JogoForca from "./routes/JogoForcaRoute.js";
import JogoGalo from "./routes/JogoGaloRoute.js";
import API from "./routes/api.js";

import path from "path"; // O módulo path fornece utilitários para trabalhar com caminhos de arquivos e diretórios.
import { fileURLToPath } from "url"; // é um método que converte um URL em um caminho de arquivo no sistema de arquivos local

import passport from "passport";
import localStrategy from "passport-local";
import session from "express-session";
import * as users from "./models/users.js";
import dotenv from "dotenv";
dotenv.config(); // Carrega variáveis de ambiente de um arquivo .env para process.env

const app = express(); // Cria uma instância do aplicativo Express.
app.use(express.json()); // é uma função middleware no framework Express.js para Node.js que analisa o JSON, o texto e os dados codificados de URL enviados com a solicitação HTTP POST.
const __filename = fileURLToPath(import.meta.url); // O __filename é uma variável global do Node.js que contém o caminho do arquivo atual.
const __dirname = path.dirname(__filename); // O __dirname é uma variável global do Node.js que contém o diretório do arquivo atual.

app.set("view engine", "ejs"); //método para configurar a nossa view engine para “ejs
app.use(express.static(__dirname + "/public")); // é uma função middleware no framework Express.js para Node.js que serve arquivos estáticos, como imagens, arquivos CSS e JavaScript
app.use(express.urlencoded({ extended: true })); // é uma função middleware do Express.js que é usada para analisar dados de formulários HTML que são enviados para o servidor.
app.use(methodOverride("_method")); // Usar o method-override middleware

app.use(
  session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: false,
  })
);

const userModel = users.getUserModel();
passport.use(new localStrategy(userModel.authenticate()));
passport.serializeUser(userModel.serializeUser());
passport.deserializeUser(userModel.deserializeUser());
app.use(passport.initialize());
app.use(passport.session());

const connectionString = process.env.MONGO_URI;


mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log("Conexão com o MongoDB estabelecida com sucesso!");
    })
    .catch((error) => {
        console.error("Erro ao conectar ao MongoDB:", error);
    });

app.use(homeRoute);
app.use(instrucoesRoute);
app.use(minhaContaRoute);
app.use(sobreRoute);
app.use(novidadesRoute);
app.use(userRoute);
app.use(jogoMemoriaRoute);
app.use(pontuacaoRoute);
app.use(JogoForca);
app.use(JogoGalo);
app.use("/api",API);

const PORT = process.env.PORT || 4000;
app.listen(PORT, function (err) {
    if (err) console.log(err);
    console.log("Server listening on PORT", PORT);
});
