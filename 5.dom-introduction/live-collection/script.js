const movieListElement = document.getElementById('movies');
const liveElementsCollection = movieListElement.children; // Live HTML Collection
const liveNodeList = movieListElement.childNodes; // Live Node List
const staticNodeList = movieListElement.querySelectorAll('#movies li'); // Static Node List
const staticNodeList2 = document.querySelectorAll('#movies li');
// console.log(movieListElement);
// console.log(liveElementsCollection);
// console.log(liveNodeList);
// console.log(staticNodeList);

// setTimeout(() => {
//     const movieLiElement = document.createElement('li');
//     movieLiElement.textContent = 'Case for Christ';

//     movieListElement.appendChild(movieLiElement);

//     console.log(movieListElement);
//     console.log(liveElementsCollection);
//     console.log(liveNodeList);
//     console.log(staticNodeList);
// }, 3000);
