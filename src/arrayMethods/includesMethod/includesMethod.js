"use strict";

// The includes() method determines whether an array contains a given element; it returns true or false

const currentUser = "David";

const activeUsers = ["David", "John", "Simon"];

const isUserActive = activeUsers.includes(currentUser);

//expected true
console.log(isUserActive);
