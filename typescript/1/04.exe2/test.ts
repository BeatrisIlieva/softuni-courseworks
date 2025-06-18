const items = new Map();
items.set('item', 0);

const exists = items.get('item');

items.set('item', exists + 1);

const exists2 = items.get('item');
console.log(exists2)