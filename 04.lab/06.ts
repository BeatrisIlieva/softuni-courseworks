type anotherType = {
    time: Date;
    duration: number;
    test: () => string;
    val: 200 | 300;
    user: {
        name: string;
        age: number;
    };
};

type Choose<T, U extends keyof T> = {
    [Key in U]: T[Key]
}; 

// type Choose<T, U extends keyof T> = Pick<>

type nestedUserAndTime = 'user' | 'time';
type extracted2 = Choose<anotherType, nestedUserAndTime>;

// type extracted2 = {
//     user: {
//         name: string;
//         age: number;
//     };
//     time: Date;
// };
