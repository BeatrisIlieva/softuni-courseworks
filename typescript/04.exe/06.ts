type anotherType = {
    duration: number;
    test: () => string;
    val: 200 | 300;

    time: Date;
    user: {
        name: string;
        age: number;
    };
};

type Choose<T, U extends keyof T> = {
    [K in U]: T[K];
};

type nestedUserAndTime = 'user' | 'time';
type extracted2 = Choose<anotherType, nestedUserAndTime>;

//type extracted2 = {//  user: {//    name: string;//    age: number;//  };//  time: Date;//}
