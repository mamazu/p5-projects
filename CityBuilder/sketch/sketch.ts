let sketch = (p: p5) => {

    p.setup = () => {
        p.createCanvas(700, 700);
    };

    p.draw = () => {
        p.background(100);
    };
};

let sketchP = new p5(sketch);
