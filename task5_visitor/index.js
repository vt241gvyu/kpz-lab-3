class Shape {
    accept(_visitor) {}
}

class Circle extends Shape {
    constructor(radius) {
        super();
        this.radius = radius;
    }

    accept(visitor) {
        return visitor.visitCircle(this);
    }
}

class Rectangle extends Shape {
    constructor(width, height) {
        super();
        this.width = width;
        this.height = height;
    }

    accept(visitor) {
        return visitor.visitRectangle(this);
    }
}

class Triangle extends Shape {
    constructor(base, height) {
        super();
        this.base = base;
        this.height = height;
    }

    accept(visitor) {
        return visitor.visitTriangle(this);
    }
}

class AreaVisitor {
    visitCircle(circle) {
        return Math.PI * circle.radius * circle.radius;
    }

    visitRectangle(rectangle) {
        return rectangle.width * rectangle.height;
    }

    visitTriangle(triangle) {
        return triangle.base * triangle.height / 2;
    }
}

class XmlExportVisitor {
    visitCircle(circle) {
        return '<circle radius="' + circle.radius + '"/>';
    }

    visitRectangle(rectangle) {
        return '<rectangle width="' + rectangle.width + '" height="' + rectangle.height + '"/>';
    }

    visitTriangle(triangle) {
        return '<triangle base="' + triangle.base + '" height="' + triangle.height + '"/>';
    }
}

function runVisitorDemo() {
    const shapes = [
        new Circle(5),
        new Rectangle(4, 7),
        new Triangle(6, 8)
    ];

    const areaVisitor = new AreaVisitor();
    const xmlVisitor = new XmlExportVisitor();

    for (const shape of shapes) {
        console.log('Area:', shape.accept(areaVisitor).toFixed(2));
        console.log('XML:', shape.accept(xmlVisitor));
    }
}

module.exports = {
    Shape,
    Circle,
    Rectangle,
    Triangle,
    AreaVisitor,
    XmlExportVisitor,
    runVisitorDemo,
    run: runVisitorDemo
};

if (require.main === module) {
    runVisitorDemo();
}
