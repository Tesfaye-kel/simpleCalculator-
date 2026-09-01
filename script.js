const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');

function updateDisplay(value) {
  display.value = value;
}

buttons.forEach((button) => {
  button.addEventListener('click', () => {
    const value = button.dataset.value;
    const action = button.dataset.action;

    if (action === 'clear') {
      updateDisplay('0');
      return;
    }

    if (action === 'calculate') {
      try {
        if (!display.value || display.value === '0') {
          return;
        }

        const result = Function(`"use strict"; return (${display.value})`)();
        const roundedResult = Number.isInteger(result)
          ? result
          : Number(result.toFixed(10));

        updateDisplay(String(roundedResult));
      } catch (error) {
        updateDisplay('Error');
      }
      return;
    }

    if (display.value === 'Error') {
      updateDisplay(value);
      return;
    }

    if (display.value === '0' && value !== '.') {
      updateDisplay(value);
      return;
    }

    updateDisplay(display.value + value);
  });
});
