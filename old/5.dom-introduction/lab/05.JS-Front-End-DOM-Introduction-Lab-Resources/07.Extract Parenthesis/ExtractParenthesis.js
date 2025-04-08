function extract(content) {
    const paragraphElement = document.getElementById(content);

    const paragraphContent = paragraphElement.textContent;

    const pattern = /\(([A-Za-z ]+)\)/g;

    const matches = [...paragraphContent.matchAll(pattern)];

    return matches.map((match) => match[1]).join('; ');
}
