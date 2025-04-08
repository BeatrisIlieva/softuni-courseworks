// DOM Query
const movieListElement = document.getElementById('movies');
const firstMovieElement = document.querySelector('.first-movie');

// Create element
const secondMovie = document.createElement('li');
secondMovie.textContent = 'Man of steel';

// Append a new element to DOM
movieListElement.appendChild(secondMovie);

// Append an existing element to DOM
movieListElement.appendChild(firstMovieElement) // takes the element from its position and moves it at the end


// Clone an existing element
const firstMovieCloneElement = firstMovieElement.cloneNode();
console.log(firstMovieCloneElement); // Just the element without the content
// Here we just clone the node; 
// with  nodes elements the text is a child of the element
// with html elements the text is textContent

//deep copy
const firstMovieDeepCloneElement = firstMovieElement.cloneNode(true);
firstMovieDeepCloneElement.textContent = 'Titanic'
console.log(firstMovieDeepCloneElement);

movieListElement.appendChild(firstMovieDeepCloneElement);

// prepend a child
movieListElement.prepend(firstMovieDeepCloneElement);

const fourthLiElement = document.createElement('li');
fourthLiElement.textContent = 'The day after yesterday';
movieListElement.appendChild(fourthLiElement)

const newLiElement = document.createElement('li');
newLiElement.textContent = 'The day after tomorrow';
// append element on specific place trough the parent element
movieListElement.insertBefore(newLiElement, fourthLiElement);

// append element on specific place trough the child element (more than one)
const fifthLiElement = document.createElement('li');
fifthLiElement.textContent = 'The day after  wednesday';
const sixthLiElement = document.createElement('li');
sixthLiElement.textContent = 'The day after friday';
movieListElement.before(fifthLiElement, fourthLiElement, sixthLiElement);




// removeChild
// remove

