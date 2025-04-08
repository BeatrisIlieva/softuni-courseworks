function solve(input) {
    const actions = {
        addTitle(string) {
            const name = string.split('addMovie ').filter(el => el)[0];

            return { name };
        },

        addDirector(string, obj) {
            const [name, director] = string.split(' directedBy ');

            const movie = findMovie(obj, name);
            movie && (movie.director = director);
        },

        addReleaseDate(string, obj) {
            const [name, date] = string.split(' onDate ');

            const movie = findMovie(obj, name);
            movie && (movie.date = date);
        }
    };

    function findMovie(obj, name) {
        return obj.find(movie => movie.name == name);
    }

    const result = input
        .reduce((acc, curr) => {
            curr.includes('addMovie') && acc.push(actions.addTitle(curr));

            curr.includes('directedBy') && actions.addDirector(curr, acc);

            curr.includes('onDate') && actions.addReleaseDate(curr, acc);

            return acc;
        }, [])
        .filter(movie => movie.date && movie.director);

    result.forEach(movie => console.log(JSON.stringify(movie)));
}

solve([
    'addMovie Fast and Furious',

    'addMovie Godfather',

    'Inception directedBy Christopher Nolan',

    'Godfather directedBy Francis Ford Coppola',

    'Godfather onDate 29.07.2018',

    'Fast and Furious onDate 30.07.2018',

    'Batman onDate 01.08.2018',

    'Fast and Furious directedBy Rob Cohen',
    'Fast and Furious2 directedBy Rob Cohen',
]);
