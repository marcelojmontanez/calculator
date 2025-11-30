const MULTIPLICATION_SYMBOL = '×';
const DIVISION_SYMBOL = '÷';


let leftOperand = '';
let currentOperator = '';
let shouldResetScreen = false;

const screenLast = document.querySelector('.screen-last');
const screenCurrent = document.querySelector('.screen-current');
const clearButton = document.getElementById('clearBtn');
const deleteButton = document.getElementById('deleteBtn');
const numberButtons = document.querySelectorAll('[data-number]');
const operatorButtons = document.querySelectorAll('[data-operator]');
const pointButton = document.getElementById('pointBtn');
const equalsButton = document.getElementById('equalsBtn');

window.addEventListener('keydown', handleKeyboardInput);
clearButton.addEventListener('click', () => clear());
deleteButton.addEventListener('click', () => deleteNumber());
numberButtons.forEach(button => 
    button.addEventListener('click', () => appendNumber(button.textContent))
);
operatorButtons.forEach(button =>
    button.addEventListener('click', () => setOperator(button.textContent))
);
pointButton.addEventListener('click', appendPoint);
equalsButton.addEventListener('click', evaluate);

function handleKeyboardInput(e) {
    const btn = document.querySelector(`[data-key~="${e.key}"]`);
    if (!btn) return;
    flash(btn);
    btn.click();
}

function flash(btn) {
    btn.classList.add('keyflash');
    setTimeout(() => btn.classList.remove('keyflash'), 100);
}

function resetScreen() {
    screenCurrent.textContent = '';
    shouldResetScreen = false;
}

function clear() {
    screenCurrent.textContent = '0';
    screenLast.textContent = '';
    leftOperand = '';
    currentOperator = '';
}

function appendNumber(number) {
    if (screenCurrent.textContent === '0' || shouldResetScreen) resetScreen();
    screenCurrent.textContent += number;
}

function deleteNumber() {
    screenCurrent.textContent = screenCurrent.textContent.slice(0, -1);
    if (screenCurrent.textContent === '') screenCurrent.textContent = '0';
}

function setOperator(op) {
    if (currentOperator !== '') evaluate();
    currentOperator = op;
    leftOperand = screenCurrent.textContent;
    screenLast.textContent = `${leftOperand} ${currentOperator}`;
    shouldResetScreen = true;
}

function appendPoint() {
    if (screenCurrent.textContent.includes('.')) return;
    if (shouldResetScreen) resetScreen();
    if (screenCurrent.textContent === '') screenCurrent.textContent = '0';
    screenCurrent.textContent += '.';
}

function evaluate() {
    if (currentOperator === '' || shouldResetScreen) return;
    const rightOperand = screenCurrent.textContent;
    if (currentOperator === DIVISION_SYMBOL && rightOperand === '0') {
        alert("You can't divide by 0.");
        return;
    }
    screenLast.textContent = 
        `${leftOperand} ${currentOperator} ${rightOperand} =`;
    screenCurrent.textContent = 
        operate(currentOperator, leftOperand, rightOperand);
    currentOperator = '';
    shouldResetScreen = true;
}

function add(a, b) { return a + b; }
function subtract(a, b) { return a - b; }
function multiply(a, b) { return a * b; }
function divide(a, b) { return a / b; }

function operate(op, a, b) {
    let ops = {
        '+': add,
        '-': subtract,
        [MULTIPLICATION_SYMBOL]: multiply,
        [DIVISION_SYMBOL]: divide
    }
    return ops[op](Number(a), Number(b));
}