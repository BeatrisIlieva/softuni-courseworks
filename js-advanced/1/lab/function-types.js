// Function Declaration
function print1(text) {
    console.log(text);
}

//Function Expression
const print2 = function (text) {
    console.log(text);
};

// Arrow Function Statement Body
const print3 = text => {
    console.log(text);
};

// Arrow function Expression Body

const print4 = text => console.log(text);

print1('some');
print2('some');
print3('some');
print4('some');

// Default Parameters

function hello(name = 'guest'){
    console.log(`Hi, ${name}`);
}

hello();

