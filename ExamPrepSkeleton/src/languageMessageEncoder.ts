import { Cipher } from './contracts/cipher';
import { PartialMessageEncoder } from './contracts/implemented/partialMessageEncoder';
import { ProcessedCharacters } from './types';
import { isValidString } from './utils';
import { ProcessedCharsType } from './types';
import { Language } from './contracts/language';

export class LanguageMessageEncoder<
    T extends Language,
    U extends Cipher<T>
> extends PartialMessageEncoder {
    private encodedCount = 0;
    private decodedCount = 0;

    constructor(language: T, cipher: U) {
        super(language, cipher);
    }

    public override encodeMessage(secretMessage: unknown): string {
        if (!isValidString(secretMessage)) {
            return 'No message.';
        }

        const strippedSecretMessage = this.stripForbiddenSymbols(secretMessage);
        const isCompatible = this.messageIsCompatible(strippedSecretMessage);

        if (!isCompatible) {
            return 'Message not compatible.';
        }

        this.encodedCount += strippedSecretMessage.length;

        return this.cipher.encipher(strippedSecretMessage);
    }

    public override decodeMessage(secretMessage: unknown): string {
        if (!isValidString(secretMessage)) {
            return 'No message.';
        }

        const isCompatible = this.messageIsCompatible(secretMessage);

        if (!isCompatible) {
            return 'Message not compatible.';
        }

        this.decodedCount += secretMessage.length;

        return this.cipher.decipher(secretMessage);
    }

    public totalProcessedCharacters(type: ProcessedCharsType): string {
        let sum = 0;

        switch (type) {
            case 'Encoded':
                sum = this.encodedCount;
                break;
            case 'Decoded':
                sum = this.decodedCount;
                break;
            case 'Both':
                sum = this.encodedCount + this.decodedCount;
        }

        return `Total processed characters count: ${sum}`;
    }

    protected override stripForbiddenSymbols(message: string): string {
        let forbiddenSymbols = PartialMessageEncoder.forbiddenSymbols;
        forbiddenSymbols.forEach((x) => (message = message.replaceAll(x, '')));

        return message;
    }

    private messageIsCompatible(message: string): boolean {
        return this.language.isCompatibleToCharset(message);
    }
}
