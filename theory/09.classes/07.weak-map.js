/*
    We can associate the key of the weak map to be a reference to an object.
    'weak' -> The garbage collector will clear the reference if nothing else holds that reference. 
*/

const weakMap = new WeakMap();

const obj = {'name': 'Peter'};

// we associate the reference to the object {'name': 'Peter'} with the value 'something'
weakMap.set(obj, 'something');
console.log(weakMap); // WeakMap {{name: 'Peter'} => something}