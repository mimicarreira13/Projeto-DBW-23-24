import passport from "passport";
import * as userModel from "../models/users.js";


/**
 * Obtém os valores de pontuação do usuário e renderiza a página de pontuação.
 * @async
 * @param {Object} req - O objeto de solicitação Express.
 * @param {Object} res - O objeto de resposta Express.
 * @returns {Promise<void>} Uma Promise que resolve quando a página de pontuação é renderizada.
 */

//
export async function valoresPontuacaoGet(req, res) {

  try{
    const bla = await userModel.encontraUserId(req.user._id); // Encontra o utilizador pelo ID
    console.log(bla);
    console.log(bla.score_and_Data);
    // Renderiza a página de pontuação
    res.render("pontuacao", {
      isAuthenticated: req.isAuthenticated(), // Verifica se o utilizador está autenticado
      bla: bla, // user
    });
   
  } catch(error){
    console.log(error);
  }
}
