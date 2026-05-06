const fs = require('fs');
const path = require('path');

class SmartTextReader {
    readFile(filePath) {
        const text = fs.readFileSync(filePath, 'utf8');
        const lines = text.split(/\r?\n/);

        return lines.map(function(line) {
            return line.split('');
        });
    }
}

class SmartTextChecker {
    constructor(reader) {
        this.reader = reader;
    }

    readFile(filePath) {
        console.log('Відкриття файлу: ' + filePath);

        const result = this.reader.readFile(filePath);

        console.log('Файл успішно прочитано');
        console.log('Закриття файлу: ' + filePath);
        console.log('Кількість рядків: ' + result.length);
        console.log('Кількість символів: ' + this.countCharacters(result));

        return result;
    }

    countCharacters(textArray) {
        let count = 0;

        for (const line of textArray) {
            count += line.length;
        }

        return count;
    }
}

class SmartTextReaderLocker {
    constructor(blockedRegex, reader) {
        this.blockedRegex = blockedRegex;
        this.reader = reader || new SmartTextReader();
    }

    readFile(filePath) {
        if (this.blockedRegex.test(filePath)) {
            console.log('Доступ заборонено!');
            return null;
        }

        return this.reader.readFile(filePath);
    }
}

function prepareProxyFiles() {
    const dataPath = path.join(__dirname, '..', 'data');

    if (!fs.existsSync(dataPath)) {
        fs.mkdirSync(dataPath);
    }

    fs.writeFileSync(path.join(dataPath, 'text.txt'), 'Привіт\nСвіт\nПатерн Проксі', 'utf8');
    fs.writeFileSync(path.join(dataPath, 'secret.txt'), 'Цей файл має бути заблокований', 'utf8');

    return {
        textPath: path.join(dataPath, 'text.txt'),
        secretPath: path.join(dataPath, 'secret.txt')
    };
}

function printTextArray(textArray) {
    if (textArray === null) {
        return;
    }

    for (const line of textArray) {
        console.log(line.join(''));
    }
}

function runProxyDemo() {
    const files = prepareProxyFiles();
    const reader = new SmartTextReader();

    console.log('Читання text.txt через SmartTextChecker:');
    const checker = new SmartTextChecker(reader);
    const checkedText = checker.readFile(files.textPath);
    printTextArray(checkedText);

    console.log('\nСпроба прочитати secret.txt через SmartTextReaderLocker:');
    const locker = new SmartTextReaderLocker(/secret\.txt$/, reader);
    locker.readFile(files.secretPath);

    console.log('\nЧитання text.txt через SmartTextReaderLocker:');
    const allowedText = locker.readFile(files.textPath);
    printTextArray(allowedText);
}

module.exports = {
    SmartTextReader,
    SmartTextChecker,
    SmartTextReaderLocker,
    runProxyDemo,
    run: runProxyDemo
};
