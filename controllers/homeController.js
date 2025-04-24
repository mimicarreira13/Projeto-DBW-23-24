// Mostre a página inicial
/**
 * @param {Object} req - Objeto do request HTTP.
 * @param {Object} res - Objeto do response HTTP.
 * @param {Function} req.isAuthenticated - Função para verificar se o utilizador está autenticado.
 * @param {Function} res.render - Função para renderizar uma pagina.
 */
export async function showHomePage(req, res) {
  res.render("index", {
    isAuthenticated: req.isAuthenticated(),
  });
}
