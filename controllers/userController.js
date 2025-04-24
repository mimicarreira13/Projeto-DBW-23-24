import * as userModel from "../models/users.js";
import passport from "passport";

// Criação de um utilizador (Conta)

//exporta a função registerGet (que é chamada quando o utilizador acede à página de registo)
/**
 * Renders the account creation page.
 * @param {Object} req - O objeto de request do Express.js.
 * @param {Object} res - O objeto de response do Express.js.
 * @param {Function} req.isAuthenticated - Função para verificar se o utilizador está autenticado.
 * @param {Function} res.render - Função para renderizar uma pagina.
 */
export function registerGet(req, res) {
  res.render("criar_conta", {
    isAuthenticated: req.isAuthenticated(),
  });
}

//exporta a função registerPost (que é chamada quando o utilizador submete o formulário de registo)
/**
 * @param {Object} req - O objeto de request do Express.js.
 * @param {Object} req.body - O corpo do request.
 * @param {Object} res - O objeto de response do Express.js.
 * @param {Function} res.redirect - Função para redirecionar o utilizador para outra página
 * @returns {Promise<void>} - Promise de que a função terminou
 */
export async function registerPost(req, res, next) {
  //req.body é o que é enviado pelo formulário
  if (await userModel.registerUser(req.body)) {
    //se o utilizador for registado com sucesso
    res.redirect("/login"); //redireciona para a página das insrucoes por enquanto
  } else {
    res.redirect("/conta_existe"); //se o utilizador não for registado com sucesso, redireciona para a página de erro de registo
  }
}

/**
 * @param {Object} req - O objeto de request do Express.js.
 * @param {Object} res - O objeto de response do Express.js.
 * @param {Function} req.isAuthenticated - Função para verificar se o utilizador está autenticado.
 * @param {Function} res.render - Função para renderizar uma pagina.
 */
export function RegisterFailedGet(req, res) {
  res.render("conta_existe", {
    isAuthenticated: req.isAuthenticated(), //envia a informação se o utilizador está autenticado
    errorMessage: "A conta já existe!", //envia a mensagem de erro
  });
}

// Login de um utilizador

//exporta a função loginGet (que é chamada quando o utilizador acede à página de login)
/**
 * @param {Object} req - O objeto de request do Express.js.
 * @param {Object} res - O objeto de response do Express.js.
 * @param {Function} req.isAuthenticated - Função para verificar se o utilizador está autenticado.
 * @param {Function} res.render - Função para renderizar uma pagina.
 */
export function loginGet(req, res) {
  res.render("login", {
    isAuthenticated: req.isAuthenticated(),
  });
}

//exporta a função loginPost (que é chamada quando o utilizador submete o formulário de login)
/**
 * @param {Object} req - O objeto de request do Express.js.
 * @param {Object} res - O objeto de response do Express.js.
 * @param {Function} next - Função para chamar o próximo middleware.
 * @returns {Promise<void>} - Promise de que a função terminou
 */
export async function loginPost(req, res, next) {
  const test = await passport.authenticate("local", {
    successRedirect: "/", //se o login for bem sucedido, redireciona para a página inicial
    failureRedirect: "/loginFailed", //se o login falhar, redireciona para a página de erro de login
  })(req, res, next); //chama a função de autenticação do passport
}

/**
 * @param {Object} req - O objeto de request do Express.js.
 * @param {Object} res - O objeto de response do Express.js.
 * @param {Function} req.isAuthenticated - Função para verificar se o utilizador está autenticado.
 * @param {Function} res.render - Função para renderizar uma pagina.
 */
export function loginFailedGet(req, res) {
  res.render("loginFailed", {
    //renderiza a página de erro de login
    isAuthenticated: req.isAuthenticated(), //envia a informação se o utilizador está autenticado
    errorMessage: "O utilizador não existe!", //envia a mensagem de erro
  });
}

//Logout de um utilizador
/**
 * @param {Object} req -  O objeto de request do Express.js.
 * @param {Function} req.logout - Função para fazer logout do utilizador.
 * @param {Object} res - O objeto de response do Express.js.
 * @param {Function} res.redirect - Função para redirecionar o utilizador para outra página
 */
export function logoutGet(req, res) {
  req.logout(function (err) {
    //req.logout é uma função do passport que faz logout do utilizador
    if (err) {
      return next(err); //se houver um erro, chama o próximo middleware
    }
    res.redirect("/"); //redireciona para a página inicial
  });
}

/**
 * Update do score do jogo da forca POST
 *
 * @param {Object} req - Objecto de request do Express.js.
 * @param {Object} req.body - O corpo do request.
 * @param {number} req.body.newScore - O novo score do utilizador.
 * @param {Object} req.user - O utilizador autenticado.
 * @param {string} req.user._id - O id do utilizador autenticado.
 * @param {Object} res - Objecto de response do Express.js.
 * @returns {Object} - O objecto de response do Express.js.
 * @throws {Error} - Se ocorrer um erro ao atualizar o score.
 */
