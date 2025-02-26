function riskyOperation(){
    if (Math.random() < 0.5){
        throw new Error('Task failed')
    }

    return 'Task successfull'
}

const result = riskyOperation()
console.log(console.log(result.message));