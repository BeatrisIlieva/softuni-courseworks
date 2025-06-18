import { Language } from './contracts/language';
import { DNACharset } from './types';

export class DNACodeLanguage implements Language {
    private _charset: Set<DNACharset> = new Set(['A', 'C', 'G', 'T']);

    get charset(): Set<DNACharset> {
        return this._charset;
    }

    isCompatibleToCharset(message: string): boolean {
        const messageArr = message.split('');
        const charsetArr: string[] = Array.from(this.charset.values());

        return messageArr.every((char) => charsetArr.includes(char));
    }
}
