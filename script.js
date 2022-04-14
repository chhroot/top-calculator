
let operatorValue = '';
let operatorClickCount = 0;
let result = 0;

//functions for operate
let add = (a, b) => a + b;
let subtract = (a, b) => a - b;
let multiply = (a, b) => a * b;
let divide = (a, b) => {
    if (b == 0) {
        return 'oops';
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

//when number is pressed
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

//when operator, display result if operator is pressed the second time, and if third number is pressed set the firstnum as result
function getOperatorValue() {
    
    //if user clicks without any number the function won't run
    if(display.textContent == 0){
        return;
    }

    let attribute = this.getAttribute('value');
    operatorValue = attribute;
    decimal.disabled = false;
    
    if(operatorClickCount >= 1){
        display.textContent = result;
        firstNum = result;
        secondNum = ''; 
    } 
    else if(operatorValue != '' && display.textContent === String(result)){
        firstNum = result;
    }

}

//when equals is pressed , if firstnum and press -> display firstNum , secondNum and press -> display result, if both equal display result
function equalDisplayResult(){
    if(firstNum === display.textContent && firstNum !== secondNum){
        display.textContent = firstNum;   
    }

    else if(secondNum === display.textContent && firstNum !== secondNum){
        display.textContent = result;
        firstNum = '';
        secondNum = '';
        operatorClickCount = 0;
        operatorValue = '';
    }

    else if(firstNum === secondNum){
        display.textContent = result;
        operatorValue = '';
    }
}


//disabling decimal once its clicked
function getDecimal1(){

    let decimalVal ='.';
    
            if (display.textContent == '.'){
                display.textContent = '0.';
                firstNum = display.textContent;
            }
    
            decimal.disabled = true;

};

function getDecimal2(){

    let decimalVal ='.';
    
            if (display.textContent == '.'){
                display.textContent = '0.';
                secondNum = display.textContent;
            }
    
            decimal.disabled = true;   
};

//clearing screen , resets the values
function clearScreen(){
    firstNum = '';
    secondNum = '';
    operatorValue = '';
    operatorClickCount = 0
    result = 0;
    display.textContent = 0;
};

function deleteLastNum1(){

    let fixedNum = String(firstNum).slice(0, -1);



    if(fixedNum.length < 1){
        firstNum = 0;
        display.textContent = firstNum;
    }
    else if(fixedNum.includes('.') == false){
        decimal.disabled = false;
        firstNum = fixedNum;
        display.textContent = firstNum;
    }
    else{
        firstNum = fixedNum;
        display.textContent = firstNum;
    };
}

function deleteLastNum2(){

    let fixedNum2 = String(secondNum).slice(0, -1);
    if(fixedNum2.length < 1){
        secondNum = 0;
        display.textContent = secondNum;
    }
    else if(fixedNum2.includes('.') == false){
        decimal.disabled = false;
        secondNum = fixedNum2;
        display.textContent = secondNum;
    }
    else{
        secondNum = fixedNum2;
        display.textContent = secondNum;
    }
};


    

//event listeners
numbers.forEach((number) => {
    number.addEventListener('click', getNumValue)
});

operators.forEach((operator) => {
    operator.addEventListener('click', getOperatorValue)
});

equal.addEventListener('click', equalDisplayResult);

decimal.addEventListener("click", () =>
    {
        if(display.textContent == firstNum && operatorValue === ''){
            getDecimal1();
        }
        else if (display.textContent == secondNum && operatorValue != ''){
            getDecimal2();
        }
    });

clean.addEventListener('click', clearScreen);

del.addEventListener("click", () => {
    if(firstNum == display.textContent && operatorClickCount === 0){
        deleteLastNum1();
    }
    else if(secondNum == display.textContent && operatorClickCount >= 1){
        deleteLastNum2();
        operate();
    }

});