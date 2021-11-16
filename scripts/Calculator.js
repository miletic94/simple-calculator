import {display, numberButtons, operationButtons, deleteButton, resetButton} from "./constants.js"
import {calculate} from "./calculate.js"
import {equalsButton} from "./constants.js"

class Calculator {
    #collection
    constructor() {
        this.#collection = []
        this.possibleOperations=["add", "substract", "multiply", "divide"]
        }
    get collection() {
        return this.#collection
    } 

    isPossibleOperation(value) {
        return !!this.possibleOperations.find(e => e === value)
    }
    
    isNumber(string) {
        return !isNaN(string)
    }

    addToCollection(value) {
        // MOVE TO CALCULATE
        if(this.#collection.length === 0 && 
          (value!=="add" && 
          value!=="substract" && 
          value!=="multiply" &&
          value!=="divide")) {
            this.collection.push("add")
          }
        let lastElement = this.collection[this.#collection.length-1]
        if(
            this.isNumber(lastElement) && (this.isNumber(value))
          ) {
                this.#collection.pop()

                if(lastElement === "0") {
                    this.#collection.push(value)
                } else {
                    this.#collection.push(lastElement+value)
                }
              
          } else if(value === ".") {
            if(lastElement && lastElement.includes(".")) return 
            if(lastElement) {
                this.#collection.pop()
                this.#collection.push(lastElement+value)
            }
          }
          else if(
            this.isPossibleOperation(lastElement) && this.isPossibleOperation(value)   
          ) {   
              this.#collection.pop()
              this.#collection.push(value)
          } else {
              this.#collection.push(value)
          }
        console.log("collection", this.#collection);
        this.updateDisplay()
    }

    deleteFromCollection() {
        const lastElement = this.#collection[this.#collection.length -1]

        this.#collection.pop()

        if(!isNaN(lastElement) && lastElement.length > 1) {
            this.#collection.push(lastElement.slice(0, -1))
        } 

        this.updateDisplay()
    }

    resetCollection() {
        this.#collection = []
        display.innerText = 0
    }

    updateDisplay() {
        let displayText = this.#collection.map(element => {
            switch(element) {
                case "add":
                    return "+"
                case "substract":
                    return "-"
                case "multiply":
                    return "*"
                case "divide":
                    return "/"
                default:
                    return element
            }
        })

        if(displayText[0] === "+") {
            displayText.shift()
        }
        if(displayText.length===0) {
            displayText = ["0"]
        }
        displayText = displayText.join("")

        display.innerText = displayText
    }
    calculate() {
        return calculate(this.#collection)
    }
}


const calculator = new Calculator

numberButtons.forEach(numberButton => {
    numberButton.addEventListener("click", () => {
        calculator.addToCollection(numberButton.dataset.number)
    })
})

operationButtons.forEach(operationButton => {
    operationButton.addEventListener("click", () => {
        console.log(operationButton.dataset.operation)
        calculator.addToCollection(operationButton.dataset.operation)
    })
})

deleteButton.addEventListener("click", () => {
    calculator.deleteFromCollection()
})

resetButton.addEventListener("click", () => {
    calculator.resetCollection()
})

equalsButton.addEventListener("click", ()=> {
    const result = calculator.calculate()
    calculator.resetCollection()
    calculator.addToCollection(result)
})

