const firstName: string = 'John';
const lastName: string = 'Doe';
const age: number = 30;
const hasGraduated: boolean = true;
const skills: string[] = ['JS', 'TS', 'React'];

// tuple
const certificateInfo: [string, number, boolean] = ['MySQL', 2025, true];
console.log(certificateInfo);

const stringNumArray: (string | number)[] = [4, 'string'];

// enum

const point = { x: 0, y: 0 };

enum Directions {
    Up,
    Down,
    Left,
    Right
}

function movePoint(
    point: { x: number; y: number },
    moveDirection: Directions
) {}

// optional parameter

function greetUser(username: string, addHello?: boolean): string {
    if (addHello) {
        return `${addHello} ${username}`;
    }

    return username;
}

console.log(greetUser('John', true));

// type assertion
// const inputElement = document.getElementById('email') as HTMLInputElement;

// console.log(inputElement!.value);

//predicate function
function isNumber(val: string | number): val is number {
    return typeof val === 'number';
}

// type narrowing
function formatData(a: string | number, b: string | number) {
    if (isNumber(a) && isNumber(b)) {
        console.log(a + b);
    } else {
        console.log(`${a} - ${b}`);
    }
}

formatData(3, 1);