export async function updateScoreForcaPOST(req, res) {
  const { newScore } = req.body; // Extrai o novo score do corpo do request

  if (!req.user) {
    // Verifica se o utilizador está autenticado
    return res.status(401).json({ message: "Not authenticated" }); // Retorna um erro 401 se o utilizador não estiver autenticado
  }

  try {
    const result = await userModel.updateUserScoreForca(req.user._id, newScore); // Atualiza o score do utilizador
    if (result) {
      // Verifica se o score foi atualizado com sucesso
      res.status(200).json({ message: "Score updated successfully" }); // Retorna um status 200 se o score foi atualizado com sucesso
    } else {
      res.status(400).json({ message: "Failed to update score" }); // Retorna um erro 400 se o score não foi atualizado
    }
  } catch (error) {
    // Retorna um erro 500 se ocorrer um erro ao atualizar o score
    console.log(error);
    res.status(500).json({ message: "An error occurred" }); // Retorna um erro 500 se ocorrer um erro ao atualizar o score
  }
}

/**
 * Update do score do jogo da memoria POST
 *
 * @param {Object} req - Objecto de request do Express.js.
 * @param {Object} req.body - O corpo do request.
 * @param {number} req.body.newScore - O novo score do utilizador.
 * @param {Object} req.user - O utilizador autenticado.
 * @param {string} req.user._id - O id do utilizador autenticado.
 * @param {Object} res - Objecto de response do Express.js.
 * @returns {Object} - O objecto de response do Express.js.
 * @throws {Error} - Se ocorrer um erro ao atualizar o score.
 */
export async function updateScoreMemmoriaPOST(req, res) {
  const { newScore } = req.body; // Extrai o novo score do corpo do request

  if (!req.user) {
    // Verifica se o utilizador está autenticado
    return res.status(401).json({ message: "Not authenticated" }); // Retorna um erro 401 se o utilizador não estiver autenticado
  }

  try {
    const result = await userModel.updateUserScoreMemoria(
      req.user._id,
      newScore
    ); // Atualiza o score do utilizador
    if (result) {
      // Verifica se o score foi atualizado com sucesso
      res.status(200).json({ message: "Score updated successfully" }); // Retorna um status 200 se o score foi atualizado com sucesso
    } else {
      res.status(400).json({ message: "Failed to update score" }); // Retorna um erro 400 se o score não foi atualizado
    }
  } catch (error) {
    // Retorna um erro 500 se ocorrer um erro ao atualizar o score
    console.log(error);
    res.status(500).json({ message: "An error occurred" }); // Retorna um erro 500 se ocorrer um erro ao atualizar o score
  }
}

/**
 * Update do score do jogo da memoria POST
 *
 * @param {Object} req - Objecto de request do Express.js.
 * @param {Object} req.body - O corpo do request.
 * @param {number} req.body.newScore - O novo score do utilizador.
 * @param {Object} req.user - O utilizador autenticado.
 * @param {string} req.user._id - O id do utilizador autenticado.
 * @param {Object} res - Objecto de response do Express.js.
 * @returns {Object} - O objecto de response do Express.js.
 * @throws {Error} - Se ocorrer um erro ao atualizar o score.
 */
export async function updateScoreGaloPOST(req, res) {
  const { newScore } = req.body; // Extrai o novo score do corpo do request

  if (!req.user) {
    // Verifica se o utilizador está autenticado
    return res.status(401).json({ message: "Not authenticated" }); // Retorna um erro 401 se o utilizador não estiver autenticado
  }

  try {
    const result = await userModel.updateUserScoreGalo(req.user._id, newScore); // Atualiza o score do utilizador
    if (result) {
      // Verifica se o score foi atualizado com sucesso
      res.status(200).json({ message: "Score updated successfully" }); // Retorna um status 200 se o score foi atualizado com sucesso
    } else {
      res.status(400).json({ message: "Failed to update score" }); // Retorna um erro 400 se o score não foi atualizado
    }
  } catch (error) {
    // Retorna um erro 500 se ocorrer um erro ao atualizar o score
    console.log(error);
    res.status(500).json({ message: "An error occurred" }); // Retorna um erro 500 se ocorrer um erro ao atualizar o score
  }
}

// Para o ranking
export async function getUserByScore(req, res) {
  try {
    const forca = await userModel.getUsersSortedByScoreForca();
    const memoria = await userModel.getUsersSortedByScoreMemoria();
    const galo = await userModel.getUsersSortedByScoreGalo();
    if (!req.isAuthenticated()) {
      return res.redirect("/criar_conta?message=not_authenticated");
    }
    res.render("classificacoes", {
      isAuthenticated: req.isAuthenticated(),
      forca: forca,
      memoria: memoria,
      galo: galo,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "An error occurred" });
  }
}
