import { roomNumbers } from './constants';
import { Motel } from './contracts/motel';
import { PartialMonthlyMotel } from './contracts/partialMonthlyMotel';
import { Room } from './contracts/room';
import { WinterMonth, SummerMonth } from './contracts/util';
import { RoomNumber } from './types';

export class MonthlyMotel<T extends WinterMonth | SummerMonth>
    extends PartialMonthlyMotel
    implements Motel
{
    private rooms: Map<Room, T[]> = new Map();
    private totalBudget = 0;

    override addRoom(room: unknown): string {
        if (!this.isRoom(room)) {
            return 'Value was not a Room.';
        }

        const roomIsAlreadyAdded = this.rooms.get(room);

        if (roomIsAlreadyAdded) {
            return `Room '${room.roomNumber}' already exists.`;
        }

        this.rooms.set(room, []);

        return `Room '${room.roomNumber}' added.`;
    }

    override bookRoom(roomNumber: string, bookedMonth: T): string {
        const room = this.findRoom(roomNumber);
        if (!room) {
            return `Room '${roomNumber}' does not exist.`;
        }

        const bookedMonths = this.rooms.get(room) || [];
        const roomIsAlreadyBookedForTheRequestedMonth = bookedMonths?.includes(bookedMonth as T);
        if (roomIsAlreadyBookedForTheRequestedMonth) {
            return `Room '${roomNumber}' is already booked for '${bookedMonth}'.`;
        }

        bookedMonths?.push(bookedMonth as T);
        this.rooms.set(room, bookedMonths)
        this.totalBudget += room.totalPrice;

        return `Room '${roomNumber}' booked for '${bookedMonth}'.`;
    }

    cancelBooking(roomNumber: string, bookedMonth: T): string {
        const room = this.findRoom(roomNumber);
        if (!room) {
            return `Room '${roomNumber}' does not exist.`;
        }

        const bookedMonths = this.rooms.get(room) || [];

        const monthIndex = bookedMonths.indexOf(bookedMonth as T);
        if (monthIndex < 0) {
            return `Room '${roomNumber}' is not booked for '${bookedMonth}'.`;
        }

        bookedMonths.splice(monthIndex, 1);
        this.rooms.set(room, bookedMonths);
        this.totalBudget -= room.cancellationPrice;

        return `Booking cancelled for Room '${roomNumber}' for '${bookedMonth}'.`;
    }

    override getTotalBudget(): string {
        return `Motel: ${MonthlyMotel.MotelName}\nTotal budget: $${this.totalBudget.toFixed(2)}`;
    }

    private isRoom(room: unknown): room is Room {
        return (
            room !== undefined &&
            typeof room === 'object' &&
            room !== null &&
            'roomNumber' in room &&
            typeof room.roomNumber === 'string' &&
            roomNumbers.includes(room.roomNumber as RoomNumber) &&
            'totalPrice' in room &&
            typeof room.totalPrice === 'number' &&
            'cancellationPrice' in room &&
            typeof room.cancellationPrice == 'number'
        );
    }

    private findRoom(roomNumber: string): Room | undefined {
        for (const room of this.rooms.keys()) {
            if (room.roomNumber === roomNumber) {
                return room;
            }
        }

        return undefined;
    }
}
