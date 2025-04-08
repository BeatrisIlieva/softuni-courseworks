document.addEventListener('DOMContentLoaded', solve);

function solve() {
    const buttonElements = document.querySelectorAll('.add-product');
    const textareaElement = document.querySelector('textarea');
    const checkoutButtonElement = document.querySelector('.checkout');

    buttonElements.forEach(button => button.addEventListener('click', e => clickHandler(e)));

    checkoutButtonElement.addEventListener('click', e => checkoutHandler(e));

    const productsList = {};

    function clickHandler(e) {
        const parentElement = e.currentTarget.closest('.product');

        const productName = parentElement.querySelector('.product-title').textContent;
        const productPrice = Number(parentElement.querySelector('.product-line-price').textContent);

        productsList[productName] ??= 0;

        productsList[productName] += productPrice;

        textareaElement.textContent += `Added ${productName} for ${productPrice.toFixed(
            2
        )} to the cart.\n`;
    }

    function checkoutHandler(e) {
        const listElements = Object.keys(productsList).join(', ');
        const totalPrice = Object.values(productsList)
            .reduce((acc, curr) => acc + curr, 0)
            .toFixed(2);

        textareaElement.textContent += `You bought ${listElements} for ${totalPrice}.`;

        buttonElements.forEach(button => button.setAttribute('disabled', 'disabled'));

        e.currentTarget.setAttribute('disabled', 'disabled');
    }
}
