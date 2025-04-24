
const letterContainer = document.getElementById("letter-container");
const optionsContainer = document.getElementById("options-container");
const userInputSection = document.getElementById("user-input-section");
const newGameContainer = document.getElementById("new-game-container");
const newGameButton = document.getElementById("new-game-button");
const canvas = document.getElementById("canvas");
const resultText = document.getElementById("result-text");


let dificuldade = sessionStorage.getItem("nivel");

let score = 0;
let timer;

let categorias = ["frutas", "animais", "paises"];

let options = {
  frutas: [],
  animais: [],
  paises: [],
};

let winCount = 0;
let count = 0;

let chosenWord = "";

/**
 * Pede à API para gerar uma lista de palavras de uma categoria específica.
 * @param {string} categoria - A categoria de palavras a ser gerada.
 * @returns {Promise<Array<string>>} - Uma lista de palavras geradas pela API.
 */
async function GeradorPalavrasAPI(categoria) {
  try {
    const response = await fetch("/api/gerar-palavras", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ categoria }),
    });

    const data = await response.json();

    if (data.palavras) {
      return data.palavras;
    } else {
      throw new Error("Sem palavras recebidas.");
    }
  } catch (error) {
    console.error("Erro ao gerar palavras:", error);
    return [];
  }
}

/*const data = await response.json(); // Converte a resposta em JSON
const str = data.choices[0].message.content; // Obtém a string de palavras geradas pela API
const sem_acentos = str.normalize("NFD").replace(/[\u0300-\u036f]/g, ""); // Remove acentos
const words = sem_acentos.split(",").map((word) => word.trim()); // Separa as palavras por vírgulas e remove espaços em branco
return words; // Retorna a lista de palavras geradas*/

let optionsInitialized = false; // Variável para verificar se as opções foram inicializadas

/**
 * Iinicializa as palavras de cada categoria.
 * @returns {Promise<void>} - Uma promessa que resolve quando as palavras de cada categoria são inicializadas.
 */
async function initializeOptions() {
  // Função que inicializa as opções
  if (!optionsInitialized) {
    // Verifica se as opções já foram inicializadas
    options.frutas = await GeradorPalavrasAPI(categorias[0]); // Gera palavras para a categoria de frutas
    options.animais = await GeradorPalavrasAPI(categorias[1]); // Gera palavras para a categoria de animais
    options.paises = await GeradorPalavrasAPI(categorias[2]); // Gera palavras para a categoria de países
    optionsInitialized = true; // Define a variável optionsInitialized como true
  }
}

document.getElementById("loadingScreen").style.display = "block"; // Mostra a tela de carregamento

// Chama a função initializeOptions
initializeOptions().then(() => {
  // Quando a função terminar
  // Esconde a tela de carregamento depois que a função terminar
  document.getElementById("loadingScreen").style.display = "none"; // Esconde o ecra de loading
  document.getElementById("options-container").style.display = "block"; // Mostra o container de opções
  document.getElementById("canvas").style.display = "block"; // Mostra o canvas
});

/**
 * Pede à API para gerar uma dica para uma palavra específica.
 * @param {string} palavra - A palavra para a qual a dica será gerada.
 * @returns {Promise<Object>} - Uma promessa que resolve com o popup da dica gerada pela API.
 */
async function GeradorDicasAPI(palavra) {
  try {
    const response = await fetch("/api/gerar-dica", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ palavra }),
    });

    const data = await response.json();

    if (data.dica) {
      const popup = Swal.fire({
        text: data.dica,
        customClass: {
          confirmButton: "my-confirm-button",
          popup: "my-popup",
        },
      });
      return popup;
    } else {
      throw new Error("Dica não recebida.");
    }
  } catch (error) {
    console.error("Erro ao gerar dica:", error);
    Swal.fire({
      text: "Erro ao obter dica. Tenta novamente.",
      icon: "error",
    });
  }
}

/**
 * Mostre as opções de categoria disponíveis e permita que o jogador escolha uma categoria.
 */
async function displayOptions() {
  // Função que exibe as opções
  optionsContainer.innerHTML += `<h3> Selecione uma Categoria </h3>`; // Adiciona um título ao container de opções
  let buttonCon = document.createElement("div"); // Cria um novo elemento div
  for (let value in options) {
    // Para cada valor nas opções
    buttonCon.innerHTML += `<button class="options" onclick="generateWord('${value}')">${value}</button>`; // Adiciona um botão com o valor da opção
  }
  initializeOptions(); // Inicializa as opções
  optionsContainer.appendChild(buttonCon); // Adiciona o container de botões ao container de opções
}

/**
 * A função 'blocker' desabilita todos os botões de opções e letras,
 * limpa o timer, esconde o botão 'DicaButton' e a categoria,
 * e mostra o container para um novo jogo.
 */
