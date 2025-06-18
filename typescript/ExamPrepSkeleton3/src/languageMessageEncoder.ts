import { Cipher } from './contracts/cipher';
import { PartialMessageEncoder } from './contracts/implemented/partialMessageEncoder';
import { Language } from './contracts/language';
import { MessageEncoder } from './contracts/messageEncoder';
import { ProcessedCharactersFormat } from './types';
import { isValidString } from './utils';

export class LanguageMessageEncoder<T extends Language, U extends Cipher<T>>
    extends PartialMessageEncoder
    implements MessageEncoder
{
    private encodedChars: number = 0;
    private decodedChars: number = 0;

    constructor(language: T, cipher: U) {
        super(language, cipher);
    }

    public override encodeMessage(secretMessage: unknown) {
        if (!isValidString(secretMessage)) {
            return 'No message.';
        }

        const strippedMessage = this.stripForbiddenSymbols(secretMessage);
        const isCompatible = this.language.isCompatibleToCharset(strippedMessage);

        if (!isCompatible) {
            return 'Message not compatible.';
        }

        const encodedMessage = this.cipher.encipher(strippedMessage);
        this.encodedChars += encodedMessage.length;

        return encodedMessage;
    }

    public override decodeMessage(secretMessage: unknown): string {
        if (!isValidString(secretMessage)) {
            return 'No message.';
        }

        const isCompatible = this.language.isCompatibleToCharset(secretMessage);

        if (!isCompatible) {
            return 'Message not compatible.';
        }

        const decodedMessage = this.cipher.decipher(secretMessage);
        this.decodedChars += decodedMessage.length;

        return decodedMessage;
    }

    public override totalProcessedCharacters(type: ProcessedCharactersFormat): string {
        switch (type) {
            case 'Encoded':
                return `Total processed characters count: ${this.encodedChars}`;
            case 'Decoded':
                return `Total processed characters count: ${this.decodedChars}`;
            case 'Both':
                return `Total processed characters count: ${this.encodedChars + this.decodedChars}`;
        }
    }

    protected override stripForbiddenSymbols(message: string) {
        let forbiddenSymbols = PartialMessageEncoder.forbiddenSymbols;
        forbiddenSymbols.forEach(x => message = message.replaceAll(x, ''));
        return message;
   }
}
