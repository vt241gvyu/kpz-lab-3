class Hero {
    getDescription() {
        return 'Невідомий герой';
    }

    getPower() {
        return 0;
    }
}

class Warrior extends Hero {
    getDescription() {
        return 'Воїн';
    }

    getPower() {
        return 20;
    }
}

class Mage extends Hero {
    getDescription() {
        return 'Маг';
    }

    getPower() {
        return 15;
    }
}

class Palladin extends Hero {
    getDescription() {
        return 'Паладин';
    }

    getPower() {
        return 18;
    }
}

class InventoryDecorator extends Hero {
    constructor(hero) {
        super();
        this.hero = hero;
    }

    getDescription() {
        return this.hero.getDescription();
    }

    getPower() {
        return this.hero.getPower();
    }
}

class Sword extends InventoryDecorator {
    getDescription() {
        return this.hero.getDescription() + ' + меч';
    }

    getPower() {
        return this.hero.getPower() + 10;
    }
}

class Armor extends InventoryDecorator {
    getDescription() {
        return this.hero.getDescription() + ' + броня';
    }

    getPower() {
        return this.hero.getPower() + 7;
    }
}

class MagicRing extends InventoryDecorator {
    getDescription() {
        return this.hero.getDescription() + ' + магічний перстень';
    }

    getPower() {
        return this.hero.getPower() + 6;
    }
}

class Helmet extends InventoryDecorator {
    getDescription() {
        return this.hero.getDescription() + ' + шолом';
    }

    getPower() {
        return this.hero.getPower() + 4;
    }
}

class Amulet extends InventoryDecorator {
    getDescription() {
        return this.hero.getDescription() + ' + амулет';
    }

    getPower() {
        return this.hero.getPower() + 5;
    }
}

function showHero(hero) {
    console.log(hero.getDescription());
    console.log('Сила:', hero.getPower());
}

function runDecoratorDemo() {
    const simpleWarrior = new Warrior();
    console.log('Воїн без інвентарю:');
    showHero(simpleWarrior);

    let warrior = new Warrior();
    warrior = new Sword(warrior);
    warrior = new Armor(warrior);
    warrior = new MagicRing(warrior);

    console.log('\nВоїн з інвентарем:');
    showHero(warrior);

    let mage = new Mage();
    mage = new MagicRing(mage);
    mage = new Amulet(mage);
    mage = new Helmet(mage);

    console.log('\nМаг з інвентарем:');
    showHero(mage);

    let palladin = new Palladin();
    palladin = new Sword(palladin);
    palladin = new Armor(palladin);
    palladin = new Helmet(palladin);
    palladin = new Amulet(palladin);

    console.log('\nПаладин з інвентарем:');
    showHero(palladin);
}

module.exports = {
    Hero,
    Warrior,
    Mage,
    Palladin,
    InventoryDecorator,
    Sword,
    Armor,
    MagicRing,
    Helmet,
    Amulet,
    runDecoratorDemo,
    run: runDecoratorDemo
};
