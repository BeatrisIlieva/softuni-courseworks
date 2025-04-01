// Normal function that returns promise
function calculateMeaningOfLife() {
    if (Math.random() < 0.5) {
        throw new Error('Failed to calculate');
    }

    const result = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(42);
        }, 1000);
    });

    return result;
}

// Async function declaration
async function declarationSolve() {
    try {
        const meaningOfLife = await calculateMeaningOfLife();

        console.log(meaningOfLife);
    } catch (err) {
        console.log(err.message);
    }
}

declarationSolve();

// Async arrow function
const arrowSolve = async () => {};

// Async function expression
const expressionSolve = async function () {};


let a;
let b;