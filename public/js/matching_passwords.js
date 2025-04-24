document.querySelector("form").addEventListener("submit", function (event) {
  var password = document.getElementById("password").value;
  var passwordConfirmation = document.getElementById(
    "password_confirmation"
  ).value;

  if (password !== passwordConfirmation) {
    document.getElementById("password_error").textContent =
      "A palavra passe não é a mesma!.";
    event.preventDefault(); // Prevent form from submitting
  } else {
    document.getElementById("password_error").textContent = "";
  }
});

function mostraPassword() {
  var password = document.getElementById("password");
  var password_confirmation = document.getElementById("password_confirmation");
  if (password.type === "password") {
    password.type = "text";
  } else {
    password.type = "password";
  }
  if (password_confirmation.type === "password") {
    password_confirmation.type = "text";
  } else {
    password_confirmation.type = "password";
  }
}

const senhaInput = document.getElementById("password");
const senhaInputConf = document.getElementById("password_confirmation");
const mostrarSenhaBtn = document.getElementById("mostrarSenha");
const mostrarSenhaConf = document.getElementById("mostrarSenhaConf");

mostrarSenhaBtn.addEventListener("click", () => {
  if (senhaInput.type === "password") {
    senhaInput.type = "text";
    mostrarSenhaBtn.innerHTML = '<i class="fa-regular fa-eye"></i>';
  } else {
    senhaInput.type = "password";
    mostrarSenhaBtn.innerHTML = '<i class="fa-regular fa-eye-slash"></i>';
  }
});

mostrarSenhaConf.addEventListener("click", () => {
  if (senhaInputConf.type === "password") {
    senhaInputConf.type = "text";
    mostrarSenhaConf.innerHTML = '<i class="fa-regular fa-eye"></i>';
  } else {
    senhaInputConf.type = "password";
    mostrarSenhaBtn.innerHTML = '<i class="fa-regular fa-eye-slash"></i>';
  }
});
