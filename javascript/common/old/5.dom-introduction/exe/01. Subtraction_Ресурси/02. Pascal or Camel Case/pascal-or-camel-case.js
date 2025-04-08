function solve() {
    const textElement = document.getElementById('text');
    const namingConventionElement = document.getElementById('naming-convention');
    const resultElement = document.getElementById('result');

    const text = textElement.value;
    const namingConvention = namingConventionElement.value;

    function convertTextToPascalCase(text) {
        return text
            .toLowerCase()
            .split(' ')
            .map((word) => word[0].toUpperCase() + word.slice(1))
            .join('');
    }

    function convertTextToCamelCase(text) {
        const textToPascalCase = convertTextToPascalCase(text);
        const textToCamelCase = textToPascalCase[0].toLowerCase() + textToPascalCase.slice(1);

        return textToCamelCase;
    }

    const caseMapper = {
        'Camel Case': (text) => convertTextToCamelCase(text),
        'Pascal Case': (text) => convertTextToPascalCase(text),
    };

    if (!caseMapper[namingConvention]) {
        resultElement.textContent = 'Error!';
    } else {
        const result = caseMapper[namingConvention](text);

        resultElement.textContent = result;
    }
}
