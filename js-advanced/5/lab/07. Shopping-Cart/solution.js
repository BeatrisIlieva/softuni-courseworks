function solve() {
    const addButtonElements = document.querySelectorAll('.add-product');
    const checkoutButtonElement = document.querySelector('.checkout');
    const textAreaElement = document.querySelector('textarea');

    const productData = {};

    addButtonElements.forEach(button => button.addEventListener('click', addProductHandler));

    function addProductHandler(e) {
        const parentElement = e.currentTarget.parentElement.parentElement;
        const productName = parentElement.querySelector('.product-title').textContent;
        let productPrice = parentElement.querySelector('.product-line-price').textContent;

        productPrice = Number(productPrice);

        if (!productData[productName]) {
            productData[productName] = 0;
        }

        productData[productName] += productPrice;

        textAreaElement.value += `Added ${productName} for ${productPrice.toFixed(
            2
        )} to the cart.\n`;
    }

    checkoutButtonElement.addEventListener('click', e => {
        const list = Object.keys(productData).join(', ');
        const totalPrice = Object.values(productData).reduce((acc, curr) => acc + curr, 0);

        const result = `You bought ${list} for ${totalPrice.toFixed(2)}.`;

        textAreaElement.value += result;

        addButtonElements.forEach(button => {
            button.setAttribute('disabled', 'disabled');
        });

        e.currentTarget.setAttribute('disabled', 'disabled');
    });
}
