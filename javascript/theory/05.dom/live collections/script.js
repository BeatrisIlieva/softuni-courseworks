/*
    When a change occurs in the DOM this change will be reflected in a LIVE collection.
    HTML Collection is always LIVE.
    In a STATIC Collection, future changes are not being reflected.

    STATIC Node List is returned only when we use the method querySelectorAll();
    LIVE Node List is returned by childNodes;

    querySelector() => returns the first matched element;
    querySelectorAll() => returns a STATIC Node List;

    getElementById() => returns a single element;

    getElementsByTagName() => returns a LIVE HTML Collection
    getElementsByClassName() => returns a LIVE HTML Collection

    .childNodes => returns a LIVE Node List
    .children => returns a LIVE HTML collection
*/

const moviesListElement = document.getElementById('movies');

// HTML Collection by definition is always LIVE
// 'children' returns an HTML Collection
// const liveHtmlCollection = moviesListElement.children;
const liveHtmlCollection = moviesListElement.children;

// 'childNodes' returns a LIVE Node List Collection
const liveNodeList = moviesListElement.childNodes;

// STATIC Node List
const staticNodeList = moviesListElement.querySelectorAll('li');

setTimeout(() => {
    const liElement = document.createElement('li');
    liElement.textContent = 'The case for Christ';

    moviesListElement.append(liElement);

    console.log(liveHtmlCollection, 'Live HTML Collection'); // HTMLCollection(4) [li, li, li, li] 'Live HTML Collection'
    console.log(liveNodeList, 'Live Node List'); // NodeList(8) [text, li, text, li, text, li, text, li] 'Live Node List'
    console.log(staticNodeList, 'Static Node List'); // NodeList(3) [li, li, li] 'Static Node List'
}, 3000);
