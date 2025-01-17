const url = 'https://swapi.dev/api';

// Fetch returns a promise
fetch(`${url}/people/1`)
    .then((response) => response.json())
    .then((result) => console.log(result))
    .catch((error) => console.log(error));

// practice server

const booksUrl = 'http://localhost:3030/jsonstore/collections/books';

// get
fetch(booksUrl)
    .then((response) => response.json())
    .then((result) => console.log(result))
    .catch((error) => console.log(error));

// post
fetch(booksUrl, {
    method: 'POST',
    headers: {
        'content-type': 'application/json',
    },
    body: JSON.stringify({
        title: 'Chronicles of Narnia',
        author: 'C.S.Lewis',
    }),
})
    .then((response) => response.json())
    .then((result) => console.log(result))
    .catch((error) => console.log(error));

// put
fetch(`${booksUrl}/385bfc3a-f2bb-4141-aeac-0e7dc96a7fdc`, {
    method: 'PUT',
    headers: {
        'content-type': 'application/json',
    },
    body: JSON.stringify({
        title: 'Chronicles of Narnia 2',
        author: 'C.S.Lewis',
        _id: '385bfc3a-f2bb-4141-aeac-0e7dc96a7fdc',
    }),
})
    .then((response) => response.json())
    .then((result) => console.log(result))
    .catch((error) => console.log(error));

// DELETE
fetch(`${booksUrl}/385bfc3a-f2bb-4141-aeac-0e7dc96a7fdc`, {
    method: 'DELETE',
})
    .then((response) => response.json())
    .then((result) => console.log(result))
    .catch((error) => console.log(error));
