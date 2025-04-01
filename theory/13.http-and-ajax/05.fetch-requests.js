// GET REQUEST
// promise chaining
fetch('https://jsonplaceholder.typicode.com/posts/1') // returns a promise
    .then(response => response.json()) // returns a promise
    .then(result => console.log(result))
    .catch(error => console.log(error.message)); // catch handles both then's

// {
// userId: 1,
// id: 1,
// title: 'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
// body: 'quia et suscipit\n' +
//     'suscipit recusandae consequuntur expedita et cum\n' +
//     'reprehenderit molestiae ut ut quas totam\n' +
//     'nostrum rerum est autem sunt rem eveniet architecto'
// }

// when we sent a body we need to pass a parameter called 'options'; in it we need to specify the method
// BY DEFAULT the method is GET  that's why we do not specify it in a GET request
// we need to specify the body and send it as JSON STRING
// we also need to say to the server of what type is the data sent in the body; this we specify in the headers

// POST REQUEST
fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        title: 'My First Post',
        body: 'This is a test post.',
        userId: 1
    })
})
    .then(response => response.json())
    .then(result => console.log(result))
    .catch(error => console.log('Error:', error));

// {
// title: 'My First Post',
// body: 'This is a test post.',
// userId: 1,
// id: 101
// }

// PUT REQUEST
fetch('https://jsonplaceholder.typicode.com/posts/1', {
    method: 'PUT',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        id: 1,
        title: 'Updated title',
        body: 'Updated content',
        userId: 1
    })
})
    .then(response => response.json())
    .then(result => console.log(result))
    .catch(error => console.log('Error:', error));

// { id: 1, title: 'Updated title', body: 'Updated content', userId: 1 }

// DELETE REQUEST
fetch('https://jsonplaceholder.typicode.com/posts/1', {
    method: 'DELETE'
})
    .then(response => console.log('Deleted:', response.ok))
    .catch(error => console.error('Error:', error));

// Deleted: true