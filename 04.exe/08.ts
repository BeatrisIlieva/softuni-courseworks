// type FunctionKeys<T> = {
//     [K in keyof T]: T[K] extends Function ? K : never;
// }[keyof T];

// type AllFunctions<T> = Pick<T, FunctionKeys<T>>;

// type Employee = {
//     name: string;
//     salary: number;
//     work: () => void;
//     takeBreak: () => string;
// };

// type extracted = AllFunctions<Employee>;

type AllFunctions<T> = {
    [K in keyof T]: T[K] extends Function ? K : never;
}[keyof T];

type test = {
    name: string;
    age: number;
    test: () => string;
};

type Employee = {
    name: string;
    salary: number;
    work: () => void;
    takeBreak: () => string;
};

type extracted = AllFunctions<Employee>;
