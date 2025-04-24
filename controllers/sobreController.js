/**
 * @param {Object} req - O objeto de request do Express.js.
 * @param {Object} res - O objeto de response do Express.js.
 * @param {Function} req.isAuthenticated - Função para verificar se o utilizador está autenticado.
 * @param {Function} res.render - Função para renderizar uma pagina.
 */
export async function showSobrePage(req, res) {
  res.render("sobre", {
    isAuthenticated: req.isAuthenticated(),
  });
}
