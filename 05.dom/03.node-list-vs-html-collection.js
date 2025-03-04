// Static Node List
const contentStaticNodeList = document.querySelectorAll('#content > *');
console.log(contentStaticNodeList); // NodeList(2) [p, a]


const contentElement = document.getElementById('content');
// Live Node List
const contentLiveNodeList = contentElement.childNodes;
console.log(contentLiveNodeList); // NodeList(5) [text, p, text, a, text]

// The text - 'Some basic text without tag' appears as text node. It is not inside HTML tags but
// it appears in the collection as a node. The text nodes does not appear in an HTML Collection.
// Elements ARE nodes but there are other nodes that ARE NOT elements. Like text nodes, comments 
// and empty spaces.

// The HTML Collection is ALWAYS LIVE
const contentLiveHtmlCollection = contentElement.children;
console.log(contentLiveHtmlCollection); // HTMLCollection(2) [p, a]

// Remove element from LIVE HTML Collection
setTimeout(() => {
    contentLiveHtmlCollection.item(0).remove(); 
}, 2000)

// Live HTML Collection means that if we modify the collection (change place, remove, add)
// this change will be reflected at the DOM tree

// Remove element from STATIC Node List
setTimeout(() => {
    contentStaticNodeList.item(1).remove(); 
}, 2000)

// iterate HTML Collection
for (const element of contentLiveHtmlCollection) {
    console.log(element);
}


// Node list can be iterated with forEach
contentLiveNodeList.forEach(element => console.log(element))