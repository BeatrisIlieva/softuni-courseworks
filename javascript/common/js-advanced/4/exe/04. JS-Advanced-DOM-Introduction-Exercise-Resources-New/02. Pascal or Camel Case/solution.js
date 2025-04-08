function solve() {
    const textElement = document.getElementById('text');
    const namingConventionElement = document.getElementById('naming-convention');
    const resultElement = document.getElementById('result');

    function getWordsAsArray(text) {
        return text.split(' ');
    }

    function getWordsToLowerCase(arrayOfWords) {
        return arrayOfWords.map(word => word.toLowerCase());
    }

    function getCapitalizedWords(arrayOfWords) {
        return arrayOfWords.map(word => word.charAt(0).toUpperCase() + word.slice(1));
    }

    function getWordWithLowerCaseFirstLetter(word) {
        return word.charAt(0).toLowerCase() + word.slice(1);
    }

    const namingConventionsMapper = {
        'Pascal Case': text => {
            let arrayOfWords = getWordsAsArray(text);
            arrayOfWords = getWordsToLowerCase(arrayOfWords);
            arrayOfWords = getCapitalizedWords(arrayOfWords);

            return arrayOfWords;
        },
        'Camel Case': text => {
            let arrayOfWords = getWordsAsArray(text);
            arrayOfWords = getWordsToLowerCase(arrayOfWords);
            arrayOfWords = getCapitalizedWords(arrayOfWords);
            const firstWord = getWordWithLowerCaseFirstLetter(arrayOfWords[0]);
            arrayOfWords[0] = firstWord;

            return arrayOfWords;
        },
    };

    const namingConvention = namingConventionElement.value;
    const selectedNamingConvention = namingConventionsMapper[namingConvention];
    let result;

    if (selectedNamingConvention) {
        result = selectedNamingConvention(textElement.value).join('');
        console.log(result);
    } else {
        result = 'Error!';
    }

    resultElement.textContent = result;
}
