function solve(year) {
    const isDivisibleByFour = Number.isInteger(year / 4);
    const isDivisibleByFourHundred = Number.isInteger(year / 400);
    const isDivisibleByOneHundred = Number.isInteger(year / 100);
    
    console.log((isDivisibleByFour && !isDivisibleByOneHundred) || isDivisibleByFourHundred ? 'yes' : 'no');

}

solve(1900);
