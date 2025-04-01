const url = 'https://swapi.dev/api';

fetch(`${url}/people/1`)
    .then(response => response.json())
    .then(result => console.log(result))
    .catch(error => {
        console.log('Something went wrong');
    });
