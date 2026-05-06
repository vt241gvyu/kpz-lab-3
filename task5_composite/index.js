class LightNode {
    outerHTML() {
        return '';
    }

    innerHTML() {
        return '';
    }
}

class LightTextNode extends LightNode {
    constructor(text) {
        super();
        this.text = text;
    }

    outerHTML() {
        return this.text;
    }

    innerHTML() {
        return this.text;
    }
}

class LightElementNode extends LightNode {
    constructor(tagName, displayType, closingType) {
        super();
        this.tagName = tagName;
        this.displayType = displayType;
        this.closingType = closingType;
        this.cssClasses = [];
        this.children = [];
    }

    addChild(node) {
        this.children.push(node);
    }

    addClass(className) {
        this.cssClasses.push(className);
    }

    getChildrenCount() {
        return this.children.length;
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

        if (this.closingType === 'selfClosing') {
            return '<' + this.tagName + classText + '/>';
        }

        return '<' + this.tagName + classText + '>' + this.innerHTML() + '</' + this.tagName + '>';
    }
}

function runCompositeDemo() {
    const div = new LightElementNode('div', 'block', 'normal');
    div.addClass('card');

    const title = new LightElementNode('h2', 'block', 'normal');
    title.addChild(new LightTextNode('Приклад LightHTML'));

    const paragraph = new LightElementNode('p', 'block', 'normal');
    paragraph.addChild(new LightTextNode('Це невелике дерево створене вручну.'));

    const list = new LightElementNode('ul', 'block', 'normal');

    const firstItem = new LightElementNode('li', 'block', 'normal');
    firstItem.addChild(new LightTextNode('Компонувальник має спільний базовий клас'));

    const secondItem = new LightElementNode('li', 'block', 'normal');
    secondItem.addChild(new LightTextNode('Елемент може містити інші вузли'));

    const thirdItem = new LightElementNode('li', 'block', 'normal');
    thirdItem.addChild(new LightTextNode('Текстовий вузол теж є LightNode'));

    list.addChild(firstItem);
    list.addChild(secondItem);
    list.addChild(thirdItem);

    div.addChild(title);
    div.addChild(paragraph);
    div.addChild(list);

    console.log('Повний HTML:');
    console.log(div.outerHTML());

    console.log('\nВнутрішній HTML:');
    console.log(div.innerHTML());

    console.log('\nКількість дочірніх елементів:', div.getChildrenCount());
}

module.exports = {
    LightNode,
    LightTextNode,
    LightElementNode,
    runCompositeDemo,
    run: runCompositeDemo
};
