class Shape {
    constructor(renderer) {
        this.renderer = renderer;
    }

    draw() {
        this.renderer.render('Shape');
    }
}

class Circle extends Shape {
    draw() {
        this.renderer.render('Коло');
    }
}

class Square extends Shape {
    draw() {
        this.renderer.render('Квадрат');
    }
}

class Triangle extends Shape {
    draw() {
        this.renderer.render('Трикутник');
    }
}

class VectorRenderer {
    render(shapeName) {
        console.log('Малюємо ' + shapeName + ' як векторну графіку');
    }
}

class RasterRenderer {
    render(shapeName) {
        console.log('Малюємо ' + shapeName + ' як пікселі');
    }
}

function runBridgeDemo() {
    const vectorRenderer = new VectorRenderer();
    const rasterRenderer = new RasterRenderer();

    const circleVector = new Circle(vectorRenderer);
    const circleRaster = new Circle(rasterRenderer);
    const squareVector = new Square(vectorRenderer);
    const triangleRaster = new Triangle(rasterRenderer);

    circleVector.draw();
    circleRaster.draw();
    squareVector.draw();
    triangleRaster.draw();
}

module.exports = {
    Shape,
    Circle,
    Square,
    Triangle,
    VectorRenderer,
    RasterRenderer,
    runBridgeDemo,
    run: runBridgeDemo
};
