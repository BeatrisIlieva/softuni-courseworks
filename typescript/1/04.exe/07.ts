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

    constructor(startDate: Date, endDate: Date) {
        this.start = startDate;
        this.end = endDate;
    }

    set start(val: Date) {
        if (val > this._end) {
            throw new Error('The start date cannot be after the end date');
        }

        this._start = val;
    }

    set end(val: Date) {
        if (val < this._start) {
            throw new Error('The end date cannot be before the start date');
        }

        this._end = val;
    }

    getInfo(): string {
        return `Holiday: ${this._start.getDate()}/${
            this._start.getMonth() + 1
        }/${this._start.getFullYear()} - ${this._end.getDate()}/${
            this._end.getMonth() + 1
        }/${this._end.getFullYear()} `;
    }
}

class HolidayManager<
    T extends Holiday,
    V extends TravelVacation | MountainVacation | BeachVacation
> implements VacationManager<T, V>
{
    private holidays: Map<T, V> = new Map();

    reserveVacation(holiday: T, vacationType: V) {
        this.holidays.set(holiday, vacationType);
    }

    listReservations(): string {
        let result: string[] = [];

        Array.from(this.holidays.entries()).forEach(([holiday, vacationType]) => {
            result.push(`${holiday.getInfo()} => ${vacationType}`);
        });

        return result.join('\n');
    }
}

