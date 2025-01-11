function solve(input) {
    // shelves = {id : genre}
    const shelves = {};
    // books = [{bookTitle, bookAuthor, bookGenre}, ...]
    const books = [];

    function createBook(bookTitle, bookAuthor, bookGenre) {
        return {
            bookTitle,
            bookAuthor,
            bookGenre,
        };
    }

    function createShelve(id, genre) {
        if (!shelves[id]) {
            shelves[id] = genre;
        }
    }

    const addGenreCommand = ' -> ';
    const addBookCommand = ': ';

    input.forEach((row) => {
        if (row.includes(addGenreCommand)) {
            const [id, genre] = row.split(addGenreCommand);

            createShelve(id, genre);
        } else if (row.includes(addBookCommand)) {
            const [title, details] = row.split(addBookCommand);
            const [author, genre] = details.split(', ');

            const shelfWithGenreExists = Object.entries(shelves).find(
                ([_, shelfGenre]) => shelfGenre === genre
            );

            if (shelfWithGenreExists) {
                const createdBook = createBook(title, author, genre);

                books.push(createdBook);
            }
        }
    });

    function findBooksPerShelf(genre) {
        return books.filter((book) => book.bookGenre === genre);
    }

    function printSortedShelves() {
        const sortedShelves = Object.entries(shelves).sort((a, b) => {
            return findBooksPerShelf(b[1]).length - findBooksPerShelf(a[1]).length;
        });

        sortedShelves.forEach(([id, genre]) => {
            const booksPerShelf = findBooksPerShelf(genre);

            const count = booksPerShelf.length;
            console.log(`${id} ${genre}: ${count}`);

            const sortedBooksPerShelf = booksPerShelf.sort((a, b) =>
                a.bookTitle.localeCompare(b.bookTitle)
            );

            sortedBooksPerShelf.forEach((book) =>
                console.log(`--> ${book.bookTitle}: ${book.bookAuthor}`)
            );
        });
    }

    printSortedShelves();
}

solve([
    '1 -> history',
    '1 -> action',
    'Death in Time: Criss Bell, mystery',
    '2 -> mystery',
    '3 -> sci-fi',
    'Child of Silver: Bruce Rich, mystery',
    'Hurting Secrets: Dustin Bolt, action',
    'Future of Dawn: Aiden Rose, sci-fi',
    'Lions and Rats: Gabe Roads, history',
    '2 -> romance',
    'Effect of the Void: Shay B, romance',
    'Losing Dreams: Gail Starr, sci-fi',
    'Name of Earth: Jo Bell, sci-fi',
    'Pilots of Stone: Brook Jay, history',
]);
