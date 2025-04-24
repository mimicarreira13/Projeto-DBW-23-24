/**
 * @param {string} pagina - URL da página para onde o utilizador será redirecionado.
 */
function selectOptions(pagina) {
  var buttons = document.querySelectorAll(".button1, .button2, .button3");
  var button4 = document.querySelector(".button4");
  // Add event listener to each button
  buttons.forEach(function (button) {
    button.addEventListener("click", function () {
      // Remove 'active' class from all buttons
      buttons.forEach(function (btn) {
        btn.classList.remove("active");
      });

      // Add 'active' class to the clicked button
      this.classList.add("active");
    });
  });

  // Add event listener to button4
  button4.addEventListener("click", function (event) {
    // Check if any button has 'active' class
    var isActive = Array.from(buttons).some(function (button) {
      return button.classList.contains("active");
    });

    // If no button has 'active' class, prevent action
    if (!isActive) {
      event.preventDefault();
      Swal.fire({
        title: "É necessário escolher uma dificuldade!",
        customClass: {
          confirmButton: "my-confirm-button",
          popup: "my-popup",
        },
      });
    } else {
      window.location.href = pagina;
    }
  });
}

/**
 * @param {number} numCartas - Número de cartas a serem utilizadas no jogo.
 */
function escolherDificuldade(numCartas) {
  sessionStorage.setItem("numCartas", numCartas);
}

/**
 *
 * @param {String} nivel - Nível de dificuldade escolhido pelo utilizador.
 */
function DificuldadeForca(nivel) {
  sessionStorage.setItem("nivel", nivel);
}
/**
 * Função para definir o nível de dificuldade do jogo do galo e armazená-lo no sessionStorage.
 * @param {string} nivel - O nível de dificuldade selecionado.
 */
function DificuldadeGalo(nivel) {
  if (["easy", "medium", "hard"].includes(nivel)) {
    sessionStorage.setItem("nivel", nivel);
    console.log(`Nível de dificuldade definido como: ${nivel}`);
  }
}