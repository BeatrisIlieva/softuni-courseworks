const countElement = document.getElementById('count');
const decrementButton = document.getElementById('decrement-button');
const resetButton = document.getElementById('reset-button');

// BEST using DOM event handler / callback function /event listener
// addEventListener is a method that we call on a given element and we pass only the type of the event without 'on'
// resetButton.addEventListener('click', (event) => {
//     countElement.textContent = 0;
// })

const eventListener = (event) => {
    countElement.textContent = 0;
}

resetButton.addEventListener('click', eventListener);

setTimeout(() => {
    resetButton.removeEventListener('click', eventListener)
}, 2000)

// react to event using DOM element properties
decrementButton.onclick = function (event) {
    countElement.textContent = Number(countElement.textContent) - 1;
};

// we receive event object

// react to event with HTML attribute
function onIncrement(event) {
    console.log(event);

    countElement.textContent = Number(countElement.textContent) + 1;
}


// use input event
const inputNumberElement = document.getElementById('number');

inputNumberElement.addEventListener('input', (event) => {
    console.log(event.target.value);
    countElement.textContent = event.target.value
})