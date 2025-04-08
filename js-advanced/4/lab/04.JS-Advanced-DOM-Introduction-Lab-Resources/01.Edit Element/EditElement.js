// function editElement(element, match, replacer) {
//     const elementTextContent = element.textContent;
//     const updatedTextContent = elementTextContent.replaceAll(match, replacer);

//     element.textContent = updatedTextContent;
// }

function editElement(element, match, replacer) {
    let elementTextContent = element.textContent;

    while (elementTextContent.includes(match)) {
        elementTextContent = elementTextContent.replace(match, replacer);
    }

    element.textContent = elementTextContent;
}
