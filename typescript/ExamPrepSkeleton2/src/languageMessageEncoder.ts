import { Cipher } from './contracts/cipher';
import { PartialMessageEncoder } from './contracts/implemented/partialMessageEncoder';
import { Language } from './contracts/language';
import { MessageEncoder } from './contracts/messageEncoder';
import { Operation, OperationHandler, ProcessedCharactersFormat, ValidationResult } from './types';

export class LanguageMessageEncoder<T extends Language, U extends Cipher<T>>
    extends PartialMessageEncoder
    implements MessageEncoder
{
    private encodedSum: number = 0;
    private decodedSum: number = 0;

    constructor(language: T, cipher: U) {
        super(language, cipher);
    }

    public override encodeMessage(secretMessage: unknown): string {
        return this.processMessage(secretMessage, true, 'encode');
    }

    public override decodeMessage(secretMessage: unknown): string {
        return this.processMessage(secretMessage, false, 'decode');
    }

    public override totalProcessedCharacters(type: ProcessedCharactersFormat): string {
        switch (type) {
            case 'Encoded':
                return `Total processed characters count: ${this.encodedSum}`;
            case 'Decoded':
                return `Total processed characters count: ${this.decodedSum}`;
            case 'Both':
                return `Total processed characters count: ${this.encodedSum + this.decodedSum}`;
        }
    }

    protected override stripForbiddenSymbols(message: string): string {
        let forbiddenSymbols = PartialMessageEncoder.forbiddenSymbols;
        forbiddenSymbols.forEach((x) => (message = message.replaceAll(x, '')));
        return message;
    }

    protected processMessage(message: unknown, shouldStrip: boolean, operation: Operation): string {
        const result: ValidationResult = this.validateMessage(message, shouldStrip);

        if (!result.success) {
            return result.message;
        }

        return this.prepareMessage(result.message, operation);
    }

    protected validateMessage(message: unknown, shouldStrip: boolean): ValidationResult {
        if (typeof message !== 'string' || message.length === 0) {
            return { success: false, message: 'No message.' };
        }

        const processedMessage: string = shouldStrip
            ? this.stripForbiddenSymbols(message)
            : message;

        if (!this.language.isCompatibleToCharset(processedMessage)) {
            return { success: false, message: 'Message not compatible.' };
        }

        return { success: true, message: processedMessage };
    }

    protected prepareMessage(message: string, operation: Operation): string {
        const operationMapper: Record<Operation, OperationHandler> = {
            encode: {
                method: (message: string): string => this.cipher.encipher(message),
                track: (length: number): void => {
                    this.encodedSum += length;
                }
            },
            decode: {
                method: (message: string): string => this.cipher.decipher(message),
                track: (length: number): void => {
                    this.decodedSum += length;
                }
            }
        };

        const preparedMessage = operationMapper[operation].method(message);
        operationMapper[operation].track(preparedMessage.length);

        return preparedMessage;
    }
}
