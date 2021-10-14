class Calculator {
    constructor(currentOperandTextElement) {
        this.currentOperandTextElement = currentOperandTextElement
        this.clear()
    }

    clear() {
        this.currentOperand = ''
        this.previousOperand = ''
        this.operation = undefined
      }
    
    updateDisplay() {
        if(this.currentOperand !== "" && !(this.currentOperand instanceof Promise)) {
            this.currentOperandTextElement.innerText = this.currentOperand
        } else {
            this.currentOperandTextElement.innerText = this.previousOperand
        }
    }
    appendNumber(number) {
        if(number === "." && this.currentOperand.includes(".")) return
        this.currentOperand = this.currentOperand.toString() + number.toString();
    }
    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1)
    }

    compute() {
        let computation
        let prev = parseFloat(this.previousOperand)
        let cur = parseFloat(this.currentOperand)
        if(isNaN(prev) || isNaN(cur)) return

        switch (this.operation) {
            case "+":
                computation = prev + cur
                break;
            case "-":
                computation = prev - cur
                break
            case "x":
                computation = prev * cur
                break
            case "/":
                computation = prev / cur
                break
            default:
                computation = cur
                break;
        }
        this.currentOperand = computation
        this.operation = undefined
        this.previousOperand = ""
    }
    chooseOperation(operation) {
        if(this.currentOperand === "") return

        if(this.previousOperand !== "") {
            this.compute()
        }
        console.log(this.previousOperand)
        console.log(operation)
        console.log(this.currentOperand)

        this.operation = operation
        this.previousOperand = this.currentOperand
        this.currentOperand = ""
    }
}


const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const resetButton = document.querySelector("[data-reset]")

const currentOperandTextElement = document.querySelector('[data-current-operand]')

const calculator = new Calculator(currentOperandTextElement)

numberButtons.forEach(button => {
    button.addEventListener("click", () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})
operationButtons.forEach(button => {
    button.addEventListener("click", () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})
resetButton.addEventListener("click", () => {
    calculator.clear()
    calculator.updateDisplay()
})

equalsButton.addEventListener("click", () => {
    calculator.compute()
    calculator.updateDisplay()
})

deleteButton.addEventListener("click", () => {
    calculator.delete()
    calculator.updateDisplay()
})