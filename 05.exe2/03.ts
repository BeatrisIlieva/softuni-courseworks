function AddCreatedOn(constructor: { new (...args: any[]): User }) {
    return class extends constructor {
        createdOn = new Date();
    };
}

@AddCreatedOn
class User {
    public name: string;
    public age: number;

    constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
    }

    displayUserInfo() {
        console.log(`${this.name}, Age: ${this.age}`);
    }
}

const user1 = new User('John Doe', 30);
user1.displayUserInfo();
console.log(user1);
console.log((user1 as any).createdOn);