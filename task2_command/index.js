class TextDocument {
    constructor() {
        this.content = '';
    }

    insert(position, text) {
        this.content = this.content.slice(0, position) + text + this.content.slice(position);
    }

    delete(position, length) {
        const removedText = this.content.slice(position, position + length);
        this.content = this.content.slice(0, position) + this.content.slice(position + length);
        return removedText;
    }
}

class Command {
    execute() {}

    undo() {}
}

class InsertTextCommand extends Command {
    constructor(document, position, text) {
        super();
        this.document = document;
        this.position = position;
        this.text = text;
    }

    execute() {
        this.document.insert(this.position, this.text);
    }

    undo() {
        this.document.delete(this.position, this.text.length);
    }
}

class DeleteTextCommand extends Command {
    constructor(document, position, length) {
        super();
        this.document = document;
        this.position = position;
        this.length = length;
        this.deletedText = '';
    }

    execute() {
        this.deletedText = this.document.delete(this.position, this.length);
    }

    undo() {
        this.document.insert(this.position, this.deletedText);
    }
}

class MacroCommand extends Command {
    constructor(commands) {
        super();
        this.commands = commands;
    }

    execute() {
        for (const command of this.commands) {
            command.execute();
        }
    }

    undo() {
        for (let i = this.commands.length - 1; i >= 0; i -= 1) {
            this.commands[i].undo();
        }
    }
}

class EditorInvoker {
    constructor(document) {
        this.document = document;
        this.history = [];
    }

    run(command) {
        command.execute();
        this.history.push(command);
        console.log(this.document.content);
    }

    undo() {
        const command = this.history.pop();

        if (!command) {
            return;
        }

        command.undo();
        console.log(this.document.content);
    }
}

function runCommandDemo() {
    const document = new TextDocument();
    const editor = new EditorInvoker(document);

    editor.run(new InsertTextCommand(document, 0, 'Behavioral patterns'));
    editor.run(new InsertTextCommand(document, document.content.length, ': Iterator, Command, State'));
    editor.run(new DeleteTextCommand(document, 0, 11));

    console.log('Undo last two commands:');
    editor.undo();
    editor.undo();

    console.log('Macro command:');
    editor.run(new MacroCommand([
        new InsertTextCommand(document, document.content.length, ', Template Method'),
        new InsertTextCommand(document, document.content.length + 17, ', Visitor')
    ]));
}

module.exports = {
    TextDocument,
    Command,
    InsertTextCommand,
    DeleteTextCommand,
    MacroCommand,
    EditorInvoker,
    runCommandDemo,
    run: runCommandDemo
};

if (require.main === module) {
    runCommandDemo();
}
