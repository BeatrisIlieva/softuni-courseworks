// Function Declaration
function print1(text) {
    console.log(text);
}

//Function Expression
const print2 = function (text) {
    console.log(text);
};

// Arrow Function
const print3 = text => {
    console.log(text);
};

print1('some');
print2('some');
print3('some');
