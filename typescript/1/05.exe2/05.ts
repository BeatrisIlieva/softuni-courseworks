function Logger(target: any, methodName: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    let cache: string[];
    let lastRead: Date;

    descriptor.value = function () {
        const currentTime = new Date();

        if (!cache || currentTime.getTime() - lastRead.getTime() > 5000) {
            lastRead = new Date();
            const result = originalMethod.call(this);
            cache = result.slice();

            return cache;
        }

        console.log('Returned from cache');
        return cache;
    };

    return descriptor;
}

class MockWeatherDataService {
    private weatherData: string[] = [
        'Sunny 8° to 20°',
        'Partially Cloudy 7° to 19°',
        'Sunny 5° to 18°'
    ];

    addWeatherData(data: string) {
        this.weatherData.push(data);
    }

    @Logger
    getWeatherData() {
        return this.weatherData;
    }
}

let service = new MockWeatherDataService();
console.log(service.getWeatherData());
console.log(service.getWeatherData());
service.addWeatherData('Partially Cloudy 5° to 11°');
console.log(service.getWeatherData());

//7 seconds later
setTimeout(() => console.log(service.getWeatherData()), 7000);
