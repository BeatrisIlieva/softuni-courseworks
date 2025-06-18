function Cacher(target: object, methodName: string, descriptor: PropertyDescriptor){
    const originalMethod = descriptor.value;

    let lastUpdated: Date | null;
    let cache: string[] | null;

    descriptor.value = function() {
        const currentMoment = new Date();

        if(lastUpdated && (currentMoment.getTime() - lastUpdated.getTime()) < 5000) {

            console.log('From cache');
            return cache;
        }

        lastUpdated = currentMoment;
        const data = originalMethod.call(this);
        cache = data.slice();

        return data;
    }

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

    @Cacher
    getWeatherData() {
        return this.weatherData;
    }
}


let service = new MockWeatherDataService();
console.log(service.getWeatherData())
console.log(service.getWeatherData())
service.addWeatherData('Partially Cloudy 5° to 11°');
console.log(service.getWeatherData())

//7 seconds later
setTimeout(() => console.log(service.getWeatherData()), 7000)