function getFirstElement<T>(arr: T[]): T {
    return arr[0];
}

const firstEl = getFirstElement(['1', '2']);
console.log(firstEl.length);

function createTuple<T, U>(firstEl: T, secondEl: U): [T, U] {
    return [firstEl, secondEl];
}

const tuple = createTuple<number, string>(1, 'a');
console.log(tuple);

interface Message<T> {
    sender: string;
    recipient: string;
    data: T;
}

const message: Message<string> = {
    sender: 'John',
    recipient: 'Mark',
    data: 'Hi'
};

const message2: Message<number> = {
    sender: 'John',
    recipient: 'Mark',
    data: 1
};

type Content = { text: string; timestamp: number };

const message3: Message<Content> = {
    sender: 'John',
    recipient: 'Mark',
    data: { text: 'Hi there', timestamp: 123 }
};

function logItemId<T extends { id: number }>(item: T): void {
    console.log(item.id);
}

// logItemId(1);
// logItemId('hi');
// logItemId({ name: 'John' });
logItemId({ name: 'John', id: 2 });
// logItemId({ name: 'John', id: '2' });

class StorageBox<T> {
    items: T[] = [];

    constructor(items: T[]) {
        this.items = items;
    }

    addItem(item: T): void {
        this.items.push(item);
    }

    removeItem(item: T): void {
        const index = this.items.indexOf(item);

        if (index > -1) {
            this.items.splice(index, 1);
        }
    }

    getItems(): T[] {
        return this.items;
    }
}

const box = new StorageBox<number>([1, 2]);
box.addItem(3);
box.removeItem(1);
console.log(box.getItems());

class ApiResponse<T, U> {
    public isSuccessfull: boolean;
    public data: T | null;
    public error: U | null;

    constructor(isSuccessfull: boolean, data: T | null, error: U | null) {
        this.isSuccessfull = isSuccessfull;
        this.data = data;
        this.error = error;
    }

    getResponse(): T {
        if (!this.isSuccessfull || this.data === null) {
            throw new Error(String(this.error));
        }

        return this.data;
    }
}

const response1 = new ApiResponse<number[], string>(false, [1, 2, 3], 'Error');
const response2 = new ApiResponse<{ text: string; id: number }, number>(
    false,
    { text: 'some text', id: 1 },
    1
);
const response3 = new ApiResponse<{ text: string; id: number }, number>(
    true,
    { text: 'some text', id: 1 },
    1
);
// console.log(response1.getResponse());
// console.log(response2.getResponse());
console.log(response3.getResponse());

type User = {
    id: number;
    name: string;
    age: number;
}

type MappedUser<T> = {
    [Key in keyof T]?: T[Key];
}

type PartialUser = MappedUser<User>;

const mappedUser: PartialUser = {
    id: 1,
    name: 'John'
}

type Employee = {
    id: number;
    name: string;
    age: number;
}

type NumericKeys<T> = {
    [Key in keyof T]: T[Key] extends number ? Key : never;
}[keyof T]

type OnlyNumericEmployee = NumericKeys<Employee>;