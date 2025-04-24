// Menu inicio do jogo

/**
 * @param {Object} req - O objeto de request do Express.js.
 * @param {Object} res - O objeto de response do Express.js.
 * @param {Function} req.isAuthenticated - Função para verificar se o utilizador está autenticado.
 * @param {Function} res.render - Função para renderizar uma pagina.
 * @return {Function} res.redirect - Função para redirecionar o utilizador para outra página
 */
export async function showInicioJogoForca(req, res) {
  if (!req.isAuthenticated()) {
    return res.redirect("/criar_conta?message=not_authenticated");
  }

  res.render("JogoForcaInicio", {
    isAuthenticated: req.isAuthenticated(),
  });
}

// Menu dificuldade
/**
 * @param {Object} req - Objeto do request HTTP.
 * @param {Object} res - Objeto do response HTTP.
 * @param {Function} req.isAuthenticated - Função para verificar se o utilizador está autenticado.
 * @param {Function} res.render - Função para renderizar uma pagina.
 * @return {Function} res.redirect - Função para redirecionar o utilizador para outra página
 */
export async function showDificuldadeJogoForca(req, res) {
  if (!req.isAuthenticated()) {
    return res.redirect("/criar_conta?message=not_authenticated");
  }

  res.render("JogoForcaDificuldade", {
    isAuthenticated: req.isAuthenticated(),
  });
}

// Jogo da Forca
/**
 * @param {Object} req - Objeto do request HTTP.
 * @param {Object} res - Objeto do response HTTP.
 * @param {Function} req.isAuthenticated - Função para verificar se o utilizador está autenticado.
 * @param {Function} res.render - Função para renderizar uma pagina.
 * @return {Function} res.redirect - Função para redirecionar o utilizador para outra página
 */
export async function showJogoForca(req, res) {
  if (!req.isAuthenticated()) {
    return res.redirect("/criar_conta?message=not_authenticated");
  }

  res.render("JogoForca", {
    isAuthenticated: req.isAuthenticated(),
  });
}
