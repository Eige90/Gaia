let currentInput = "";
let previousInput = "";
let operator = null;

const currentInputDisplay = document.getElementById("currentInput");
const previousInputDisplay = document.getElementById("previousInput");
const resultDisplay = document.getElementById("result");

function updateDisplay() {
    currentInputDisplay.textContent = currentInput || "0";
    previousInputDisplay.textContent = previousInput;
}

// Handle button clicks
document.querySelectorAll(".buttons .button").forEach(button => {
    button.addEventListener("click", function() {
        handleInput(this.textContent);
    });
});

// Handle keyboard input
document.addEventListener("keydown", function(event) {
    const key = event.key;

    if (key >= 0 && key <= 9) {
        handleInput(key);
    } else if (key === "Enter") {
        handleInput("=");
    } else if (key === "Backspace") {
        handleInput("C");
    } else if (key === "+") {
        handleInput("+");
    } else if (key === "-") {
        handleInput("-");
    } else if (key === "*") {
        handleInput("×");
    } else if (key === "/") {
        handleInput("÷");
    } else if (key === ".") {
        handleInput(".");
    } else if (key === "%") {
        handleInput("%");
    }
});

// Function to handle all inputs
function handleInput(value) {
    if (value === "C") {
        currentInput = "";
        previousInput = "";
        operator = null;
        resultDisplay.textContent = "= 0";
    } else if (value === "+/-") {
        currentInput = (parseFloat(currentInput) * -1).toString();
    } else if (value === "%") {
        currentInput = (parseFloat(currentInput) / 100).toString();
    } else if (value === "=") {
        if (operator && previousInput && currentInput) {
            const calculation = calculate(previousInput, currentInput, operator);
            resultDisplay.textContent = "= " + calculation;
            previousInput = "";
            operator = null;
            currentInput = calculation.toString();
        }
    } else if (["+", "-", "×", "÷"].includes(value)) {
        if (currentInput) {
            if (previousInput) {
                const calculation = calculate(previousInput, currentInput, operator);
                currentInput = calculation.toString();
            }
            operator = value;
            previousInput = currentInput;
            currentInput = "";
        }
    } else {
        currentInput += value;
    }
    updateDisplay();
}

function calculate(prev, curr, op) {
    const prevNum = parseFloat(prev);
    const currNum = parseFloat(curr);
    switch (op) {
        case "+":
            return prevNum + currNum;
        case "-":
            return prevNum - currNum;
        case "×":
            return prevNum * currNum;
        case "÷":
            return prevNum / currNum;
        default:
            return currNum;
    }
}

updateDisplay();
