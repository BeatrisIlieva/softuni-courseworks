export {};

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

    set start(date: Date) {
        if (date < this._end) {
            throw new Error('Start cannot be before the end');
        }

        this._start = date;
    }

    get start() {
        return this._start;
    }

    set end(date: Date) {
        if (date < this._start) {
            throw new Error('End cannot be before the start');
        }

        this._end = date;
    }

    get end() {
        return this._end;
    }

    getInfo(): string {
        return `Holiday: ${this._start.getDate()}/${
            this._start.getMonth() + 1
        }/${this._start.getFullYear()} - ${this._start.getDate()}/${
            this._start.getMonth() + 1
        }/${this._start.getFullYear()}`;
    }
}

class HolidayManager<
    T extends Holiday,
    V extends TravelVacation | MountainVacation | BeachVacation
> implements VacationManager<T, V>
{
    private vacations: Map<T, V> = new Map();

    reserveVacation(holiday: T, vacationType: V): void {
        this.vacations.set(holiday, vacationType);
    }

    listReservations(): string {
        const result: string[] = [];

        Array.from(this.vacations.entries()).forEach(([holiday, vacationType]) => {
            result.push(`${holiday.getInfo()} => ${vacationType}`);
        });

        return result.join('\n');
    }
}

let holiday = new PlannedHoliday(new Date(2024, 1, 1), new Date(2024, 1, 4));
let holiday2 = new PlannedHoliday(new Date(2025, 3, 14), new Date(2025, 3, 17));
let holidayManager = new HolidayManager<Holiday, TravelVacation>();
holidayManager.reserveVacation(holiday, TravelVacation.Abroad);
holidayManager.reserveVacation(holiday2, TravelVacation.InCountry);
console.log(holidayManager.listReservations());
