import * as model from "../models/instrucoes.js";

/**
 * Mostra a página de instruções, gera e guarda se necessário, e garante autenticação.
 * @param {Object} req - Objeto do request HTTP.
 * @param {Object} res - Objeto do response HTTP.
 */
export async function showInstrucoesPage(req, res) {
  console.log("instrucoesController");

  try {
    const gen_store = await model.generate();

    if (!gen_store || !gen_store.success) {
      throw new Error("Erro ao gerar instruções.");
    }

    if (!req.isAuthenticated()) {
      console.log("Não autenticado");
      return res.redirect("/criar_conta?message=not_authenticated");
    }

    let formattedInfo = [];

    if (Array.isArray(gen_store.result)) {
      formattedInfo = gen_store.result;
    } else if (typeof gen_store.result === "string") {
      formattedInfo = [{ text: gen_store.result }];
    }

    res.render("instrucoes", {
      info: formattedInfo,
      isAuthenticated: req.isAuthenticated(),
    });
  } catch (error) {
    console.error("Erro:", error);
    res.status(500).send("Erro interno do servidor.");
  }
}
