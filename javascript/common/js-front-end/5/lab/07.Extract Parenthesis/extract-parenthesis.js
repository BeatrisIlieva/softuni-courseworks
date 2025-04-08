function extract(content) {
    const text = document.getElementById(content).textContent;

    const pattern = /(?<=\()[^)]+(?=\))/g;

    const matches = text.matchAll(pattern);

    return [...matches].map(match => match[0]).join('; ');
}
