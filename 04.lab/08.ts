type test = {
    name: string;
    age: number;
    test: () => string;
};

type Extracted<T> = {
    [Key in keyof T]: T[Key] extends Function ? Key : never;
}[keyof T];

// type AllFunctions<T> = {
//     [Key in Extracted<T>]: T[Key]
// }

type AllFunctions<T> = Pick<T, Extracted<T>>;

type extracted = AllFunctions<test>;
