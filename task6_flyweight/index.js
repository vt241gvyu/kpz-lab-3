const fs = require('fs');
const path = require('path');
const process = require('process');

class LightTextNode {
    constructor(text) {
        this.text = text;
    }

    outerHTML() {
        return this.text;
    }
}

class LightDocument {
    constructor() {
        this.children = [];
    }

    addChild(node) {
        this.children.push(node);
    }

    innerHTML() {
        let html = '';

        for (const child of this.children) {
            html += child.outerHTML();
        }

        return html;
    }
}

class NormalLightElementNode {
    constructor(tagName, displayType, closingType, cssClasses) {
        this.tagName = tagName;
        this.displayType = displayType;
        this.closingType = closingType;
        this.cssClasses = cssClasses || [];
        this.children = [];
    }

    addChild(node) {
        this.children.push(node);
    }

    innerHTML() {
        let html = '';

        for (const child of this.children) {
            html += child.outerHTML();
        }

        return html;
    }

    outerHTML() {
        let classText = '';

        if (this.cssClasses.length > 0) {
            classText = ' class="' + this.cssClasses.join(' ') + '"';
        }

        return '<' + this.tagName + classText + '>' + this.innerHTML() + '</' + this.tagName + '>';
    }
}

class LightElementType {
    constructor(tagName, displayType, closingType, cssClasses) {
        this.tagName = tagName;
        this.displayType = displayType;
        this.closingType = closingType;
        this.cssClasses = cssClasses || [];
    }
}

class LightElementFactory {
    constructor() {
        this.types = {};
    }

    getType(tagName, displayType, closingType, cssClasses) {
        const key = tagName + '_' + displayType + '_' + closingType + '_' + cssClasses.join('.');

        if (!this.types[key]) {
            this.types[key] = new LightElementType(tagName, displayType, closingType, cssClasses);
        }

        return this.types[key];
    }

    getTypesCount() {
        return Object.keys(this.types).length;
    }
}

class FlyweightLightElementNode {
    constructor(type) {
        this.type = type;
        this.children = [];
    }

    addChild(node) {
        this.children.push(node);
    }

    innerHTML() {
        let html = '';

        for (const child of this.children) {
            html += child.outerHTML();
        }

        return html;
    }

    outerHTML() {
        let classText = '';

        if (this.type.cssClasses.length > 0) {
            classText = ' class="' + this.type.cssClasses.join(' ') + '"';
        }

        return '<' + this.type.tagName + classText + '>' + this.innerHTML() + '</' + this.type.tagName + '>';
    }
}

function prepareBookFile() {
    const dataPath = path.join(__dirname, '..', 'data');
    const bookPath = path.join(dataPath, 'book.txt');

    if (!fs.existsSync(dataPath)) {
        fs.mkdirSync(dataPath);
    }

    const lines = ['Демо книги LightHTML'];

    for (let i = 1; i <= 50; i++) {
        if (i % 10 === 0) {
            lines.push('  Це цитата номер ' + i + ' з простої книги.');
        } else if (i % 7 === 0) {
            lines.push('Розділ ' + i);
        } else {
            lines.push('Це звичайний абзац номер ' + i + ' для перевірки легковагових вузлів.');
        }
    }

    fs.writeFileSync(bookPath, lines.join('\n'), 'utf8');

    return bookPath;
}

function getElementInfo(line, index) {
    if (index === 0) {
        return { tagName: 'h1', displayType: 'block', closingType: 'normal', cssClasses: ['title'] };
    }

    if (line.length < 20) {
        return { tagName: 'h2', displayType: 'block', closingType: 'normal', cssClasses: ['subtitle'] };
    }

    if (/^\s/.test(line)) {
        return { tagName: 'blockquote', displayType: 'block', closingType: 'normal', cssClasses: ['quote'] };
    }

    return { tagName: 'p', displayType: 'block', closingType: 'normal', cssClasses: ['paragraph'] };
}

function buildNormalTree(lines) {
    const root = new LightDocument();

    for (let i = 0; i < lines.length; i++) {
        const info = getElementInfo(lines[i], i);
        const element = new NormalLightElementNode(info.tagName, info.displayType, info.closingType, info.cssClasses);

        element.addChild(new LightTextNode(lines[i]));
        root.addChild(element);
    }

    return root;
}

function buildFlyweightTree(lines, factory) {
    const root = new LightDocument();

    for (let i = 0; i < lines.length; i++) {
        const info = getElementInfo(lines[i], i);
        const type = factory.getType(info.tagName, info.displayType, info.closingType, info.cssClasses);
        const element = new FlyweightLightElementNode(type);

        element.addChild(new LightTextNode(lines[i]));
        root.addChild(element);
    }

    return root;
}

function callGarbageCollector() {
    if (global.gc) {
        global.gc();
    }
}

function formatBytes(bytes) {
    return bytes + ' байт';
}

function runFlyweightDemo() {
    const bookPath = prepareBookFile();
    const bookText = fs.readFileSync(bookPath, 'utf8');
    const lines = bookText.split(/\r?\n/);

    callGarbageCollector();
    const normalBefore = process.memoryUsage().heapUsed;
    const normalTree = buildNormalTree(lines);
    const normalAfter = process.memoryUsage().heapUsed;
    const normalMemory = normalAfter - normalBefore;

    callGarbageCollector();
    const flyweightBefore = process.memoryUsage().heapUsed;
    const factory = new LightElementFactory();
    const flyweightTree = buildFlyweightTree(lines, factory);
    const flyweightAfter = process.memoryUsage().heapUsed;
    const flyweightMemory = flyweightAfter - flyweightBefore;

    console.log('Рядків у книзі:', lines.length);
    console.log("Пам'ять звичайного дерева:", formatBytes(normalMemory));
    console.log("Пам'ять легковагового дерева:", formatBytes(flyweightMemory));
    console.log('Приблизна різниця:', formatBytes(normalMemory - flyweightMemory));
    console.log('Створено легковагових типів:', factory.getTypesCount());

    console.log('\nПерші HTML-елементи:');
    for (let i = 0; i < 5 && i < flyweightTree.children.length; i++) {
        console.log(flyweightTree.children[i].outerHTML());
    }

    if (normalTree.children.length === 0) {
        console.log('Звичайне дерево порожнє');
    }
}

module.exports = {
    LightTextNode,
    LightDocument,
    NormalLightElementNode,
    LightElementType,
    LightElementFactory,
    FlyweightLightElementNode,
    runFlyweightDemo,
    run: runFlyweightDemo
};
