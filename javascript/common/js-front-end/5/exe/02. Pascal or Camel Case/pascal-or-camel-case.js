function solve() {
    const input = document.getElementById('text').value;
    const namingConvention = document.getElementById('naming-convention').value;
    const resultElement = document.getElementById('result');

    const conventionMapper = {
        'Camel Case': textArray => {
            return textArray
                .map((word, index) => {
                    word = transformWordToLowerCase(word);

                    if (index > 0) {
                        word = capitalizeWordFirstLetter(word);
                    }

                    return word;
                })
                .join('');
        },
        'Pascal Case': textArray => {
            return textArray
                .map(word => {
                    word = transformWordToLowerCase(word);
                    word = capitalizeWordFirstLetter(word);

                    return word;
                })
                .join('');
        }
    };

    const textArray = input.split(' ');

    const existingNamingConvention = conventionMapper[namingConvention];

    const result = existingNamingConvention
        ? existingNamingConvention(textArray)
        : 'Error!';


    resultElement.textContent = result;

    function transformWordToLowerCase(word) {
        return word.toLowerCase();
    }

    function capitalizeWordFirstLetter(word) {
        return word.charAt(0).toUpperCase() + word.slice(1);
    }
}
