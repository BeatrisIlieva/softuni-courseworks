/*
    Each event spreads in three phases:
    1. Capture
    2. Target
    3. Bubble

    It starts from the most outer element, until it reaches the most inner element - the target. 
    Then it starts bubbling from the target until it reaches the most outer element again.

    However, the events in DOM, be default, execute in bubbling order.
*/

const orangeElement = document.querySelector('.orange');
const greenElement = document.querySelector('.green');
const yellowElement = document.querySelector('.yellow');

orangeElement.addEventListener('click', e => {
    console.log('orange clicked');
});
// orange clicked


// we can change the default order of execution from bubbling to capture
greenElement.addEventListener('click', e => {
    console.log('green clicked');
}, { capture: true });
// green clicked
// orange clicked

yellowElement.addEventListener('click', e => {
    console.log('yellow clicked');
});
// yellow clicked
// green clicked
// orange clicked

// after changing the default order of event execution for the green element,
// the result looks like:


// green clicked
// yellow clicked
// orange clicked