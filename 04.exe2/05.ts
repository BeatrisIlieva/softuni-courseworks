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
    private loggingFormat: V;
    public cachedLogs: Map<T, string[]> = new Map();

    constructor(loggingFormat: V) {
        this.loggingFormat = loggingFormat;
    }

    log(logLevel: T, message: string): void {
        const date = new Date().toISOString();
        const result = this.loggingFormat
            .replace('%level', logLevel)
            .replace('%date', date)
            .replace('%text', message);

        const logs = this.cachedLogs.get(logLevel);

        if (logs) {
            logs.push(result);
            this.cachedLogs.set(logLevel, logs);
        } else {
            this.cachedLogs.set(logLevel, [result]);
        }

        console.log(result);
    }

    getFormat(): V {
        return this.loggingFormat;
    }
}

