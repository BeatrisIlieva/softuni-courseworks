class Product {
    private static productCount = 0;
    public readonly id: number;
    private _name!: string;
    private _price!: number;

    constructor(name: string, price: number) {
        this.name = name;
        this.price = price;

        Product.productCount++;
        this.id = Product.productCount;
    }

    get name() {
        return this._name;
    }

    set name(value: string) {
        if (value.length < 1) {
            throw new Error('Name must be at least one character long');
        }
        this._name = value;
    }

    get price() {
        return this._price;
    }

    set price(value) {
        if (value <= 0) {
            throw new Error('Price must be above 0');
        }

        this._price = value;
    }

    public getDetails(): string {
        return `ID: ${this.id}, Name: ${this.name}, Price: ${this.price}`;
    }
}

class Inventory {
    private products: Product[] = [];

    addProduct(product: Product): void {
        this.products.push(product);
    }

    listProducts(): string {
        const result = [];
        this.products.forEach((x) => {
            result.push(`ID: ${x.id}, Name: ${x.name}, Price: $${x.price}`);
        });
        result.push(`Total products created: ${this.products.length}`);

        return result.join('\n');
    }
}

const inventory = new Inventory();
const product1 = new Product("Laptop", 1200);
const product2 = new Product("Phone", 800);

inventory.addProduct(product1);
inventory.addProduct(product2);

console.log(inventory.listProducts());

// Product.productCount = 10;
const product = new Product("", 800);
const product3 = new Product("Phone", 0);
// product.id = 5;