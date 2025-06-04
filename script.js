const inputFields = document.querySelectorAll(".input");
const errorMessages = document.querySelectorAll(".error-message");
const tipButtons = document.querySelectorAll(".tip.btn");
const customInput = document.getElementById("custom");
const resetButton = document.getElementById("resetButton");
const form = document.getElementById("calculator");

let selectedTip = 0;
let pctToDec = 0;

// Input validation
inputFields.forEach((input, index) => {
  input.addEventListener("input", () => {
    const value = input.value.trim();
    const num = parseFloat(value);

    if (value === "") {
      // Clear error if empty
      errorMessages[index].textContent = "";
      input.classList.remove('out-of-range');
    } else if (isNaN(num) || num <= 0 || input.validity.rangeUnderflow) {
      // Show error for 0
      errorMessages[index].textContent = "Can't be zero";
      input.classList.add("out-of-range");
    } else {
      // Valid number input
      errorMessages[index].textContent = "";
      input.classList.remove("out-of-range");
    }
    calculations();
  });
});

// Tip buttons
tipButtons.forEach((button) => {
  button.addEventListener("click", () => {
    tipButtons.forEach(btn => {
      btn.classList.remove('active');
      btn.disabled = false;
    });

    selectedTip = parseFloat(button.dataset.tip);
    pctToDec = selectedTip / 100; // Convert percentages to decimals

    button.classList.add("active");

    customInput.value = "";
    customInput.disabled = false;
    customInput.classList.remove('out-of-range');

    calculations();
  });
});

// Custom tip input
['input', 'focus'].forEach(event => {
  customInput.addEventListener(event, () => {
    tipButtons.forEach(btn => btn.classList.remove('active'));

    selectedTip = 0;
    pctToDec = 0;
    
    calculations();
  });
});

// Tip amount and total calculations
function calculations() {
  const bill = parseFloat(document.getElementById("bill").value) || 0;
  const people = parseFloat(document.getElementById("number-of-people").value) || 0;
  const customValue = parseFloat(customInput.value);
  let tip = 0;
  
  if (!isNaN(customValue) && customValue > 0 && customInput.value.trim() !== "") {
    tip = customValue;
  } else if (pctToDec > 0) {
    tip = pctToDec * bill;
  }

  const total = bill + tip;
  const tipPerPerson = people > 0 ? tip / people : 0;
  const totalPerPerson = people > 0 ? total / people : 0;
  
  document.getElementById("tip-amount").value = (Math.floor(tipPerPerson * 100) / 100).toFixed(2);
  document.getElementById("total-amount").value = totalPerPerson.toFixed(2);
}

// Reset form
resetButton.addEventListener("click", () => {
  form.reset();

  document.getElementById("tip-amount").value = "0.00";
  document.getElementById("total-amount").value = "0.00";

  selectedTip = 0;
  pctToDec = 0;

  customInput.disabled = false;

  tipButtons.forEach((btn) => {
    btn.classList.remove("active");
    btn.disabled = false;
  });

  inputFields.forEach((input) => input.classList.remove("out-of-range"));
  errorMessages.forEach((error) => (error.textContent = ""));
});