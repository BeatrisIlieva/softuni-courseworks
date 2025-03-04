// In the Browser the global object is 'window', in Node.js the global object is 'global'

console.log(global); // global {global: global, clearImmediate: ƒ, setImmediate: ƒ, clearInterval: ƒ, clearTimeout: ƒ, …}

console.log(this); // {}

// 'globalThis' is window in the Browser and 'global' in Node.js

console.log(globalThis === global); // true
console.log(globalThis === this);

