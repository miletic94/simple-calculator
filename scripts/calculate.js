
const operations = {
    "add":        (a) => (b) => a + b,
    "multiply":   (a) => (b) => a * b,
    "substract":  (a) => (b) => b - a,
    "divide":     (a) => (b) => b / a
}

const compose = (...functions) => args => functions.reduceRight((arg, fn) => fn(arg), args);

const transform = (collection, index = 0, objectsCollection=[]) => {
    if(collection.length === index) return  objectsCollection
    objectsCollection.push({
        "operation": operations[collection[index]],
        "operand": Number(collection[index+1])
    })
    transform(collection, index+=2, objectsCollection)
    return objectsCollection
}

const reverse = (collection) => {
    return collection.reverse()
}

const toChunks = (collection, index = 0, primary = [], secondary=[], chunks = []) => {

    if(index === collection.length) { 
        chunks.push(secondary)
        return chunks
    }

    if(collection[index].operation === operations["add"] || 
       collection[index].operation === operations["substract"]) {
        if(primary.length !== 0) {
            primary.push(collection[index])
            chunks.push(primary)
        } else {
            secondary.push(collection[index])
        }
        toChunks(collection, index+1, primary=[], secondary, chunks)
    }
    if(collection[index].operation === operations["multiply"] || 
       collection[index].operation === operations["divide"]) {
        primary.push(collection[index])
        toChunks(collection, index+1, primary, secondary, chunks)
    }
    
    return chunks
}

const chunksToOperations = (chunks) => {
    return chunks.map(chunk => {
        return chunk.map(element => {
            return element.operation(element.operand)
        })
    })
}



const applyOperations = (operationGroups) => {
    return operationGroups.map(operationGroup => {
        return compose(...operationGroup)(0)
    })
}

const reduce = (caluclations) => {
    return caluclations.reduce((a, b) => a + b)
} 




// const calculate = (collection) => _.compose(
//     reduce,
//     applyOperations,
//     chunksToOperations, 
//     toChunks,
//     reverse,
//     transform)(collection)

export const calculate = (collection) => {
    return reduce(applyOperations(chunksToOperations(toChunks(reverse(transform(collection))))))
}