function blocker() {
  // Função que bloqueia o jogo
  let optionsButtons = document.querySelectorAll(".options"); // Seleciona todos os botões de opções
  let letterButtons = document.querySelectorAll(".letters"); // Seleciona todos os botões de letras
  let DicaButton = document.getElementById("DicaButton"); // Seleciona o botão de dica
  let categoria = document.getElementById("t_categoria"); // Seleciona o título da categoria
  let Score = document.getElementById("score"); //  Seleciona o score

  optionsButtons.forEach((button) => {
    // Para cada botão de opção
    button.disabled = true; // Desabilita o botão
  });

  letterButtons.forEach((button) => {
    // Para cada botão de letra
    button.disabled = true; // Desabilita o botão
  });

  if (timer) {
    // Se o timer estiver definido
    clearInterval(timer); // Limpa o timer
    let timerElement = document.getElementById("timer"); // Seleciona o elemento do timer
    timerElement.innerText = ""; // Limpa o texto do timer
  }

  DicaButton.classList.add("hide"); // Esconde o botão de dica
  categoria.classList.add("hide"); // Esconde o título da categoria
  Score.classList.add("hide"); // Esconde o score

  newGameContainer.classList.remove("hide");
}

/**
 * A função 'generateWord' inicializa as opções, exibe o placar, inicia um timer se a dificuldade for média ou difícil,
 * desabilita e ativa botões de opções específicos, atualiza o título da categoria, torna visível o botão 'DicaButton',
 * limpa o container de opções, remove a classe 'hide' do container de letras, seleciona uma palavra aleatória
 * da categoria escolhida e atualiza a seção de entrada do usuário com a palavra escolhida representada por traços.
 *
 * @async
 * @param {string} optionValue - O valor da opção escolhida pelo usuário.
 */
async function generateWord(optionValue) {
  // Função que gera a palavra
  await initializeOptions(); // Inicializa as opções
  document.getElementById("score").style.display = "block";
  // Inicie o timer se o nível de dificuldade for médio ou difícil
  if (dificuldade === "media" || dificuldade === "dificil") {
    // Se a dificuldade for média ou difícil
    let timeLimit; // Tempo limite
    if (dificuldade === "media") {
      // Se a dificuldade for média
      timeLimit = 90; // Tempo limite para o nível médio
    } else if (dificuldade === "dificil") {
      // Se a dificuldade for difícil
      timeLimit = 90; // Tempo limite para o nivel dificil
    }
    let timerElement = document.getElementById("timer"); // Supondo que você tenha um elemento para exibir o timer

    timer = setInterval(() => {
      // Inicia o timer
      if (timeLimit <= 0) {
        //  Se o tempo acabar
        resultText.innerHTML = `<h2 class="lose-msg"> Perdeste!!</h2><p> O tempo acabou. A palavra era <span>${chosenWord}</span></p>`;
        clearInterval(timer); // Limpa o timer
        blocker(); // Chama a função blocker
      } else {
        timerElement.innerText = `Tempo restante: ${timeLimit} segundos`; // Atualiza o texto do timer
        timeLimit--; // Decrementa o tempo restante
      }
    }, 1000); // A cada 1 segundo
  }
  let optionsButtons = document.querySelectorAll(".options"); // Seleciona todos os botões de opções

  optionsButtons.forEach((button) => {
    // Para cada botão de opção
    if (button.innerText.toLowerCase() === optionValue) {
      // Se o texto do botão for igual ao valor da opção
      button.classList.add("active"); // Adiciona a classe 'active' ao botão
    }
    button.disabled = true; // Desabilita o botão
  });

  let title = document.getElementById("t_categoria"); // Seleciona o título da categoria
  title.innerText = `Categoria: ${optionValue}`; // Atualiza o título da categoria
  title.classList.remove("hide"); // Remove a classe 'hide' do título da categoria

  document.getElementById("DicaButton").classList.remove("hide"); // Para fazer aparecer o botão de dica

  optionsContainer.innerHTML = ""; // Limpa o container de opções

  letterContainer.classList.remove("hide"); // Mostra o container de letras
  userInputSection.innerText = ""; // Limpa a seção de entrada do utilizador

  let optionArray = options[optionValue]; // Array de palavras da categoria escolhida

  chosenWord = optionArray[Math.floor(Math.random() * optionArray.length)]; // Seleciona uma palavra aleatória da categoria escolhida
  chosenWord = chosenWord.toLocaleUpperCase(); // Atualiza a seção de entrada do utilizador com a palavra escolhida para letras maiúsculas

  let displayItem = chosenWord.replace(
    // Substitui cada letra da palavra escolhida por traços
    /./g,
    `<span class="dashes">__&nbsp;</span>`
  ); // Exibe a palavra escolhida representada por traços

  userInputSection.innerHTML = displayItem; // Atualiza a seção de entrada do utilizador com a palavra escolhida representada por traços
}

