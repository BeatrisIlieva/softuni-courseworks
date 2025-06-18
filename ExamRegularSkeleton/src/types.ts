import { SummerMonth as summer, WinterMonth as winter} from './contracts/util';

export type RoomNumber = 'A01' | 'A02' | 'A03' | 'B01' | 'B02' | 'B03';

export interface WinterMonth {
    December: winter.December;
    January: winter.January;
    February: winter.February;
    March: winter.March;
}

export interface SummerMonth {
    June: summer.June;
    July: summer.July;
    August: summer.August;
    September: summer.September;
}
