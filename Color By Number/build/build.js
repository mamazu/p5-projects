"use strict";
class ColoredImage {
    constructor(originalImage) {
        this.colorList = [];
        this.originalImage = originalImage;
        this.originalImage.loadPixels();
        this.currentImage = sketchP.createImage(this.originalImage.width, this.originalImage.height);
        this.currentImage.loadPixels();
        const originalPixels = this.originalImage.pixels;
        for (let i = 0; i < this.originalImage.pixels.length; i += 4) {
            const pixels = [originalPixels[i], originalPixels[i + 1], originalPixels[i + 2], originalPixels[i + 3]];
            if (pixels[0] === 0 && pixels[1] === 0 && pixels[2] === 0 && pixels[3] === 255) {
                this.currentImage.pixels[i] = pixels[i];
                this.currentImage.pixels[i + 1] = pixels[1];
                this.currentImage.pixels[i + 2] = pixels[2];
                this.currentImage.pixels[i + 3] = pixels[3];
            }
            else {
                this.addColorToColorList(sketchP.color(pixels[0], pixels[1], pixels[2], 255));
            }
        }
        this.currentImage.updatePixels();
    }
    addColorToColorList(color) {
        if (color.toString() === 'rgba(255,255,255,1)') {
            return;
        }
        for (let currentColor of this.colorList) {
            if (currentColor.toString() === color.toString())
                return;
        }
        console.log(color.toString());
        this.colorList.push(color);
    }
    getColorAtPosition(vector) {
        const index = (vector.x + vector.y * this.currentImage.height) * 4;
        const levels = this.originalImage.pixels.slice(index, index + 4);
        return sketchP.color(...levels);
    }
    colorAtPoint(vector) {
        const color = this.getColorAtPosition(vector);
        if (color.toString() === 'rgba(0,0,0,1)') {
            return;
        }
        this.currentImage.set(vector.x, vector.y, color);
    }
    getCurrentImage() {
        this.currentImage.updatePixels();
        return this.currentImage;
    }
}
let sketch = (p) => {
    let img;
    let imageToColor;
    p.preload = () => {
        img = p.loadImage('images/test.png');
    };
    p.setup = () => {
        p.createCanvas(700, 700);
        imageToColor = new ColoredImage(img);
        p.frameRate(25);
    };
    p.mouseClicked = () => {
        imageToColor.colorAtPoint(p.createVector(p.mouseX, p.mouseY));
    };
    p.draw = () => {
        p.background(255);
        p.image(imageToColor.getCurrentImage(), 0, 0);
    };
};
let sketchP = new p5(sketch);
//# sourceMappingURL=build.js.map