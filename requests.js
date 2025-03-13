// POST
const data = {};

fetch(baseUrl, {
    method: 'POST',
    headers: {
        'content-type': 'application/json'
    },
    body: JSON.stringify(data)
});
