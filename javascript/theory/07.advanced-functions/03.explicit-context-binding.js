function sayHi( title, name) {
    console.log(`Hi ${title} ${name}, I am ${this.name}!`);
}

const newContext = {
    name: 'John',
};

sayHi('Mr.', 'Michel'); // Hi Mr. Michel, I am undefined!

// use call() method
sayHi.call(newContext, 'Mr.', 'Steven'); // Hi Mr. Steven, I am John!
// we can pass as much arguments as we need separated by commas
sayHi.call(newContext, ...['Mr.', 'Steven']); // Hi Mr. Steven, I am John!

// use apply() method
sayHi.apply(newContext, ['Mr.', 'Steven']); // Hi Mr. Steven, I am John!

// use bind() method
// bind returns a wrapper of a function that we can invoke at a later stage
// with bind we can set the context and postpone the execution of the function
// and delegate it's invocation 
const modifiedSayHi = sayHi.bind(newContext, 'Mr.', 'Steven');
modifiedSayHi(); // Hi Mr. Steven, I am John!
