enum TravelVacation {
    Abroad = 'Abroad',
    InCountry = 'InCountry'
}

enum MountainVacation {
    Ski = 'Ski',
    Hiking = 'Hiking'
}

enum BeachVacation {
    Pool = 'Pool',
    Sea = 'Sea',
    ScubaDiving = 'ScubaDiving'
}

interface Holiday {
    set start(val: Date);
    set end(val: Date);
    getInfo(): string;
}

interface VacationManager<T, V> {
    reserveVacation(holiday: T, vacationType: V): void;
    listReservations(): string;
}

class PlannedHoliday implements Holiday {
    private _start!: Date;
    private _end!: Date;

    constructor(start: Date, end: Date) {
        this.start = start;
        this.end = end;
    }

    get start() {
        return this._start;
    }

    set start(value: Date) {
        if (value > this._end) {
            throw new Error('Start cannot be before end');
        }

        this._start = value;
    }

    get end() {
        return this._end;
    }

    set end(value: Date) {
        if (value < this._start) {
            throw new Error('End cannot be before start');
        }

        this._end = value;
    }

    getInfo(): string {
        return `Holiday: ${this.start.getDate()}/${this.start.getMonth() + 1}/${this.start.getFullYear()} - ${this.end.getDate()}/${this.end.getMonth() + 1}/${this.end.getFullYear()}`;
    }
}

class HolidayManager<
    T extends Holiday,
    V extends TravelVacation | MountainVacation | BeachVacation
> implements VacationManager<T, V>
{
    private vacations: Map<T, V> = new Map();

    reserveVacation(holiday: T, vacationType: V) {
        this.vacations.set(holiday, vacationType)
    }

    listReservations(): string {
        const result: string[] = [];

        Array.from(this.vacations).forEach(([holiday, vacationType]) => {
            result.push(`${holiday.getInfo()} => ${vacationType}`);
        });

        return result.join('\n');
    }
}

let holiday = new PlannedHoliday(new Date(2022, 10, 11), new Date(2022, 10, 18));
let holiday2 = new PlannedHoliday(new Date(2024, 5, 18), new Date(2024, 5, 22));
let holidayManager = new HolidayManager<Holiday, BeachVacation>();
holidayManager.reserveVacation(holiday, BeachVacation.ScubaDiving);
holidayManager.reserveVacation(holiday2, BeachVacation.Sea);
console.log(holidayManager.listReservations())

let holiday3 = new PlannedHoliday(new Date(2021, 3, 14), new Date(2020, 3, 17));
let holiday4 = new PlannedHoliday(new Date(2024, 2, 1), new Date(2024, 1, 4));
