const person = {
    name: 'Pesho',
    age: 20,
};

const data = JSON.stringify(person);

const dataFormatted = JSON.stringify(person, null, 2);
console.log(dataFormatted);
// {
//  "name": "Pesho",
//  "age": 20
//  }

console.log(data);
// {"name":"Pesho","age":20}
console.log(typeof data);
// string

const originalObject = JSON.parse(data);
console.log(originalObject);
// {name: 'Pesho', age: 20}
