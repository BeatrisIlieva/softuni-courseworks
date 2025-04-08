document.addEventListener('DOMContentLoaded', solve);

function solve() {
    const buttonElements = document.querySelectorAll('button.add-product');
    const textarea = document.querySelector('textarea');
    const checkoutElement = document.querySelector('.checkout');

    const products = new Set();
    let totalPrice = 0;

    for (let buttonElement of buttonElements) {
        buttonElement.addEventListener('click', () => {
            const parentElement = buttonElement.parentElement.parentElement;

            const name = parentElement.querySelector('.product-details .product-title').textContent;
            const money = parentElement.querySelector('.product-line-price').textContent;

            products.add(name);
            totalPrice += Number(money);

            const string = `Added ${name} for ${Number(money).toFixed(2)} to the cart.\n`;
            textarea.textContent += string;
        });
    }

    checkoutElement.addEventListener('click', () => {
        for (let buttonElement of buttonElements) {
            buttonElement.setAttribute('disabled', 'disabled');
        }

        checkoutElement.setAttribute('disabled', 'disabled');
        const productsAsArray = Array.from(products);
        const totalString = `You bought ${productsAsArray.join(', ')} for ${totalPrice.toFixed(
            2
        )}.`;
        textarea.textContent += totalString;
    });
}
