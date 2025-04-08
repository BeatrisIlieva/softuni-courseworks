console.log(10 + '2');
// 102

console.log('10' + 2);
//102

console.log(10 - '2');
// 8

// let and const live inside their block scope

if (5 > 10) {
  let name = 'Ivan';

  if(5 < 10) {
    console.log(name);

    // The inner scope has access to the variables in the outer one
  }
} else {
  console.log(name);
  // Error: name is not defined

  // The variable name does not exist in this scope because it is defined in another (the above one)
}
