const circle = {
    radius: 5
};

Object.defineProperty(circle, 'diameter', {
    get() {
        return this.radius * 2;
    },
})

console.log(circle.diameter); // 10
circle.radius = 15;
console.log(circle.diameter); // 30


// By default diameter is writable false
circle.diameter = 10;
console.log(circle.diameter); // 30
console.log(Object.getOwnPropertyDescriptor(circle, 'diameter'));

// {get: ƒ, set: undefined, enumerable: false, configurable: false}
// there is no value, writable property and setter

Object.defineProperty(circle, 'area', {
    get() {
        return Math.PI * this.radius ** 2;
    },
    set(value) {
        this.radius = Math.sqrt(value / Math.PI)
    },
});

console.log(circle.area); // 706.8583470577034
circle.area = 1000; 
console.log(circle.radius); // 17.841241161527712
