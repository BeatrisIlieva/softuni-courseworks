const orangeElement = document.querySelector('.orange');
const greenElement = document.querySelector('.green');
const yellowElement = document.querySelector('.yellow');

// {capture: true}
orangeElement.addEventListener(
    'click',
    () => {
        console.log('Orange clicked');
    },
    { capture: false }
);

greenElement.addEventListener(
    'click',
    (event) => {
        // event.stopPropagation();
        console.log('Green clicked');
    },
    { capture: false }
);

yellowElement.addEventListener(
    'click',
    (event) => {
        event.stopPropagation();
        console.log('Yellow clicked');
    },
    { capture: false }
);
