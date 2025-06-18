type Param = string | number | string[];
type Operation = 'Index' | 'Length' | 'Add';
type Operand = number;

function operator(param: Param, operation: Operation, operand: Operand) {
    switch (operation) {
        case 'Index':
            if (typeof param === 'string' || Array.isArray(param)) {
                return param[operand];
            }
        case 'Length':
            if (typeof param === 'string' || Array.isArray(param)) {
                return param.length % operand;
            }
        case 'Add':
            if (typeof param === 'string' || typeof param === 'number') {
                return Number(param) + operand;
            }
    }
}

console.log(operator(['First', 'Second', 'Third'], 'Index', 1));
console.log(operator('string', 'Index', 1));
console.log(operator(['Just', 'Two'], 'Length', 5));
console.log(operator('short string1', 'Length', 5));
console.log(operator('7', 'Add', 3));
console.log(operator(11, 'Add', 3));
