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

document.querySelectorAll(".buttons .button").forEach(button => {
    button.addEventListener("click", function() {
        const value = this.textContent;

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
    });
});

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
