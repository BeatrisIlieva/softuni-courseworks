"use strict";

// The forEach() method executes a provided function once for each element in an array

const furniture = ["chair", "table", "armchair"];

const copy = [];

furniture.forEach((item) => {
  copy.push(item);
});

//expected ["chair", "table", "armchair"]
console.log(copy);
