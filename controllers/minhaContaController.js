import * as userModel from "../models/users.js";

/**
 * Renderiza a página "minhaConta" se o usuário estiver autenticado. 
 * Se o usuário não estiver autenticado, redireciona para a página "criar_conta".
 *
 * @param {Object} req - O objeto de solicitação HTTP do Express.js.
 * @param {Object} res - O objeto de resposta HTTP do Express.js.
 * @returns {Promise<void>} Uma Promise que resolve quando a página é renderizada ou o usuário é redirecionado.
 */

export async function showMinhaContaPage(req, res) {
  console.log("minhaContaController");
  if (!req.isAuthenticated()) {
    console.log("Não autenticado");
    return res.redirect("/criar_conta?message=updateDados");
  }
  res.locals.user = req.user;
  console.log(req.user);
  res.render("minhaConta", {
    isAuthenticated: req.isAuthenticated(),
  });
}

/**
 * Atualiza as informações do usuário autenticado.
 *
 * @param {Object} req - O objeto de solicitação HTTP do Express.js.
 * @param {Object} res - O objeto de resposta HTTP do Express.js.
 * @returns {Promise<void>} Uma Promise que resolve quando o usuário é atualizado e redirecionado para a página de conta.
 * @throws {Error} Se ocorrer um erro ao atualizar o usuário.
 */

export async function atualizarUtilizador(req, res) {
  try {
    const userId = req.user.id;
    const updatedData = {
      username: req.body.username,
      email: req.body.email,
      password: req.body.password
    };

    await userModel.updateUserbyID(userId, updatedData.email, updatedData.username, updatedData.password);

    // Redireciona para a página de conta do usuário
    res.redirect("/minhaConta");
  } catch (error) {
    console.error("Erro ao processar a solicitação:", error);
    res.redirect("/minhaConta?error=serverError");
  }
}

/**
 * Atualiza a imagem do usuário autenticado.
 *
 * @param {Object} req - O objeto de solicitação HTTP do Express.js. Espera-se que o arquivo de imagem seja fornecido como parte da solicitação.
 * @param {Object} res - O objeto de resposta HTTP do Express.js.
 * @returns {Promise<void>} Uma Promise que resolve quando a imagem do usuário é atualizada e o usuário é redirecionado para a página de conta.
 * @throws {Error} Se ocorrer um erro ao atualizar a imagem do usuário.
 */

export async function editarImagem(req, res) {

  try {
    console.log(req.file);
    res.locals.user = req.user;
    const livro = await userModel.updateImagembyID(req.user.id,req.file.filename); //Vamos buscar um documento existente em mongoDB
    if (livro.success == true) {
        res.redirect("/minhaConta");
    } else {
        console.log("Livro não encontrado - atualizaLivro");
    }
  } catch (error) {
      console.error(error);
  }
};