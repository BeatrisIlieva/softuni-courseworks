"use strict";

// The map() method creates a new array with the results that a given function executes for every element in the original array

const activeUsers = ["David", "John", "Simon"];

const activeUsersGreetings = activeUsers.map(function (user) {
  return `Hello, ${user}!`;
});

//expected ["Hello, David!", "Hello, John!", "Hello, Simon!"]
console.log(activeUsersGreetings);
