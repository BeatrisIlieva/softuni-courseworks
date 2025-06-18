// ! Generic function with one type parameter

function getFirstElement<T>(arr: T[]): T {
    return arr[0];
}

const firstEl = getFirstElement(['pen40', 23]);
const firstNumEl = getFirstElement([, 45, 98, -937]);
console.log(firstNumEl?.toFixed(2));

function makeTuple<T, U>(el1: T, el2: U): [T, U] {
    return [el1, el2];
}

const tuple1 = makeTuple<string, number>('pen1o', 1);
const tuple2 = makeTuple<string, boolean>('pen40', true);

// ! Generic interface

interface Message<T> {
    sender: string;
    recipient: string;
    data: T;
}

const message1: Message<string> = {
    sender: 'Pen40',
    recipient: 'Penka',
    data: 'Hi'
};

type MessageDataType = { text: string; number: number };

const message2: Message<MessageDataType> = {
    sender: 'Pen',
    recipient: 'Ka',
    data: { text: 'Hi', number: 123 }
};

// ! Generic type constraints

function logItemId<T extends { id: number }>(item: T): void {
    console.log(item.id);
}

logItemId({ name: 'penka', id: 1 });

console.log('------------');

// ! Generic class with one parameter

class StorageBox<T> {
    items: T[] = [];

    constructor(initialItems: T[]) {
        this.items = initialItems;
    }

    getAllItems(): T[] {
        return this.items;
    }

    getFirstItem(): T {
        return this.items[0];
    }

    addItem(item: T): void {
        this.items.push(item);
    }
}

const storageBox1 = new StorageBox(['a']);
storageBox1.addItem('b');
console.log(storageBox1.getAllItems());
console.log(storageBox1.getFirstItem());

const storageBox2 = new StorageBox([1]);
storageBox2.addItem(2);
console.log(storageBox2.getAllItems());
console.log(storageBox2.getFirstItem());

// ! Generic class with two parameters

class ApiResponse<T, U> {
    isSuccessfull: boolean;
    data: T | null;
    error: U | null;

    constructor(isSuccessfull: boolean, data: T | null, error: U | null) {
        this.isSuccessfull = isSuccessfull;
        this.data = data;
        this.error = error;
    }

    getResult(): T {
        if (!this.isSuccessfull || this.data === null) {
            throw new Error(String(this.error));
        }

        return this.data;
    }
}

console.log('--------');
const firstResponse = new ApiResponse(true, 'data', null);
const secondResponse = new ApiResponse(false, null, 'error');
console.log(firstResponse.getResult());
console.log(secondResponse.getResult());

// ! Mapped types using generics

type User = {
    id: number;
    username: string;
    email: string;
};

type MakeOptionalProperties<T> = {
    [K in keyof T]?: T[K];
};

type PartialUser = MakeOptionalProperties<User>;

// ! Filter where type is number

type Employee = {
    name: string;
    age: number;
    salary: number;
};

type GetNumericKeys<T> = {
    [K in keyof T]: T[K] extends number ? K : never;
}[keyof T];

// name: never
// age: 'age'
// salary: 'salary'

type EmployeeNumericKeys = GetNumericKeys<Employee>;
