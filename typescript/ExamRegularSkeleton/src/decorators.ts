export function decorator1<T extends new (...args: any[]) => {}>(constructor: T) {}

export function decorator2(target: object, propertyName: string, descriptor: PropertyDescriptor) {
    const originalGetter = descriptor.get;

    descriptor.get = function () {
        const price = originalGetter?.call(this);
        return price * 1.2;
    };

    return descriptor;
}

export function decorator3(target: object, propertyName: string, descriptor: PropertyDescriptor) {
    const originalGetter = descriptor.get;

    descriptor.get = function () {
        const price = originalGetter?.call(this);
        return price * 1.2;
    };

    return descriptor;
}

export function decorator4(target: any, methodName: string, parameterIndex: number) {}

export function decorator5<T extends abstract new (...args: any[]) => {}>(constructor: T) {
    abstract class ExtendedPartialMonthlyMotel extends constructor {
        public static readonly MotelName = 'Monthly Motel';
    }

    return ExtendedPartialMonthlyMotel;
}
