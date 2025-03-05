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

    divElements.forEach(element =>
        element.addEventListener('click', () => {
            const pElement = element.querySelector('p');
            pElement.style.display = 'block';
        })
    );

    const divElementsFragment = document.createDocumentFragment();
    divElementsFragment.append(...divElements);

    contentElement.append(divElementsFragment);
}
