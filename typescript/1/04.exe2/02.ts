interface CountableSet<T> {
    add(item: T): void;
    remove(item: T): void;
    contains(item: T): boolean;
    getNumberOfCopies(item: T): number;
}

class CountedSet<T> implements CountableSet<T> {
    private items: Map<T, number> = new Map();

    public add(item: T): void {
        const currentCount = this.items.get(item);

        if (currentCount === undefined) {
            this.items.set(item, 1);
        } else {
            this.items.set(item, currentCount + 1);
        }
    }

    public remove(item: T): void {
        const currentCount = this.items.get(item);

        if (currentCount !== undefined && currentCount > 0) {
            this.items.set(item, currentCount - 1);
        }
    }

    public contains(item: T): boolean {
        const currentCount = this.items.get(item);

        if (currentCount !== undefined && currentCount > 0) {
            return true;
        }

        return false;
    }

    public getNumberOfCopies(item: T): number {
        const currentCount = this.items.get(item);

        return currentCount ?? 0;
    }
}

let countedSet = new CountedSet<string>();
countedSet.add('test');
countedSet.add('test');
console.log(countedSet.contains('test'));
console.log(countedSet.getNumberOfCopies('test'));
countedSet.remove('test')
countedSet.remove('test')
countedSet.remove('test')
console.log(countedSet.getNumberOfCopies('test'));
console.log(countedSet.contains('test'));