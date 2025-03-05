const countElement = document.getElementById('count');
const resetButtonElement = document.getElementById('reset');

// adding event listener using EVEN HANDLER
resetButtonElement.addEventListener('click', resetCount);
// callback function
function resetCount(event) {
    countElement.textContent = 0;
}

const decrementButtonElement = document.getElementById('decrement');
// adding event listener using DOM element PROPERTY
decrementButtonElement.onclick = function () {
    const currentCount = Number(countElement.textContent);

    const decreasedCount = currentCount - 1;

    countElement.textContent = decreasedCount;
};

// adding event listener using HTML ATTRIBUTE
function onIncrement(event) {
    console.log(event);

    const currentCount = Number(countElement.textContent);
    const increasedCount = currentCount + 1;

    countElement.textContent = increasedCount;
}

// remove event listener
// to remove an event listener, we firstly need to specify the type of the event
// and secondly we need to pass a reference to the event handler that we
// need to remove

setTimeout(() => {
    resetButtonElement.removeEventListener('click', resetCount);
}, 3000);
