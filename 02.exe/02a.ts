type Operator = {
    param: string | number | string[];
    operation: 'Index' | 'Length' | 'Add';
    operand: number;
};

function executeOperation(operator: Operator): string | number | undefined {
    const param = operator.param;
    const operation = operator.operation;
    const operand = operator.operand;

    if (typeof param !== 'number' && operation === 'Index') {
        return param[operator.operand];
    }

    if (typeof param !== 'number' && operation === 'Length') {
        return param.length % operand;
    }

    if (!Array.isArray(param) && operation === 'Add') {
        return Number(param) + operand;
    }
}

console.log(
    executeOperation({ param: ['First', 'Second', 'Third'], operation: 'Index', operand: 1 })
);
console.log(executeOperation({ param: 'string', operation: 'Index', operand: 1 }));
console.log(executeOperation({ param: ['Just', 'Two'], operation: 'Length', operand: 5 }));
console.log(executeOperation({ param: 'short string1', operation: 'Length', operand: 5 }));
console.log(executeOperation({ param: '7', operation: 'Add', operand: 3 }));
console.log(executeOperation({ param: 11, operation: 'Add', operand: 3 }));