/**
 * A função 'updateScore' atualiza o placar com base na dificuldade do jogo.
 * Para a dificuldade 'facil', adiciona 10 ao placar.
 * Para a dificuldade 'media', adiciona 20 ao placar.
 * Para a dificuldade 'dificil', adiciona 30 ao placar.
 * Atualiza o elemento de placar na página e guarda o placar na sessionStorage.
 */
function updateScore() {
  // Função que atualiza o score
  let scoreElement = document.getElementById("score"); // Elemento que exibe o score
  switch (dificuldade) {
    case "facil":
      score += 50; // Adiciona 50 ao score
      ScoreDB = 50; // Guarda o score numa variavel que depois vai para a base de dados
      break;
    case "media":
      score += 60; // Adiciona 60 ao score;
      ScoreDB = 60; // Guarda o score numa variavel que depois vai para a base de dados
      break;
    case "dificil":
      score += 70; // Adiciona 70 ao score
      ScoreDB = 70; //  Guarda o score numa variavel que depois vai para a base de dados
      break;
    default:
      break;
  }
  scoreElement.innerHTML = "Score: " + score; // Atualiza o texto do elemento score

  fetch("/JogoForca/user/score", {
    // Envia uma requisição POST para atualizar o score do usuário
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ newScore: ScoreDB }), // Send the updated score
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.message === "Score updated successfully") {
        console.log("Sucesso ao dar update na DB!");
      } else {
        console.log("Erro ao dar update na DB!");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

/**
 * A função 'initializer' inicializa o jogo. Ela define 'winCount' e 'count' para 0,
 * desabilita o botão 'DicaButton' se a dificuldade for 'dificil', adiciona um evento de clique ao 'DicaButton'
 * que chama a função 'GeradorDicasAPI', limpa vários elementos HTML, cria botões de letras e adiciona eventos de clique a eles,
 * que verificam se a letra escolhida está na palavra escolhida e atualizam a interface do usuário de acordo,
 * e finalmente chama as funções 'displayOptions' e 'initialDrawing' para exibir as opções e desenhar o boneco inicial.
 */
function initializer() {
  // Função que inicializa o jogo
  winCount = 0; // Define o contador de vitórias como 0
  count = 0; // Define o contador como 0
  if (dificuldade === "dificil") {
    // Se a dificuldade for difícil
    DicaButton.disabled = true; // Desabilita o botão de dica
  }

  DicaButton.addEventListener("click", function () {
    // Adiciona um evento de clique ao botão de dica
    GeradorDicasAPI(chosenWord); // Chama a função GeradorDicasAPI para a palavra escolhida
  });
  userInputSection.innerHTML = ""; // Limpa a seção de entrada do utilizador
  optionsContainer.innerHTML = ""; // Limpa o container de opções
  letterContainer.classList.add("hide"); // Esconde o container de letras
  newGameContainer.classList.add("hide"); // Esconde o container de um novo jogo
  letterContainer.innerHTML = ""; // Limpa o container de letras

  for (let i = 65; i < 91; i++) {
    // Cria botões de letras
    let button = document.createElement("button"); // Cria um novo botão
    button.classList.add("letters"); // Adiciona a classe 'letters' ao botão

    button.innerText = String.fromCharCode(i); // Define o texto do botão como uma letra do alfabeto

    button.addEventListener("click", () => {
      // Adiciona um evento de clique ao botão
      let charArray = chosenWord.split(""); // Divide a palavra escolhida numa matriz de caracteres
      let dashes = document.getElementsByClassName("dashes"); // Seleciona todos os elementos com a classe 'dashes'

      if (charArray.includes(button.innerText)) {
        // Se a letra escolhida estiver na palavra escolhida
        charArray.forEach((char, index) => {
          // Para cada caractere e índice na matriz de caracteres
          if (char === button.innerText) {
            // Se o caractere for igual à letra escolhida
            dashes[index].innerText = char; //  Atualiza o texto do elemento 'dashes' no índice com o caractere
            winCount += 1; // Incrementa o contador de vitórias

            if (winCount === charArray.length) {
              resultText.innerHTML = `<h2 class="win-msg"> Acertaste!!</h2><p>A palavra era <span>${chosenWord}</span></p>`;
              updateScore(); // Atualiza o score
              blocker(); // Chama a função blocker
            }
          }
        });
      } else {
        count += 1; // Incrementa o contador
        drawMan(count); // Desenha uma parte do boneco

        if (count == 6) {
          // Se o contador for igual a 6 (bracos, pernas, cabeca... do boneco)
          resultText.innerHTML = `<h2 class="lose-msg"> Perdeste!!</h2><p> A palavra era <span>${chosenWord}</span></p>`;
          blocker(); // Chama a função blocker
        }
      }
      button.disabled = true; // Desabilita o botão
    });
    letterContainer.append(button); // Adiciona o botão ao container de letras
  }

  displayOptions(); // Chama a função displayOptions

  let { initialDrawing } = canvasCreator(); //  Cria um contexto de desenho 2D em um elemento canvas
  initialDrawing(); // Desenha a estrutura inicial do jogo da forca
}

/**
 * A função 'canvasCreator' cria um contexto de desenho 2D em um elemento canvas, define algumas propriedades de desenho,
 * define várias funções de desenho para desenhar partes específicas de um boneco, e uma função 'initialDrawing' para desenhar
 * a estrutura inicial do jogo da forca. Retorna um objeto contendo todas essas funções de desenho.
 *
 * @returns {Object} Um objeto contendo funções de desenho para a estrutura inicial e várias partes do boneco.
 */
function canvasCreator() {
  // Função que cria o canvas
  let context = canvas.getContext("2d"); // Cria um contexto de desenho 2D em um elemento canvas
  context.beginPath(); // Inicia um novo caminho de desenho
  context.strokeStyle = "#000"; // Define a cor do traço
  context.lineWidth = 2; // Define a largura da linha

  const drawLine = (fromX, fromY, toX, toY) => {
    // Função que desenha uma linha
    context.moveTo(fromX, fromY); // Move o ponto de início do caminho para as coordenadas fornecidas
    context.lineTo(toX, toY); //  Adiciona um novo ponto e cria uma linha para as coordenadas fornecidas
    context.stroke(); // Desenha o caminho
  };

  const head = () => {
    // Função que desenha a cabeça
    context.beginPath(); // Inicia um novo caminho de desenho
    context.arc(70, 30, 10, 0, Math.PI * 2, true); // Desenha um arco
    context.stroke(); //  Desenha o caminho
  };

  const body = () => {
    // Função que desenha o corpo
    drawLine(70, 40, 70, 80); // Desenha uma linha
  };

  const leftArm = () => {
    // Função que desenha o braço esquerdo
    drawLine(70, 50, 50, 60); // Desenha uma linha
  };

  const rightArm = () => {
    // Função que desenha o braço direito
    drawLine(70, 50, 90, 70); // Desenha uma linha
  };

  const leftLeg = () => {
    // Função que desenha a perna esquerda
    drawLine(70, 80, 50, 110); // Desenha uma linha
  };

  const rightLeg = () => {
    // Função que desenha a perna direita
    drawLine(70, 80, 90, 110); // Desenha uma linha
  };

  const initialDrawing = () => {
    // Função que desenha a estrutura inicial do jogo da forca
    context.clearRect(0, 0, context.canvas.width, context.canvas.height); // Limpa o canvas

    drawLine(10, 130, 130, 130); // Desenha uma linha
    drawLine(10, 10, 10, 131); // Desenha uma linha
    drawLine(10, 10, 70, 10); // Desenha uma linha
    drawLine(70, 10, 70, 20); //
  };

  return {
    // Retorna um objeto com as funções de desenho
    initialDrawing,
    head,
    body,
    leftArm,
    rightArm,
    leftLeg,
    rightLeg,
  };
}

/**
 * A função 'drawMan' desenha partes do boneco no jogo da forca, com base no valor de 'count'.
 * Ela usa as funções de desenho retornadas pela função 'canvasCreator'.
 * Para 'count' 1, desenha a cabeça.
 * Para 'count' 2, desenha o corpo.
 * Para 'count' 3, desenha o braço esquerdo.
 * Para 'count' 4, desenha o braço direito.
 * Para 'count' 5, desenha a perna esquerda.
 * Para 'count' 6, desenha a perna direita.
 *
 * @param {number} count - O número de partes do boneco a desenhar.
 */
function drawMan(count) {
  // Função que desenha o boneco
  let { head, body, leftArm, rightArm, leftLeg, rightLeg } = canvasCreator(); // Cria um contexto de desenho 2D em um elemento canvas

  switch (
    count // Desenha uma parte do boneco com base no contador
  ) {
    case 1:
      head();
      break;
    case 2:
      body();
      break;
    case 3:
      leftArm();
      break;
    case 4:
      rightArm();
      break;
    case 5:
      leftLeg();
      break;
    case 6:
      rightLeg();
      break;
    default:
      break;
  }
}

newGameButton.addEventListener("click", initializer); // Adiciona um evento de clique ao botão de novo jogo
window.onload = initializer; //
