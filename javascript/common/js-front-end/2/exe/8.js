function solve(text) {
    const pattern = /[A-Z]{1}[a-z]*/g;

    const matches = [...text.matchAll(pattern)].map(match => match[0]).join(', ');

    console.log(matches);
}

solve('SplitMeIfYouCanHaHaYouCantOrYouCanI');
