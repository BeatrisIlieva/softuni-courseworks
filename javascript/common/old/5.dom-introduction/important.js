console.log(this);
// {}

console.log(global);
// global {global: global, clearImmediate: ƒ, setImmediate: ƒ, clearInterval: ƒ, clearTimeout: ƒ, …}

console.log(globalThis === global);
// true

// in the browser
// console.log(globalThis === window === this); // -> true

console.log(globalThis === this); // -> false