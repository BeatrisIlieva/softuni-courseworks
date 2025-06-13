export type DNACharset = 'A' | 'C' | 'G' | 'T';

export type ValidationResult =
    | { success: true; message: string }
    | { success: false; message: string };

export type Operation = 'encode' | 'decode';

export interface OperationHandler {
    method: (message: string) => string;
    track: (length: number) => void;
}

export type ProcessedCharactersFormat = 'Encoded' | 'Decoded' | 'Both';
