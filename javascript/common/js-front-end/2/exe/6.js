function solve(text) {
    const pattern = /(?<=\s)#{1}[A-Za-z]{1,}(?=[\s,\.]|$)/g;

    const matches = [...text.matchAll(pattern)];

    const result = [];

    matches.forEach(match => result.push(match[0].slice(1)));

    result.forEach(word => console.log(word));
}

solve('Nowadays everyone uses # to tag a #special word in #socialMedia');
