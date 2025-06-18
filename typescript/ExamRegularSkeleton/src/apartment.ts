import { Room } from './contracts/room';
import { RoomNumber } from './types';

export class Apartment implements Room {
    public readonly roomNumber: RoomNumber;
    public readonly totalPrice: number;
    public readonly cancellationPrice: number;

    constructor(
        private price: number,
        roomNumber: 'A01' | 'A02' | 'A03' | 'B01' | 'B02' | 'B03',
        private numberOfGuests: number
    ) {
        this.roomNumber = roomNumber;
        this.totalPrice = price * numberOfGuests;
        this.cancellationPrice = this.totalPrice * 0.8;
    }
}
