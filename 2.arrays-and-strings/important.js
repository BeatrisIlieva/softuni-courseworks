let names = ['Elen', 'Mark', 'Stephen'];
names[10] = 'Peter';

console.log(names.length);
// 11

console.log(names);
// This is means sparse -> at the place of the dots there are undefined; 
// no memory is allocated fo the undefined
// ['Elen', 'Mark', 'Stephen', …, 'Peter']
