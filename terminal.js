const terminalBody = document.querySelector(".terminalBody");

function getTerminalInput() {
    return document.getElementById("campoTerminal");
}

function processCommand(event) {
    if (event.key === "Enter") {
        const terminalInput = getTerminalInput();
        const terminalInputLine = document.querySelector(".terminalInputLine");

        const inputValue = terminalInput.value.trim();
        if (inputValue === "") return;

        terminalInput.value = "";

        createTerminalElementLine(inputValue, terminalInputLine);

        if (!verifyValidCommand(inputValue)) {
            setTimeout(() => {
                const errorElement = createTerminalElementError(terminalInputLine);
                setTimeout(() => errorElement.remove(), 2000);
            }, 600);
        } else {
            checkCommand(inputValue, terminalInputLine);
        }
    }
}

function verifyValidCommand(command) {
    return ["whoami", "stack", "status", "help", "clear"].includes(command);
}

function createTerminalElementLine(inputValue, terminalInputLine) {
    const commandElement = document.createElement("li");
    commandElement.classList.add("terminalLine");
    commandElement.textContent = `> ${inputValue}`;
    terminalBody.insertBefore(commandElement, terminalInputLine);
}

function createTerminalElementError(terminalInputLine) {
    const errorElement = document.createElement("li");
    errorElement.classList.add("terminalResponse", "terminalError");
    errorElement.textContent = "Comando não reconhecido";
    terminalBody.insertBefore(errorElement, terminalInputLine);
    return errorElement;
}

function createTerminalElementResponse(terminalInputLine) {
    const liElement = document.createElement("li");
    liElement.classList.add("terminalResponse");
    terminalBody.insertBefore(liElement, terminalInputLine);
    return liElement;
}

function checkCommand(command, terminalInputLine) {
    let liResponse;

    if (command === "help") {
        ["status", "stack", "whoami", "clear"].forEach(cmd => {
            liResponse = createTerminalElementResponse(terminalInputLine);
            liResponse.textContent = cmd;
        });
        return;
    }

    if (command === "whoami") {
        liResponse = createTerminalElementResponse(terminalInputLine);
        liResponse.textContent = "Matheus Venceslau";
        return;
    }

    if (command === "stack") {
        ["HTML / CSS / JS", "C / JAVA / PHP", "PYTHON / SQL"].forEach(text => {
            liResponse = createTerminalElementResponse(terminalInputLine);
            liResponse.textContent = text;
        });
        return;
    }

    if (command === "status") {
        liResponse = createTerminalElementResponse(terminalInputLine);
        liResponse.textContent = "open_to_work = true";
        return;
    }

    if (command === "clear") {
        clearTerminal();
    }
}

function clearTerminal() {
    terminalBody.innerHTML = "";

    // prompt fixo (primeira linha)
    const initialLine = document.createElement("li");
    initialLine.classList.add("terminalLine");
    initialLine.textContent = "> matheus@dev:~$";
    terminalBody.appendChild(initialLine);

    // linha de input com ">"
    const terminalLine = document.createElement("li");
    terminalLine.classList.add("terminalInputLine");

    const prefix = document.createElement("span");
    prefix.textContent = "> ";

    const inputField = document.createElement("input");
    inputField.id = "campoTerminal";
    inputField.type = "text";
    inputField.placeholder = "'help' para lista de comandos";

    terminalLine.appendChild(prefix);
    terminalLine.appendChild(inputField);
    terminalBody.appendChild(terminalLine);

    inputField.addEventListener("keydown", processCommand);
    inputField.focus();
}

// inicialização
clearTerminal();