/* 
   A fragment is a type of NODE. It is NOT an element. It does not appear in the HTML.
   The fragment live only in memory.
   We can use it as a parent container. It stays in the memory.
   We can use it to attach multiple children for it.
   Then, after we are done attaching, we can attach the fragment to the DOM. 
   This is more efficient, compared to appending each child separately, namely
   because we attach only one element to the DOM. 
   The speed with which we attach elements to an object in memory is much faster
   than the speed we attach elements to the DOM tree. 

   Rule: we first attach the children, then we attach the parent to the DOM. 
   Generally, is more expensive to attach elements to DOM 
   than iterating through collections in memory.

   Our goal is to achieve want we need with as little interactions with DOM as possible.

   ---

   Event delegation: instead of attaching multiple event listeners on each child, 
   we can attach a single event on their parent element.

   ---
   currentTarget: the element that we attach the event to
   target: the element that fires the event (for example the button that has been clicked)
*/

function create(words) {
    const contentElement = document.getElementById('content');

    const divElements = words.map(word => {
        const pElement = document.createElement('p');
        pElement.textContent = word;
        pElement.style.display = 'none';

        const divElement = document.createElement('div');
        divElement.append(pElement);

        return divElement;
    });

    // Document Fragment
    const divElementsFragment = document.createDocumentFragment();
    divElementsFragment.append(...divElements);

    // Event Delegation
    contentElement.addEventListener('click', clickHandler);

    contentElement.append(divElementsFragment);

    // Difference between target and currentTarget
    function clickHandler(e) {
        console.log(e.currentTarget); // <div id="content"><div><p style="display: none;">Section 1</p></div><div><p style="display: none;">Section 2</p></div><div><p style="display: none;">Section 3</p></div><div><p style="display: none;">Section 4</p></div></div>
        console.log(e.target); // <div><p style="display: none;">Section 1</p></div>

        if (e.target.tagName === 'DIV') {
            const pElement = e.target.querySelector('p');
            pElement.style.display = 'block';
        } else {
            console.log(e.target);
            // after the paragraph has been displayed:
            // <p style="display: block;">Section 1</p>
        }
    }
}
