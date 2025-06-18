// type InputParamType<T> = T extends number ? number : string;

// function conditionalNumber<T>(value: InputParamType<T>): void {
//     if (typeof value === 'number') {
//         console.log(value.toFixed(2));
//     } else {
//         console.log(value);
//     }
// }

type ParamType<T> = T extends number ? number : string;

function conditionalNumber<T>(param: ParamType<T>): void {
    if (typeof param === 'number') {
        console.log(param.toFixed(2));
    } else {
        console.log(param);
    }
}

conditionalNumber<number>(20.3555);
conditionalNumber<string>('wow');
conditionalNumber<boolean>('a string');

// conditionalNumber<boolean>(30);
// conditionalNumber<number>('test');
