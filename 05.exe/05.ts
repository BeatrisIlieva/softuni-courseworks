function Logger(target: any, methodName: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    let cache: string[] | null;
    let lastRead: Date | null;

    descriptor.value = function () {
        const currentDate = new Date();

        if (lastRead && currentDate.getTime() - lastRead.getTime() < 5000) {
            console.log('Returned from cache');
            return cache;
        }

        const data = originalMethod.call(this);
        cache = data.slice();
        lastRead = new Date();

        return data;
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
