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

class PlannedHoliday {
    private _start!: Date;
    private _end!: Date;

    constructor(start: Date, end: Date) {
        this.start = start;
        this.end = end;
    }

    set start(value: Date) {
        if (value > this.end) {
            throw new Error('Start cannot be after end');
        }
        this._start = value;
    }

    get start() {
        return this._start;
    }

    set end(value: Date) {
        if (value < this.start) {
            throw new Error('End cannot be before start');
        }
        this._end = value;
    }

    get end() {
        return this._end;
    }

    getInfo(): string {
        return `Holiday: ${this.start.getDate()}/${this.start.getMonth()}/${this.start.getFullYear()} - ${this.end.getDate()}/${this.end.getMonth()}/${this.end.getFullYear()}`;
    }
}

class HolidayManager<
    T extends Holiday,
    U extends TravelVacation | MountainVacation | BeachVacation
> {
    private vacations: Map<T, U> = new Map();

    reserveVacation(holiday: T, vacationType: U): void {
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

