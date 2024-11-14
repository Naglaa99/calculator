// Select various elements from the DOM
const elements = {
  buttonsContainer: document.querySelector(".buttons"),
  calculateButtons: document.querySelectorAll("button"),
  historyDisplay: document.querySelector(".history"),
  displayOutput: document.querySelector(".display"),
  darkMode: document.getElementById("darkModeToggle"),
  darkModeIcon: document.querySelector("#darkModeToggle i"),
  calculateContainer: document.querySelector(".calculate-container"),
  darkModeButtons: document.querySelectorAll(".dark-button"),
  operationButtons: document.querySelectorAll(".operation-button"),
  firstRowOperations: document.querySelectorAll(".first-row-operations"),
  body: document.body,
};

/** 
 * @type {string[]} 
 * @description An array of special characters used in the calculator.
 */
const specialChars = ["+/-", "%", "/", "*", "-", "+", "="];

/** 
 * @type {string} 
 * @description Holds the current output value of the calculator.
 */
let output = "";

/**
 * Applies styles and event listeners to each button in the calculator.
 */
const applyButtonStyle = () => {
  elements.calculateButtons.forEach((button) => {
    button.classList.add(
      "w-[70px]",
      "h-[70px]",
      "text-[30px]",
      "font-poppins",
      "font-light",
      "rounded-[25px]",
      "text-center",
      "shadow-lg",
      "shadow-gray-400",
      "active:scale-[0.95]"
    );
    const value = button.dataset.value;

    value == "C" || value == "+/-" || value == "%"
      ? button.classList.add("bg-gray-300")
      : value == "/" ||
        value == "*" ||
        value == "+" ||
        value == "-" ||
        value == "="
      ? button.classList.add("bg-orange-400", "text-white")
      : button.classList.add("bg-white", "dark-button");
  });
};

/**
 * Adds click event listeners to each calculator button to handle user input.
 */
const addClickHandlersToButtons = () => {
  elements.calculateButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      handleCalculatorInput(event.target.dataset.value);
    });
  });
};

/**
 * Handles the calculator input based on the button value clicked by the user.
 * @param {string} buttonValue - The value of the button that was clicked.
 */
const handleCalculatorInput = (buttonValue) => {
  if (buttonValue === "=" && output !== "") {
    displayResult();
  } else if (buttonValue === "C") {
    clearCalculator();
    return;
  } else if (buttonValue === "+/-") {
    toggleSign();
  } else {
    appendToOutput(buttonValue);
  }

  elements.displayOutput.value = formatNumber(output);
};

/**
 * Calculates and displays the result in the calculator output.
 */
const displayResult = () => {
  const formattedOutput = output.replace(/(\d+)(?=(\d{3})+(?!\d))/g, "$1,");
  elements.historyDisplay.innerHTML = formattedOutput;
  output = calculateOutput(output);
  output = formatResult(output);
};

/**
 * Clears the calculator output and history.
 */
const clearCalculator = () => {
  output = "";
  elements.historyDisplay.innerHTML = "";
  elements.displayOutput.value = "0";
};

/**
 * Toggles the sign of the current output value.
 */
const toggleSign = () => {
  if (output) {
    output = (parseFloat(output) * -1).toString();
  }
};

/**
 * Appends a button value to the current output if it is a valid entry.
 * @param {string} buttonValue - The value of the button to append to the output.
 */
const appendToOutput = (buttonValue) => {
  if (output === "" && specialChars.includes(buttonValue)) return;
  output += buttonValue;
};

/**
 * Evaluates the current output string and returns the calculated result.
 * @param {string} output - The current calculator output to evaluate.
 * @returns {number} - The result of the calculation.
 */
const calculateOutput = (output) => {
  return eval(output.replace("%", "/100"));
};

/**
 * Formats the result to display up to three decimal places if it is not an integer.
 * @param {number} output - The calculated output to format.
 * @returns {string} - The formatted result as a string.
 */
const formatResult = (output) => {
  if (Number.isInteger(output)) return output.toString();
  else return parseFloat(output).toFixed(3);
};

/**
 * Formats a number to include commas as thousand separators.
 * @param {string|number} num - The number to format.
 * @returns {string} - The formatted number as a string.
 */
const formatNumber = (num) => {
  if (isNaN(num) || num === null) return num;
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

/**
 * Toggles dark mode styles for various elements in the calculator interface.
 * 
 * This function is triggered by a "click" event on the dark mode toggle button (`elements.darkMode`). 
 * It switches the application between light and dark themes by adding or removing specific CSS classes 
 * for the dark mode across various elements, including the body, icon, display, and buttons.
 * 
 * @event elements.darkMode#click
 */

elements.darkMode.addEventListener("click", () => {
  elements.body.classList.toggle("dark");

  elements.darkModeIcon.classList.toggle("bx-sun");
  elements.darkModeIcon.classList.toggle("bx-moon");

  elements.displayOutput.classList.toggle("displayOutputDark");
  elements.calculateContainer.classList.toggle("calculateContainerDark");
  elements.darkMode.classList.toggle("darkModeContainer");

  elements.darkModeButtons.forEach((style) => {
    style.classList.toggle("darkModeButtons");
  });

  elements.operationButtons.forEach((style) => {
    style.classList.toggle("operationButtonsDark");
  });

  elements.firstRowOperations.forEach((style) => {
    style.classList.toggle("firstRowOperationsDark");
  });
});

applyButtonStyle();
addClickHandlersToButtons();