// routes/api.js (or wherever you define Express routes)
import express from "express";
import dotenv from "dotenv";
import fetch from "node-fetch";

dotenv.config();

const router = express.Router();
const API_KEY = process.env.API_KEY;
const API_URL = "https://openrouter.ai/api/v1/chat/completions";
const DEFAULT_MODEL = "mistralai/mistral-7b-instruct";

// Secure endpoint to proxy palavra generation
router.post("/gerar-palavras", async (req, res) => {
    const { categoria } = req.body;

    if (!categoria) {
        return res.status(400).json({ error: "Categoria é obrigatória." });
    }

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${API_KEY}`,
            },
            body: JSON.stringify({
                model: DEFAULT_MODEL,
                messages: [
                    {
                        role: "system",
                        content: `Gera uma lista de 10 ${categoria} separadas por virgulas, no singular e sem numeração (Escreve em Português Portugal)`,
                    },
                ],
            }),
        });

        const data = await response.json();
        const texto = data.choices?.[0]?.message?.content;

        if (!texto) {
            throw new Error("Resposta inválida da API");
        }

        const sem_acentos = texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        const palavras = sem_acentos.split(",").map(p => p.trim());

        res.json({ palavras });
    } catch (error) {
        console.error("Erro ao gerar palavras:", error);
        res.status(500).json({ error: "Erro ao gerar palavras." });
    }
});

router.post("/gerar-dica", async (req, res) => {
    const { palavra } = req.body;

    if (!palavra) {
        return res.status(400).json({ error: "Palavra é obrigatória." });
    }

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${API_KEY}`,
            },
            body: JSON.stringify({
                model: DEFAULT_MODEL,
                messages: [
                    {
                        role: "system",
                        content: `Gera uma dica para ajudar a descobrir a palavra: ${palavra} - (Escreve em português de Portugal e não menciones a palavra).`,
                    },
                ],
            }),
        });

        const data = await response.json();
        const dica = data.choices?.[0]?.message?.content;

        if (!dica) {
            throw new Error("Resposta inválida da API");
        }

        res.json({ dica });
    } catch (error) {
        console.error("Erro ao gerar dica:", error);
        res.status(500).json({ error: "Erro ao gerar dica." });
    }
});


export default router;
