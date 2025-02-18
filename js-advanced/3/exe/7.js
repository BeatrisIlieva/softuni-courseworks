function solve(input) {
    function cityFactory(town, latitude, longitude) {
        return {
            Town: town,
            Latitude: latitude,
            Longitude: longitude,
        };
    }

    function extractTextFromLeft(text) {
        return text.slice(2);
    }

    function extractTextFromRight(text) {
        const textLength = text.length;
        const redundantCharsCount = 2;
        const endIndex = textLength - redundantCharsCount;

        return text.slice(0, endIndex);
    }

    let [_, ...citiesData] = input;

    citiesData = citiesData.map((city, index) => {
        let [town, latitude, longitude] = city.split(' | ');

        town = extractTextFromLeft(town);
        latitude = Number(Number(latitude).toFixed(2));
        longitude = Number(Number(extractTextFromRight(longitude)).toFixed(2));

        return cityFactory(town, latitude, longitude);
    });

    console.log(JSON.stringify(citiesData));
}

solve([
    '| Town | Latitude | Longitude |',
    '| Sofia | 42.696552 | 23.32601 |',
    '| Beijing | 39.913818 | 116.363625 |',
]);
