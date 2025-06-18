function addCreatedOnProperty<T extends { new (...args: any[]): {} }>(constructor: T) {
    return class extends constructor {
        createdOn = new Date();
    };
}

@addCreatedOnProperty
class User {
    public name: string;
    public age: number;

    constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
    }

    public displayUserInfo() {
        console.log(`${this.name}, Age: ${this.age}`);
    }
}

const user1 = new User('John Doe', 30);
user1.displayUserInfo();
console.log(user1);
console.log((user1 as any).createdOn);
