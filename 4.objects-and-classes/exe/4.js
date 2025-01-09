function solve(input) {
    const addMovieCommand = 'addMovie';
    const directedByCommand = 'directedBy';
    const onDateCommand = 'onDate';

    input
        .reduce((acc, curr) => {
            if (curr.includes(addMovieCommand)) {
                acc.push({
                    name: curr.substring(addMovieCommand.length).trim(),
                });
            } else if (curr.includes(onDateCommand)) {
                [title, releaseDate] = curr.split(` ${onDateCommand} `);

                const existentMovie = acc.find((movie) => movie.name === title.trim());

                if (existentMovie) {
                    existentMovie.date = releaseDate.trim();
                }
            } else if (curr.includes(directedByCommand)) {
                [title, movieDirector] = curr.split(` ${directedByCommand} `);

                const existentMovie = acc.find((movie) => movie.name === title.trim());

                if (existentMovie) {
                    const commandIndex = curr.indexOf(directedByCommand) + directedByCommand.length;
                    const movieDirector = curr.slice(commandIndex);

                    existentMovie.director = movieDirector.trim();
                }
            }

            return acc;
        }, [])
        .filter((el) => el.director && el.date)
        .forEach((el) => console.log(JSON.stringify(el)));
}

solve([
    'addMovie The Avengers',

    'addMovie Superman',

    'The Avengers directedBy Anthony Russo',

    'The Avengers onDate 30.07.2010',

    'Captain America onDate 30.07.2010',

    'Captain America directedBy Joe Russo',
]);
