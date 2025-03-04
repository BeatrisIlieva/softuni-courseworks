// DOM query
const movieListElement = document.getElementById('movies');
const firstMovieElement = document.querySelector('.first-movie');

// Create element
const secondMovieElement = document.createElement('li');
secondMovieElement.textContent = 'Second Movie';

// Append new element to DOM
movieListElement.append(secondMovieElement);

// Append existing element to DOM
movieListElement.append(firstMovieElement);

// Prepend existing element
movieListElement.prepend(firstMovieElement);

// Clone existing element 
// It creates a new reference
const firstMovieShallowCopyElement = firstMovieElement.cloneNode(); // it just copies the tags
console.log(firstMovieShallowCopyElement); // <li class="first-movie"></li>

const firstMovieDeepCopyElement = firstMovieElement.cloneNode(true); // it copies with the text content
console.log(firstMovieDeepCopyElement); // <li class="first-movie">First Movie</li>

