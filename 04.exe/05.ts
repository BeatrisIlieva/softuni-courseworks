enum LoggingLevel {
    Info = 'Info',
    Error = 'Error',
    Warning = 'Warning',
    Debug = 'Debug'
}

enum LoggingFormat {
    Standard = '[%level][%date] %text',
    Minimal = '*%level* %text'
}

interface CachingLogger<T extends LoggingLevel, V extends LoggingFormat> {
    cachedLogs: Map<T, string[]>;
    log(logLevel: T, message: string): void;
    getFormat(): V;
}

class Logger<T extends LoggingLevel, V extends LoggingFormat>
    implements CachingLogger<T, V>
{
    private format: V;
    cachedLogs: Map<T, string[]> = new Map();

    constructor(format: V) {
        this.format = format;
    }

    log(logLevel: T, message: string): void {
        const date = new Date().toISOString();

        const result = this.format
            .replace('%level', logLevel)
            .replace('%date', date)
            .replace('%text', message);

        console.log(result);

        const currentMessages = this.cachedLogs.get(logLevel);

        if (currentMessages) {
            currentMessages.push(result);
            this.cachedLogs.set(logLevel, currentMessages);
        } else {
            this.cachedLogs.set(logLevel, [result]);
        }
    }

    getFormat(): V {
        return this.format;
    }
}

let logger = new Logger<LoggingLevel, LoggingFormat>(LoggingFormat.Minimal);
logger.log(LoggingLevel.Info, 'Just a simple message.');
logger.log(LoggingLevel.Error, 'A Problem happened.');
console.log('-----------');
console.log(logger.getFormat());
console.log([...logger.cachedLogs.entries()].map((x) => x[1].join('\n')).join('\n'));
