/*
    The values that we add to a weak set do not hold an active reference.
    This means that we can create a collection that holds unique reference data types -
    for example DOM elements. The benefit is that when we remove the elements from the tree,
    at the moment when the function returns, the garbage collector will 
    remove the reference immediately. This means that even if the weakSet is kept in closure,
    it will be remove from the garbage collector when teh function returns. 

    'weak' -> The garbage collector will clear the reference if nothing else holds that reference. 

*/

const weakSet = new WeakSet();

const obj = {'name': 'Peter'};

// we associate the reference to the object {'name': 'Peter'} with the value 'something'
weakSet.add(obj); 
console.log(weakSet); // WeakSet {{name: 'Peter'}}