export type ProcessedCharsType = 'Encoded' | 'Decoded' | 'Both';

export type ProcessedCharacters = Record<ProcessedCharsType, number>;

export type DNAAllowedSymbols = 'A' | 'C' | 'G' | 'T';