function solve(text){
    const pattern = /[A-Z][a-z]*/g;

    const matches = [...text.matchAll(pattern)]

    const result = [];

    for(let match of matches){
        result.push(match[0])
    }

    console.log(result.join(", "));
}

solve('SplitMeIfYouCanHaHaYouCantOrYouCan')