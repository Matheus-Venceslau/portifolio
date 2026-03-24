// Obtendo elementos do DOM
const counterElement = document.getElementById("a");
const terminalInput = document.getElementById("campoTerminal");
const terminalBody = document.querySelector(".terminalBody");
const terminalInputLine = document.querySelector(".terminalInputLine");

// Variáveis de controle de contagem e tempo
let counter = 0;
let currentTime = 100;
const timeIncrement = 1000;

// Atualiza o contador exibido na tela
function updateCounterDisplay() {
  counterElement.textContent = `${counter}+`;
}

// Função responsável pela execução da animação de incremento
function executeIncrementAnimation(finalValue) {
  counter++;
  if (counter <= finalValue) {
    updateCounterDisplay();
    currentTime += timeIncrement;

    setTimeout(() => {
      executeIncrementAnimation(finalValue);
    }, currentTime);
  }
}

// Controle de execução da animação ao rolar a página
let animationExecuted = false;
window.addEventListener("scroll", () => {
  if (window.scrollY > 100 && !animationExecuted) {
    animationExecuted = true;
    setTimeout(() => {
      executeIncrementAnimation(4);
    }, currentTime);
  }
});

// Função de processamento do comando digitado no terminal
function processCommand(event) {
  if (event.key === "Enter") {
    const inputValue = terminalInput.value.trim();
    if (inputValue === "") return;

    terminalInput.value = "";

    // Exibe o comando digitado
    const commandElement = document.createElement("li");
    commandElement.classList.add("terminalLine");
    commandElement.textContent = `> ${inputValue}`;
    terminalBody.insertBefore(commandElement, terminalInputLine);

    // Simula resposta de erro
    setTimeout(() => {
      const errorElement = document.createElement("li");
      errorElement.classList.add("terminalResponse", "terminalError");
      errorElement.textContent = "Comando não reconhecido";
      terminalBody.insertBefore(errorElement, terminalInputLine);

      setTimeout(() => {
        errorElement.remove();
      }, 2000);
    }, 600);
  }
}

// Adiciona o listener para o evento de pressionamento da tecla "Enter"
terminalInput.addEventListener("keydown", processCommand);