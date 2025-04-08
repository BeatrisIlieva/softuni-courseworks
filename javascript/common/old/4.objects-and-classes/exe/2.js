function solve(data) {
    data.map((row) => row.split(' | '))
        .map(([town, latitudeAsStr, longitudeAsStr]) => ({
            town,
            latitude: Number(latitudeAsStr).toFixed(2),
            longitude: Number(longitudeAsStr).toFixed(2),
        }))
        .forEach((el) => console.log(el));
}

solve(['Sofia | 42.696552 | 23.32601', 'Beijing | 39.913818 | 116.363625']);
