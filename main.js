class Calculator {
    constructor(output1TextElement ,output2TextElement){
        this.output1TextElement = output1TextElement
        this.output2TextElement = output2TextElement
        this.clear()
    }

    clear(){
        this.output1 = ''
        this.output2 = ''
        // this.operator = ''
        this.operator = undefined
    }
    delete(){
        this.output2 = this.output2.toString().slice(0, -1)
    }
    appendNumber(number){
        if (number === '.' && this.output2.includes('.')) return
        this.output2 = this.output2.toString() + number.toString()
        
    }
    squareRoot(squareOperator){

    }
    chooseOperator(operator){
        if(this.output2 === '')return
        if (this.output1 !== ''){
            this.compute()
        }
        this.operator = operator
        this.output1 =  this.output2
        this.output2 = ''
    }
    compute(){
        let computation
        const out1 = parseFloat(this.output1)
        const out2 = parseFloat(this.output2)
        const out = this.output1.toString().slice(1)
        if (isNaN(out1) || isNaN(out2)) return
        switch (this.operator) {
            case '+':
                computation = out1 + out2
                break;
            case '-':
                computation = out1 - out2
                break;
            case '×':
                computation = out1 * out2
                break;
            case '÷':
                computation = out1 / out2
                break;
            case '^':
                computation = out1 ** out2
                break;
                // Since it wasn't working i removed the case of √ and did it seperately with if statement
            // case '√':
            //     computation = Math.sqrt(parseFloat(out * 1))
            //     break;
        
            case '%':
                computation =  (out1 / 100) * out2
                break;
        
            default:
                return
        }
        this.output1 = ''
        this.output2 = computation
        this.operator = undefined
        
    }
    
    // updateDisplay(){
    //   this.output1TextElement.innerHtml = this.output1 
    // }
    displayUpdate(){
        // if (this.operator = '√') {
        //     this.output2TextElement.innerText += this.getDisplayNumber(this.output2)
        // }
        this.output2TextElement.innerText = this.getDisplayNumber(this.output2)
        if (this.operator != null) {
            if (this.operator == '√'){
                this.output1TextElement.innerText = 
                `${this.operator}${this.getDisplayNumber(this.output1)}`
                // Now the symbol cannot be added if theirs no number but once the number exists the symbol is added
                // at the left hand side of the number and it is moved to the upper display
            } else {
                this.output1TextElement.innerText = 
                `${this.getDisplayNumber(this.output1)}${this.operator}`
            }
            

        }else{
            this.output1TextElement.innerText = ''

        }
        
    }
    getDisplayNumber(num){
        const stringNumber = num.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]
        let integerDisplay
        if (isNaN(integerDigits)) {
          integerDisplay = ''
        } else {
          integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
        }
        if (decimalDigits != null) {
          return `${integerDisplay}.${decimalDigits}`
        } else {
          return integerDisplay
        }
      }
}
const numberButtons = document.querySelectorAll('[data-number]')
const operatorButtons = document.querySelectorAll('[data-operator]')
const equalButton = document.querySelector('[data-equalTo]')
const output2TextElement = document.querySelector('[data-output2]')
const output1TextElement = document.querySelector('[data-output1]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-clear-all]')
const squareRootButton = document.querySelector('[data-operator-squareRoot]')

const calculator = new Calculator(output1TextElement, output2TextElement);

numberButtons.forEach(button => {
    button.addEventListener('click',() => {
        calculator.appendNumber(button.innerText)
        // calculator.updateDisplay()
        calculator.displayUpdate()
    })
})
operatorButtons.forEach(button => {
    button.addEventListener('click',(e) => {
        calculator.chooseOperator(button.innerText)
        // calculator.updateDisplay()
        calculator.displayUpdate()
    })
})
equalButton.addEventListener('click', () => {
    // since the √ is'nt working i did a statement that checks if its exist in the upper display then do my own
    // calculation. First i sliced it out to remove the √ symbol before performing the operation on the display
    if (output1TextElement.textContent.includes('√')){
        let numbers = output1TextElement.textContent.toString().slice(1);
        let calculate = Math.sqrt(numbers);
        output2TextElement.textContent = calculate;
    } else {
        calculator.compute()
        // calculator.updateDisplay()
        calculator.displayUpdate()
    };
    
  })
  allClearButton.addEventListener('click', () => {
    calculator.clear()
    // calculator.updateDisplay()
    calculator.displayUpdate()
  })
  
  deleteButton.addEventListener('click', () => {
    calculator.delete()
    // calculator.updateDisplay()
    calculator.displayUpdate()

  })
  