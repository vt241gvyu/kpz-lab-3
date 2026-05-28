class DocumentState {
    constructor(name) {
        this.name = name;
    }

    publish(_document) {
        console.log('Publish is not allowed from ' + this.name + '.');
    }

    reject(_document) {
        console.log('Reject is not allowed from ' + this.name + '.');
    }

    archive(_document) {
        console.log('Archive is not allowed from ' + this.name + '.');
    }
}

class DraftState extends DocumentState {
    constructor() {
        super('Draft');
    }

    publish(document) {
        document.setState(new ModerationState());
    }
}

class ModerationState extends DocumentState {
    constructor() {
        super('Moderation');
    }

    publish(document) {
        document.setState(new PublishedState());
    }

    reject(document) {
        document.setState(new DraftState());
    }
}

class PublishedState extends DocumentState {
    constructor() {
        super('Published');
    }

    archive(document) {
        document.setState(new ArchivedState());
    }
}

class ArchivedState extends DocumentState {
    constructor() {
        super('Archived');
    }
}

class ArticleDocument {
    constructor(title) {
        this.title = title;
        this.state = new DraftState();
    }

    setState(state) {
        this.state = state;
        console.log(this.title + ' state: ' + this.state.name);
    }

    publish() {
        this.state.publish(this);
    }

    reject() {
        this.state.reject(this);
    }

    archive() {
        this.state.archive(this);
    }
}

function runStateDemo() {
    const article = new ArticleDocument('Module test report');
    console.log(article.title + ' state: ' + article.state.name);

    article.publish();
    article.reject();
    article.publish();
    article.publish();
    article.reject();
    article.archive();
    article.publish();
}

module.exports = {
    DocumentState,
    DraftState,
    ModerationState,
    PublishedState,
    ArchivedState,
    ArticleDocument,
    runStateDemo,
    run: runStateDemo
};

if (require.main === module) {
    runStateDemo();
}
