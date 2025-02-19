function extract(elementId) {
    const contentElement = document.getElementById(elementId);
    const contentText = contentElement.textContent;

    const pattern = /\(([^\(\)]+)\)/g;

    const matches = Array.from(contentText.matchAll(pattern));

    return matches.map(match => match[1]).join('; ');
}
