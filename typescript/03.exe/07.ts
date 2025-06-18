class Counter {
    private static count = 0;

    public static increment(): void {
        this.count++;
    }

    public static getCount(): number {
        return this.count;
    }
}

Counter.increment();
Counter.increment();
console.log(Counter.getCount());
// Counter.count = 10;
