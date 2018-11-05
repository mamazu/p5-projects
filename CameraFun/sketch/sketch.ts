let sketch = (p: p5) => {
    let capture: p5.Element;
    let debugElement: HTMLElement;

    p.setup = () => {
        p.createCanvas(250, 150);
        let cap = p.createCapture('VIDEO', () => { });
        if (cap instanceof p5.Element) {
            capture = cap;
        }

        capture.size(250, 150);
        // capture.hide();

        p.frameRate(5);

        let element = document.getElementById('debug');
        if (element !== null) {
            debugElement = element;
        }
    };

    p.draw = () => {
        p.background(0);

        p.image(capture, 0, 0);

        p.loadPixels();
        let returnValue = blur();
        p.updatePixels();

        if (debugElement !== undefined) {
            debugElement.innerHTML = JSON.stringify(returnValue);
        }
    };

    function grayScale() {
        let luminecense = 0;
        for (let i = 0; i < p.pixels.length; i += 4) {
            let red = p.pixels[i]
            let green = p.pixels[i + 1]
            let blue = p.pixels[i + 2]

            let gray = Math.floor((red + green + blue) / 3);

            p.pixels[i] = gray;
            p.pixels[i + 1] = gray;
            p.pixels[i + 2] = gray;

            luminecense += gray;
        }

        return luminecense / (p.pixels.length / 4);
    }

    function blur() {
        for (let x = 1; x < p.width - 1; x += 2) {
            for (let y = 1; y < p.height - 1; y += 2) {
                let fields: number[][] = [];

                fields.push(getPixel(x - 1, y + 1));
                fields.push(getPixel(x, y + 1));
                fields.push(getPixel(x + 1, y + 1));
                // Middle row
                fields.push(getPixel(x - 1, y));
                fields.push(getPixel(x, y));
                fields.push(getPixel(x + 1, y));
                // Last row
                fields.push(getPixel(x - 1, y));
                fields.push(getPixel(x, y));
                fields.push(getPixel(x + 1, y));

                let red = 0, green = 0, blue = 0;
                for (let field of fields) {
                    red += field[0];
                    green += field[1] * 2;
                    blue += field[2]
                }

                const factor = fields.length * 2;
                const color = p.color(red / factor, green / factor, blue / factor);
                // console.log(color.levels);
                p.set(x, y, color);
            }
        }
    }

    function getPixel(x: number, y: number): number[] {
        let color = p.get(x, y);
        if (color instanceof p5.Image) {
            return [];
        }
        return color
    }

};

let sketchP = new p5(sketch);