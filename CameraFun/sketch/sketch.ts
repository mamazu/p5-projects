let sketch = (p: p5) => {
    let capture: p5.Element;

    p.setup = () => {
        p.createCanvas(400, 700);
        let cap = p.createCapture('VIDEO', () => {});
        if(cap instanceof p5.Element){
            capture = cap;
        }
        capture.size(400, 700);
        capture.hide();
    };
    
    p.draw = () => {
        p.image(capture, 0, 0);

        p.loadPixels();
        analyse();
        p.updatePixels();
    };

    function analyse() {
        for(let i = 0; i < p.pixels.length; i+=3){
            let red = p.pixels[i]
            let green = p.pixels[i + 1]
            let blue = p.pixels[i + 2]

            let gray = Math.floor((red + green + blue) / 3);
            
            p.pixels[i] = gray;
            p.pixels[i + 1] = gray;
            p.pixels[i + 2] = gray;
        }
        console.log(p.pixels);
    }
};

let sketchP = new p5(sketch);
