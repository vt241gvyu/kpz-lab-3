const fs = require('fs');
const path = require('path');

class Logger {
    log(message) {
        console.log('\x1b[32m%s\x1b[0m', message);
    }

    error(message) {
        console.log('\x1b[31m%s\x1b[0m', message);
    }

    warn(message) {
        console.log('\x1b[33m%s\x1b[0m', message);
    }
}

class FileWriter {
    constructor() {
        this.filePath = path.join(__dirname, '..', 'data', 'log.txt');
        const folderPath = path.dirname(this.filePath);

        if (!fs.existsSync(folderPath)) {
            fs.mkdirSync(folderPath);
        }
    }

    write(text) {
        fs.appendFileSync(this.filePath, text, 'utf8');
    }

    writeLine(text) {
        this.write(text + '\n');
    }

    clear() {
        fs.writeFileSync(this.filePath, '', 'utf8');
    }
}

class FileLoggerAdapter {
    constructor(fileWriter) {
        this.fileWriter = fileWriter;
    }

    log(message) {
        this.fileWriter.writeLine('[ЛОГ] ' + message);
    }

    error(message) {
        this.fileWriter.writeLine('[ПОМИЛКА] ' + message);
    }

    warn(message) {
        this.fileWriter.writeLine('[ПОПЕРЕДЖЕННЯ] ' + message);
    }
}

function runAdapterDemo() {
    const logger = new Logger();
    logger.log('Звичайне інформаційне повідомлення');
    logger.error('Звичайне повідомлення про помилку');
    logger.warn('Звичайне попередження');

    const fileWriter = new FileWriter();
    fileWriter.clear();

    const fileLogger = new FileLoggerAdapter(fileWriter);
    fileLogger.log('Повідомлення для файлу');
    fileLogger.error('Помилка для файлу');
    fileLogger.warn('Попередження для файлу');

    console.log('Файл data/log.txt створено з повідомленнями логера.');
}

module.exports = {
    Logger,
    FileWriter,
    FileLoggerAdapter,
    runAdapterDemo,
    run: runAdapterDemo
};
