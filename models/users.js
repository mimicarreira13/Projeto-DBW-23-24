import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  imagem: String,

  score_forca_t: {
    type: Number,
    default: 0,
  },
  score_memoria_t: {
    type: Number,
    default: 0,
  },
  score_galo_t: {
    type: Number,
    default: 0,
  },
  score_and_Date: [
    {
      date: {
        type: Date,
        default: Date.now,
      },
      score_forca: {
        type: Number,
        default: 0,
      },
      score_memoria: {
        type: Number,
        default: 0,
      },
      score_galo: {
        type: Number,
        default: 0,
      },
    },
  ],
});

userSchema.plugin(passportLocalMongoose);

const userModel = mongoose.model("User", userSchema);

export function getUserModel() {
  return userModel;
}

/**
 *
 * @param {Object} data - Dados do utilizador a registar
 * @property {String} username - Nome do utilizador
 * @property {String} email - Email do utilizador
 * @property {String} password - Password do utilizador
 */
export async function registerUser(data) {
  console.log("registerUser");

  try {
    const user = new userModel({
      email: data.email,
      username: data.username,
    });
    await userModel.register(user, data.password);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

/**
 * Função assíncrona para obter um usuário pelo ID.
 *
 * @param {string} id - O ID do usuário a ser buscado.
 *
 * @returns {Object} queryResult - Um objeto contendo o resultado da consulta.
 * @returns {boolean} queryResult.success - Um booleano indicando se a consulta foi bem-sucedida.
 * @returns {Object} queryResult.result - O resultado da consulta. Se a consulta foi bem-sucedida, este será o usuário encontrado. Se a consulta falhou, este será null.
 * @returns {Object} queryResult.error - O erro ocorrido durante a consulta. Se a consulta foi bem-sucedida, este será null.
 *
 * @example
 *
 * const user = await getUserById('1234567890');
 * if (user.success) {
 *   console.log(user.result);
 * } else {
 *   console.error(user.error);
 * }
 */

export async function getUserById(id) {
  console.log("getUserById");
  // console.log(id);
  const queryResult = { success: false, result: null, error: null };

  try {
    queryResult.result = await userModel.findById(id).exec();
    // console.log(queryResult.result);

    if (queryResult.result) queryResult.success = true; // apenas modificar o valor do sucesso caso a query seja executada. Se houver erro na linha anterior, esta linha não é executada.
  } catch (error) {
    console.error(error);
    queryResult.error = error;
  }

  return queryResult;
}

/**
 * Atualiza a imagem de um usuário no banco de dados.
 *
 * @param {string} id - O ID do usuário a ser atualizado.
 * @param {string} desc - A nova descrição da imagem do usuário.
 * @returns {Promise<Object>} Um objeto com as seguintes propriedades:
 *  - success: Um booleano que indica se a operação foi bem-sucedida.
 *  - result: O usuário atualizado, se a operação foi bem-sucedida. Caso contrário, null.
 *  - error: Uma mensagem de erro, se ocorreu um erro. Caso contrário, null.
 * @throws {Error} Se ocorrer um erro ao atualizar a imagem do usuário.
 */

export async function updateImagembyID(id, desc) {
  console.log("updateImagembyID");
  const queryResult = { success: false, result: null, error: null };

  try {
    const oldUserQueryResult = await getUserById(id);

    if (oldUserQueryResult.success == true) {
      oldUserQueryResult.result.imagem = desc;
      oldUserQueryResult.result.save();
      queryResult.success = true; // apenas modificar o valor do sucesso caso a query seja executada. Se houver erro na linha anterior, esta linha não é executada.
    } else {
      // mensagem de erro de livro nao encontrado
    }
  } catch (error) {
    console.error(error);
    queryResult.error = error;
  }

  return queryResult;
}
/**
 * Atualiza as informações de um usuário no banco de dados.
 *
 * @param {string} id - O ID do usuário a ser atualizado.
 * @param {string} newEmail - O novo email do usuário. Se for uma string vazia, o email do usuário não será alterado.
 * @param {string} newUsername - O novo nome de usuário. Se for uma string vazia, o nome de usuário não será alterado.
 * @param {string} newPassword - A nova senha do usuário. Se for uma string vazia, a senha do usuário não será alterada.
 * @returns {Promise<Object>} Um objeto com as seguintes propriedades:
 *  - success: Um booleano que indica se a operação foi bem-sucedida.
 *  - result: O usuário atualizado, se a operação foi bem-sucedida. Caso contrário, null.
 *  - error: Uma mensagem de erro, se ocorreu um erro. Caso contrário, null.
 * @throws {Error} Se ocorrer um erro ao atualizar o usuário.
 */

export async function updateUserbyID(id, newEmail, newUsername, newPassword) {
  const queryResult = { success: false, result: null, error: null };

  try {
    // Verificar se o usuário com o ID fornecido existe
    const user = await userModel.findById(id); // Removido .select('+password')
    if (!user) {
      queryResult.error = "Usuário não encontrado.";
      return queryResult;
    }

    // Atualizar os dados do usuário se novos valores foram fornecidos
    if (newEmail && newEmail.trim() !== "") {
      user.email = newEmail;
    }
    if (newUsername && newUsername.trim() !== "") {
      user.username = newUsername;
    }

    // Verifica se a nova senha foi fornecida
    if (newPassword && newPassword.trim() !== "") {
      try {
        // Atualiza a senha do usuário

        // Usar setPassword para definir a nova senha
        // Promise é um objeto que representa a eventual conclusão ou falha de uma operação assíncrona.
        // Ela serve como um marcador de lugar para o resultado de uma operação que ainda não foi concluída.
        // resolve é uma função que é chamada quando a operação assíncrona é concluída com sucesso.
        //reject é uma função que é chamada quando a operação assíncrona falha.
        await new Promise((resolve, reject) => {
          user.setPassword(newPassword, function (err) {
            // Usar setPassword para definir a nova senha
            if (err) {
              console.error("Erro ao atualizar a senha:", err);
              queryResult.error = "Erro ao atualizar a senha.";
              reject(err);
            } else {
              console.log("Password updated");
              console.log(newPassword);
              resolve();
            }
          });
        });
      } catch (error) {
        return queryResult;
      }
    }

    // Salva as alterações no banco de dados
    await user.save();

    // Definir sucesso como true e retornar o resultado
    queryResult.success = true;
    queryResult.result = user;
  } catch (error) {
    console.error("Erro ao atualizar o usuário:", error);
    queryResult.error = "Erro ao atualizar o usuário.";
  }

  return queryResult;
}
// Score para o jogo da Forca

/**
 * Update do score do jogo da forca
 *
 * @param {string} userId - User ID
 * @param {number} newScore - Novo score do utilizador
 * @returns {boolean} - Retorna true se o score foi atualizado com sucesso, caso contrário retorna false
 * @throws {Error} - Se ocorrer um erro ao atualizar o score
 */
export async function updateUserScoreForca(userId, newScore) {
  try {
    const user = await userModel.findById(userId);
    if (!user) {
      console.log("Não foi encontrado nenhum utilizador com este ID");
      return false;
    }
    user.score_forca_t += newScore; // Adiciona o novo score ao score total
    const currentDate = new Date(); // Cria uma nova data
    currentDate.setHours(1, 0, 0, 0); // Define a hora para 1 da manhã (Porque na db está a hora de franca e nao de portugal)

    let ScoreAndDate = user.score_and_Date.find(
      // Procura se já existe um score para o dia de hoje
      (score_forca) => {
        const scoreDate = new Date(score_forca.date);
        return (
          scoreDate.getFullYear() === currentDate.getFullYear() &&
          scoreDate.getMonth() === currentDate.getMonth() &&
          scoreDate.getDate() === currentDate.getDate()
        );
      }
    );
    if (ScoreAndDate) {
      // Se já existir um score para o dia de hoje
      ScoreAndDate.score_forca += newScore; // Adiciona o novo score ao score do dia
    } else {
      user.score_and_Date.push({
        date: currentDate,
        score_forca: newScore,
      }); // Adiciona um novo score para o dia de hoje
    }

    await user.save(); // Guarda as alterações
    return true; // Retorna true
  } catch (error) {
    // Se ocorrer um erro
    console.log(error);
    return false;
  }
}

/**
 * Update do score do jogo da memoria
 *
 * @param {string} userId - User ID
 * @param {number} newScore - Novo score do utilizador
 * @returns {boolean} - Retorna true se o score foi atualizado com sucesso, caso contrário retorna false
 * @throws {Error} - Se ocorrer um erro ao atualizar o score
 */
export async function updateUserScoreMemoria(userId, newScore) {
  try {
    const user = await userModel.findById(userId);
    if (!user) {
      console.log("Não foi encontrado nenhum utilizador com este ID");
      return false;
    }
    user.score_memoria_t += newScore; // Adiciona o novo score ao score total
    const currentDate = new Date(); // Cria uma nova data
    currentDate.setHours(1, 0, 0, 0); // Define a hora para 1 da manhã (Porque na db está a hora de franca e nao de portugal)

    let ScoreAndDate = user.score_and_Date.find(
      // Procura se já existe um score para o dia de hoje
      (score_memoria) => {
        const scoreDate = new Date(score_memoria.date);
        return (
          scoreDate.getFullYear() === currentDate.getFullYear() &&
          scoreDate.getMonth() === currentDate.getMonth() &&
          scoreDate.getDate() === currentDate.getDate()
        );
      }
    );
    if (ScoreAndDate) {
      // Se já existir um score para o dia de hoje
      ScoreAndDate.score_memoria += newScore; // Adiciona o novo score ao score do dia
    } else {
      user.score_and_Date.push({
        date: currentDate,
        score_memoria: newScore,
      }); // Adiciona um novo score para o dia de hoje
    }
    await user.save(); // Guarda as alterações
    return true; // Retorna true
  } catch (error) {
    // Se ocorrer um erro
    console.log(error);
    return false;
  }
}

/**
 * Update do score do jogo do galo
 *
 * @param {string} userId - User ID
 * @param {number} newScore - Novo score do utilizador
 * @returns {boolean} - Retorna true se o score foi atualizado com sucesso, caso contrário retorna false
 * @throws {Error} - Se ocorrer um erro ao atualizar o score
 */
export async function updateUserScoreGalo(userId, newScore) {
  try {
    const user = await userModel.findById(userId);
    if (!user) {
      console.log("Não foi encontrado nenhum utilizador com este ID");
      return false;
    }
    user.score_galo_t += newScore; // Adiciona o novo score ao score total
    const currentDate = new Date(); // Cria uma nova data
    currentDate.setHours(1, 0, 0, 0); // Define a hora para 1 da manhã (Porque na db está a hora de franca e nao de portugal)

    let ScoreAndDate = user.score_and_Date.find(
      // Procura se já existe um score para o dia de hoje
      (score_galo) => {
        const scoreDate = new Date(score_galo.date);
        return (
          scoreDate.getFullYear() === currentDate.getFullYear() &&
          scoreDate.getMonth() === currentDate.getMonth() &&
          scoreDate.getDate() === currentDate.getDate()
        );
      }
    );
    if (ScoreAndDate) {
      // Se já existir um score para o dia de hoje
      ScoreAndDate.score_galo += newScore; // Adiciona o novo score ao score do dia
    } else {
      user.score_and_Date.push({
        date: currentDate,
        score_galo: newScore,
      }); // Adiciona um novo score para o dia de hoje
    }
    await user.save(); // Guarda as alterações
    return true; // Retorna true
  } catch (error) {
    // Se ocorrer um erro
    console.log(error);
    return false;
  }
}

export async function getUsersSortedByScoreForca() {
  return userModel.find().sort({ score_forca_t: -1 }).limit(10);
}

export async function getUsersSortedByScoreMemoria() {
  return userModel.find().sort({ score_memoria_t: -1 }).limit(10);
}

export async function getUsersSortedByScoreGalo() {
  return userModel.find().sort({ score_galo_t: -1 }).limit(10);
}

/**
 * Busca um usuário pelo ID.
 * @async
 * @param {string} userId - O ID do usuário a ser buscado.
 * @returns {Object} O usuário encontrado ou false se nenhum usuário for encontrado.
 */

export async function encontraUserId(userId) {
  const user = await userModel.findById(userId);

  if (!user) {
    console.log("Não foi encontrado nenhum utilizador com este ID");
    return false;
  }

  return user;
}
