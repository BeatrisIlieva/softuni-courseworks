class Product {
    private static _productCount = 0;
    public readonly id: number;
    private _name: string;
    private _price: number;

    constructor(name: string, price: number) {
        Product._productCount++;

        this.id = Product._productCount;
        this._name = name;
        this._price = price;
    }

    get name() {
        return this._name;
    }

    set name(value) {
        if (value.length < 1) {
            throw new Error('Name must be at least one character long!');
        }

        this._name = value;
    }

    get price() {
        return this._price;
    }

    set price(value) {
        if (value < 1) {
            throw new Error('Price cannot be less than one!');
        }

        this._price = value;
    }

    public getDetails(): string {
        return `ID: ${this.id}, Name: ${this.name}, Price: ${this.price}`;
    }
}

class Inventory {
    private _products: Product[] = [];

    addProduct(product: Product): void {
        this._products.push(product);
    }

    listProducts(): string {
        const result = [];

        for (const product of this._products) {
            result.push(
                `ID: 1, Name: ${product.name}, Price: $${product.price}`
            );
        }

        result.push(`Total products created: ${result.length}`);

        return result.join('\n');
    }
}

const inventory = new Inventory();
const product1 = new Product('Laptop', 1200);
const product2 = new Product('Phone', 800);

inventory.addProduct(product1);
inventory.addProduct(product2);

console.log(inventory.listProducts());

