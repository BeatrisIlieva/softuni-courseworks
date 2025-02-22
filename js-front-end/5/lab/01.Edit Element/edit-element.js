function editElement(element, match, replacer) {
    let text = element.textContent;

    text = text.replaceAll(match, replacer);

    element.textContent = text;
}
