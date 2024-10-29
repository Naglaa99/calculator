// Select various elements from the DOM
const elements = {
  buttonsContainer: document.querySelector(".buttons"),
  calculateButton: document.querySelectorAll("button"),
  historyDisplay: document.querySelector(".history"),
  displayOutput: document.querySelector(".display"),
  darkMode: document.getElementById("darkModeToggle"),
  darkModeIcon: document.querySelector("#darkModeToggle i"),
  calculateContainer: document.querySelector(".calculate-container"),
  darkModeButtons: document.querySelectorAll(".dark-button"),
  operationButtons: document.querySelectorAll(".operation-button"),
  firstRowOperations: document.querySelectorAll(".first-row-operations"),
};

const specialChars = ["%", "/", "*", "-", "+", "="];
let output = "";

// Function to apply styles and event listeners to each button
const applyButtonStyle = () => {
  elements.calculateButton.forEach((button) => {
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

    button.addEventListener("click", (event) => {
      calculate(event.target.dataset.value);
    });
  });
};

// Function to format numbers with thousands separators
const formatNumber = (num) => {
  if (isNaN(num) || num === null) return num;
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

// Function to perform calculations based on button values
const calculate = (buttonValue) => {
  elements.displayOutput.focus();

  if (buttonValue === "=" && output !== "") {
    const formattedOutput = output.replace(/(\d+)(?=(\d{3})+(?!\d))/g, "$1,");
    elements.historyDisplay.innerHTML = formattedOutput;
    output = eval(output.replace("%", "/100"));

    if (Number.isInteger(output)) {
      output = output.toString();
    } else {
      output = parseFloat(output).toFixed(3);
    }
  } else if (buttonValue === "C") {
    output = "";
    elements.historyDisplay.innerHTML = "";
  }
  else if (buttonValue === "+/-") {
    if (output) {
      output = (parseFloat(output) * -1).toString();
    }
  } else {
    if (output === "" && specialChars.includes(buttonValue)) return;
    output += buttonValue;
  }

  elements.displayOutput.value = formatNumber(output);
};

// Event listener for dark mode toggle button
elements.darkMode.addEventListener("click", () => {
  const isDarkMode = document.documentElement.classList.toggle("dark");

  elements.darkModeIcon.classList.replace(
    isDarkMode ? "bx-sun" : "bx-moon",
    isDarkMode ? "bx-moon" : "bx-sun"
  );

  elements.calculateContainer.classList.replace(
    isDarkMode ? "bg-slate-50" : "bg-[#33363D]",
    isDarkMode ? "bg-[#33363D]" : "bg-slate-50"
  );

  elements.displayOutput.classList.toggle("text-white", isDarkMode);

  elements.darkMode.classList.toggle("bg-gray-600", isDarkMode);
  elements.darkMode.classList.toggle("bg-slate-200", !isDarkMode);
  elements.darkMode.classList.toggle("text-slate-300", isDarkMode);

  elements.darkModeButtons.forEach((button) => {
    button.classList.toggle("bg-gray-700", isDarkMode);
    button.classList.toggle("bg-white", !isDarkMode);
    button.classList.toggle("text-white", isDarkMode);
    button.classList.toggle("shadow-gray-800", isDarkMode);
  });

  elements.operationButtons.forEach((button) => {
    button.classList.toggle("shadow-gray-800", isDarkMode);
  });

  elements.firstRowOperations.forEach((button) => {
    button.classList.toggle("bg-gray-500", isDarkMode);
    button.classList.toggle("text-white", isDarkMode);
  });

});

applyButtonStyle();
