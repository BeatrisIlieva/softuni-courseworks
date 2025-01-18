let data = {};

const newData = { name: 'peter', age: 12 };

data = {...data, ...newData}

// Object.assign(data, newData);
console.log(data);