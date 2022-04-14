
let operatorValue = '';
let operatorClickCount = 0;
let result = 0;

//functions for operate
let add = (a, b) => a + b;
let subtract = (a, b) => a - b;
let multiply = (a, b) => a * b;
let divide = (a, b) => {
    if (b == 0) {
        return 'nope';
    }
    else {
        return a / b;
    }
}


function operate() {
    let mathOne = parseFloat(firstNum);
    let mathTwo = parseFloat(secondNum);

    switch (operatorValue) {
        case '*':
            result = multiply(mathOne, mathTwo);
            result = (parseFloat(result.toPrecision(12)))
            operatorClickCount++;
            break;

        case '+':
            result = add(mathOne, mathTwo);
            result = (parseFloat(result.toPrecision(12)))
            operatorClickCount++;
            break;

        case '-':
            result = subtract(mathOne, mathTwo);
            result = (parseFloat(result.toPrecision(12)))
            operatorClickCount++;
            break;

        case '/':
            result = divide(mathOne, mathTwo);
            result = (parseFloat(result.toPrecision(12)))
            operatorClickCount++;
            break;
        
        default:
            operatorValue = '';
    }
}

//selectors
const display = document.querySelector('#display h1')
const operators = document.querySelectorAll('.operator');
const numbers = document.querySelectorAll('.number');
const clean = document.getElementById('clear-btn');
const equal = document.getElementById('equal');
const decimal = document.getElementById('decimal');
const del = document.getElementById('delete');


let firstNum = '';
let secondNum = '';

function getNumValue() {

    if (operatorValue == '') {
        let atribute = this.getAttribute('value');
        firstNum = firstNum + atribute;
        display.textContent = firstNum;
    }

    else {
        let atribute = this.getAttribute('value');
        secondNum = secondNum + atribute;
        display.textContent = secondNum;
    }

    operate();
}

function getOperatorValue() {
    let attribute = this.getAttribute('value');
    operatorValue = attribute;
    
    if(operatorClickCount >= 1){
        display.textContent = result;
        firstNum = result;
        secondNum = ''; 
    } 
    else if(operatorValue != "" && display.textContent === String(result)){
        firstNum = result;
    }


}


//event listeners
numbers.forEach((number) => {
    number.addEventListener('click', getNumValue)
});

operators.forEach((operator) => {
    operator.addEventListener('click', getOperatorValue)
});