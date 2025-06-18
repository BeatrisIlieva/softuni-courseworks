import { Language } from './contracts/language';
import { DNAAllowedSymbols } from './types';

export class DNACodeLanguage implements Language {
    private _charset: Set<DNAAllowedSymbols> = new Set(['A', 'C', 'G', 'T']);

    get charset() {
        return this._charset;
    }

    isCompatibleToCharset(message: string): boolean {
        const messageChars = message.split('');
        const allowedChars: string[] = Array.from(this.charset.values());
        const isCompatible = messageChars.every(char => allowedChars.includes(char));

        return isCompatible;
    }
}
