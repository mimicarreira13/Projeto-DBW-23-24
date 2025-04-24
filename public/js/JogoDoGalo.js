let currentPlayer = "X";
let board = ["", "", "", "", "", "", "", "", ""];
let playerScore = 0; // Adicionamos a variável playerScore

// Obtenha a dificuldade do sessionStorage e verifique se é válido

// Correção para o erro de Nível de Dificuldade Inválido
let dificuldade = sessionStorage.getItem("nivel");
if (!["easy", "medium", "hard"].includes(dificuldade)) {
  console.error('Nível de dificuldade inválido, definindo para "easy".');
  dificuldade = "easy"; // Definindo um valor padrão
}

// Correção para o erro de checkWinner não Definido
function checkWinner() {
  const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let condition of winningConditions) {
    if (
      board[condition[0]] !== "" &&
      board[condition[0]] === board[condition[1]] &&
      board[condition[0]] === board[condition[2]] &&
      board[condition[1]] === board[condition[2]]
    ) {
      return true; // Retorna true se houver um vencedor
    }
  }

  return false; // Retorna false se não houver um vencedor
}

const scores = {
  easy: {
    win: 100,
    tie: 50,
  },
  medium: {
    win: 150,
    tie: 100,
  },
  hard: {
    win: 200,
    tie: 150,
  },
};

function cellClicked(index) {
  console.log("Célula clicada:", index);
  if (board[index] === "" && !checkWinner()) {
    console.log("Jogada válida.");
    board[index] = currentPlayer;
    document.getElementsByClassName("cell")[index].innerText = currentPlayer;
    if (!checkWinner() && !checkTie()) {
      console.log("Alternando jogador...");
      currentPlayer = currentPlayer === "X" ? "O" : "X";
      if (currentPlayer === "O") {
        console.log("Vez do computador.");
        computerMove();
      }
    } else if (checkWinner()) {
      console.log("Jogo finalizado. Vencedor:", currentPlayer);
      Swal.fire({
        text: `${currentPlayer} ganhou com uma pontuação de ${playerScore}!`,
        customClass: {
          confirmButton: "my-confirm-button",
          popup: "my-popup",
        },
      });
      updateScore("win", dificuldade);
      reset();
    } else {
      console.log("Jogo finalizado. Empate.");
      Swal.fire({
        text: `Empate! Pontuação: ${playerScore}`,
        customClass: {
          confirmButton: "my-confirm-button",
          popup: "my-popup",
        },
      });
      updateScore("tie", dificuldade);
      reset();
    }
  } else {
    console.log("Jogada inválida.");
  }
}
function reset() {
  currentPlayer = "X";
  board = ["", "", "", "", "", "", "", "", ""];
  let cells = document.getElementsByClassName("cell");
  for (let i = 0; i < cells.length; i++) {
    cells[i].innerText = "";
  }
}

function checkTie() {
  return board.every((cell) => cell !== "");
}

// Função para a jogada do computador
async function computerMove() {
  try {
    if (currentPlayer === "O") {
      let cellIndex;
      if (dificuldade === "easy") {
        cellIndex = computerMoveEasy(board);
      } else if (dificuldade === "medium") {
        cellIndex = computerMoveMedium(board, currentPlayer);
      } else if (dificuldade === "hard") {
        cellIndex = await computerMoveHard(board, currentPlayer);
      } else {
        console.error("Nível de dificuldade inválido.");
        return;
      }

      board[cellIndex] = "O";
      document.getElementsByClassName("cell")[cellIndex].innerText = "O";
      currentPlayer = "X";
    }
  } catch (error) {
    console.error("Erro ao processar a jogada do computador:", error);
  }
}

function computerMoveEasy(board) {
  let emptyCells = [];
  for (let i = 0; i < board.length; i++) {
    if (board[i] === "") {
      emptyCells.push(i);
    }
  }
  let randomIndex = Math.floor(Math.random() * emptyCells.length);
  return emptyCells[randomIndex];
}
function computerMoveMedium(board) {
  for (let i = 0; i < board.length; i++) {
    if (board[i] === "") {
      board[i] = "X"; // Simula uma jogada do jogador
      if (checkWinner("X", board)) {
        board[i] = ""; // Desfaz a jogada de teste
        return i; // Retorna o índice para bloquear a vitória do jogador
      }
      board[i] = ""; // Desfaz a jogada de teste
    }
  }
  return computerMoveEasy(board);
}
// Função para jogar no modo médio (bloqueio e vitória)
function computerMoveHard(board) {
  for (let i = 0; i < board.length; i++) {
    if (board[i] === "") {
      board[i] = "O";
      if (checkWinner("O", board)) {
        board[i] = "";
        return i;
      }
      board[i] = "";
    }
  }
  for (let i = 0; i < board.length; i++) {
    if (board[i] === "") {
      board[i] = "X";
      if (checkWinner("X", board)) {
        board[i] = "";
        return i;
      }
      board[i] = "";
    }
  }
  return computerMoveEasy(board);
}

function updateScore(result, difficulty) {
  const score = scores[difficulty]; // Obter as pontuações correspondentes ao nível de dificuldade

  if (result === "win" && currentPlayer === "X") {
    // Adicionar pontuação de vitória ao jogador atual
    playerScore += score.win;
    ScoreDB = score.win;
    Swal.fire({
      text: `Você ganhou! Sua pontuação: ${playerScore}`,
      customClass: {
        confirmButton: "my-confirm-button",
        popup: "my-popup",
      },
    });
  } else if (result === "win" && currentPlayer === "O") {
    Swal.fire({
      text: `Você perdeu! Sua pontuação: 0`,
      customClass: {
        confirmButton: "my-confirm-button",
        popup: "my-popup",
      },
    });
  } else if (result === "tie") {
    // Adicionar pontuação de empate ao jogador atual
    playerScore += score.tie;
    ScoreDB = score.tie;
    Swal.fire({
      text: `Empate! Sua pontuação: ${playerScore}`,
      customClass: {
        confirmButton: "my-confirm-button",
        popup: "my-popup",
      },
    });

    sessionStorage.setItem("playerScore", playerScore); // Atualizar a pontuação no sessionStorage
    Swal.fire({
      text: `Empate! Sua pontuação: ${playerScore}`,
      customClass: {
        confirmButton: "my-confirm-button",
        popup: "my-popup",
      },
    });
  }
  fetch("/JogoGalo/user/score", {
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
