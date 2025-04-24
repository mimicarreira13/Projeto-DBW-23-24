/**
 * @param {Object} req - O objeto de request do Express.js.
 * @param {Object} res - O objeto de response do Express.js.
 * @param {Function} req.isAuthenticated - Função para verificar se o utilizador está autenticado.
 * @param {Function} res.render - Função para renderizar uma pagina.
 * @return {Function} res.redirect - Função para redirecionar o utilizador para outra página
 */
export async function showJogoMemoriaPage(req, res) {
  if (!req.isAuthenticated()) {
    return res.redirect("/criar_conta?message=not_authenticated");
  }
  res.render("jogoMemoria", {
    isAuthenticated: req.isAuthenticated(),
  });
}

/**
 * @param {Object} req - O objeto de request do Express.js.
 * @param {Object} res - O objeto de response do Express.js.
 * @param {Function} req.isAuthenticated - Função para verificar se o utilizador está autenticado.
 * @param {Function} res.render - Função para renderizar uma pagina.
 * @return {Function} res.redirect - Função para redirecionar o utilizador para outra página
 */
export async function showJogoMemoriaIn(req, res) {
  if (!req.isAuthenticated()) {
    return res.redirect("/criar_conta?message=not_authenticated");
  }
  res.render("jogoMemoriaIn", {
    isAuthenticated: req.isAuthenticated(),
  });
}

/**
 * @param {Object} req - O objeto de request do Express.js.
 * @param {Object} res - O objeto de response do Express.js.
 * @param {Function} req.isAuthenticated - Função para verificar se o utilizador está autenticado.
 * @param {Function} res.render - Função para renderizar uma pagina.
 * @return {Function} res.redirect - Função para redirecionar o utilizador para outra página
 */
export async function showJogoMemoriaDif(req, res) {
  if (!req.isAuthenticated()) {
    return res.redirect("/criar_conta?message=not_authenticated");
  }
  res.render("jogoMemoriaDif", {
    isAuthenticated: req.isAuthenticated(),
  });
}
