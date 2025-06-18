export {};

type ExtractFunction<T> = {
    [Key in keyof T]: T[Key] extends Function ? Key : never;
}[keyof T];

type AllFunctions<T> = {
    [Key in ExtractFunction<T>]: T[Key];
};

type Employee = {
    name: string;
    salary: number;
    work: () => void;
    takeBreak: () => string;
};

type extracted2 = AllFunctions<Employee>;
