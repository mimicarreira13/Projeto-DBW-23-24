
let tempoDeJogo = 0;

const informacao = {
contaTempo: document.querySelector('.tempo'),
gameContainer : document.querySelector('.game'),
pontuacao :document.querySelector('.pontuacao')
}

const estadoJogo = {
    comecou: false,
    flippedCards: 0,
    totalMov:0,
    get tempoInicio() {
    return tempoDeJogo;
    },
    pontuacao : 0,
    loop: null
}

/**
 * Embaralha um array de emojis usando o algoritmo Fisher-Yates (também conhecido como algoritmo de Knuth).
 * @param {Array} emojis - O array de emojis a ser embaralhado.
 * @returns {Array} O array de emojis embaralhado.
 */

function baralha(emojis) {
    const shuffledEmojis = emojis.slice();

    // baralha os emojis usando o algoritmo Fisher-Yates (também conhecido como algoritmo de Knuth)
    for (let i = shuffledEmojis.length - 1; i > 0; i--) {
        // Gera um índice aleatório entre 0 e i
        const j = Math.floor(Math.random() * (i + 1));
        // Troca os emojis nas posições i e j
        [shuffledEmojis[i], shuffledEmojis[j]] = [shuffledEmojis[j], shuffledEmojis[i]];
    }

    return shuffledEmojis;
}

/**
 * Seleciona um número específico de emojis aleatórios de um array de emojis.
 * @param {Array} emojis - O array de emojis a ser selecionado.
 * @param {number} numeroCartas - O número de emojis a ser selecionado.
 * @returns {Array} O array de emojis selecionados.
 */

function dimensoes(emojis,numeroCartas){
    const random =[]; //array vazio

    for(let i = 0; i < numeroCartas; i++){

        //gera um número aleatório entre 0 e o tamanho do array emojis
        const randomIndex = Math.floor(Math.random()* emojis.length);

        //adiciona o emoji selecionado ao array random
        random.push(emojis[randomIndex]);
        //remove o emoji selecionado do array emojis
        emojis.splice(randomIndex,1);
    }

    return random;
}

console.log("Elemento .game:", informacao.gameContainer);

function geraJogo(numeroCartas) {
    // Verifica se o elemento .game existe antes de tentar limpar seu conteúdo
    if (informacao.gameContainer) {
        // Limpa o conteúdo anterior do jogo
        informacao.gameContainer.innerHTML = '';
    } else {
        console.error('Elemento .game não encontrado.');
        return;
    }

    const openBoxes = [];

    // Array de emojis

    const emojis = ["💕", "😁", "🤦‍♀️", "🎶", "🤣", "😒", "🤦‍♂️", "❤️", "😊",
                    "🎵","🤷‍♀️","💖","😎","🥰","😥","😶‍🌫️","😔","😭","🤪","🤬","🤢","🫨","🦊","🐸"
                    ];
    const emojisSelecionados = dimensoes(emojis, numeroCartas); // CORREÇÃO AQUI
    const emojisDuplicados = emojisSelecionados.concat(emojisSelecionados); // Duplica os emojis

    const emojisEmbaralhados = baralha(emojisDuplicados);

    // Cria e adiciona as caixas de emojis ao jogo
    emojisEmbaralhados.forEach(emoji => {
        const box = document.createElement('div');
        // Adiciona a classe 'item' e o emoji ao elemento box
        box.className = 'item';
        box.textContent = emoji;

        // Adiciona um evento de clique a cada caixa
        box.addEventListener('click', function() {
            // Verifica se o jogo já começou
            if (!estadoJogo.comecou) {
                estadoJogo.comecou = true;
                comecarJogo();
            }

            // Verifica se a caixa clicada não está aberta nem combinada
            if (!this.classList.contains('boxOpen') && !this.classList.contains('boxMatch')) {
                this.classList.add('boxOpen');
                openBoxes.push(this);

                // Verifica se há duas caixas abertas
                if (openBoxes.length === 2) {
                    // Compara os emojis das duas caixas abertas
                    if (openBoxes[0].innerHTML === openBoxes[1].innerHTML) {
                        // Se forem iguais, adiciona a classe 'boxMatch'
                        openBoxes.forEach(box => box.classList.add('boxMatch'));
                        //adiciona a pontuação cada vez que encontra a carta
                        estadoJogo.pontuacao += 50;
                       
                        // Esvazia o array de caixas abertas
                        openBoxes.length = 0;
                        // Verifica se todas as cartas foram combinadas
                        if (document.querySelectorAll('.boxMatch').length === emojisDuplicados.length) {
                            updateScore(estadoJogo.pontuacao);
                            Swal.fire({
                                title: "Bom Trabalho!",
                                text: "Encontraste todas as cartas!",
                                icon: "success"
                             });
                        }
                        } else {
                        // Se forem diferentes, espera um tempo e remove a classe 'boxOpen' das caixas abertas
                        setTimeout(() => {
                            // Adiciona a classe 'boxOpen' a todas as caixas que não foram combinadas
                            openBoxes.forEach(box => {
                                if (!box.classList.contains('boxMatch')) {
                                    box.classList.remove('boxOpen');
                                }
                            });
                            // Esvazia o array de caixas abertas
                            openBoxes.length = 0;
                        }, 650);
                    }
                }
            }
        });
        // Adiciona a caixa ao elemento .game
        informacao.gameContainer.appendChild(box);
    });
} 


function comecarJogo() {
    // Inicia o tempo de jogo
    tempoDeJogo = 300;

    // Atualiza o tempo de jogo e a pontuação a cada segundo
            estadoJogo.loop = setInterval(() => {
                if(tempoDeJogo > 0){
                    //diminui o tempo de jogo
                    tempoDeJogo--;
                }else{
                    //para o jogo
                    clearInterval(estadoJogo.loop);
                    alert("ACABOU O TEMPO!")
                    estadoJogo.comecou = false;
                }
                // Atualiza o tempo de jogo e a pontuação
                informacao.contaTempo.innerHTML = `TEMPO RESTANTE : ${estadoJogo.tempoInicio} SEG `;
                informacao.pontuacao.innerHTML = `PONTUAÇÃO : ${estadoJogo.pontuacao}`;
            
            }, 1000);
            
}



function updateScore(ScoreDB){

fetch("/JogoMemoria/user/score", {
    // Envia uma requisição POST para atualizar o score do usuário
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    // Envia o novo score como JSON
    body: JSON.stringify({ newScore: ScoreDB }), // Send the updated score
  })
  // Converte a resposta em JSON
    .then((response) => response.json())
    .then((data) => {
      if (data.message === "Score updated successfully") {
        // Handle success - update UI, show message, etc.
      } else {
        // Handle failure - show error message, etc.
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });

}
