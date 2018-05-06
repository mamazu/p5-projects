const BOARD_SIZE = 40;
var tiles = [];
let brushColor;

function getTileAt(x, y) {
    if (x >= width/ BOARD_SIZE || x < 0){
        return undefined;
    }
    let index = x + width / BOARD_SIZE * y;
    return tiles[index];
}

function setColor(color) {
    brushColor.innerHTML = color;
}

function getColor() {
    switch (brushColor.innerHTML) {
        case 'red':
            return color(255, 0, 0);
        case 'green':
            return color(0, 255, 0);
        case 'yellow':
            return color(255, 255, 0);
    }
}

class Tile {
    constructor(x, y) {
        this.color = randomColor();
        this.pos = createVector(x, y);
        this.updated = false;
    }

    hasSameColor(color) {
        let r = this.color.levels[0] === color.levels[0];
        let g = this.color.levels[1] === color.levels[1];
        let b = this.color.levels[2] === color.levels[2];

        return r && g && b;
    }

    update(){
        if(!this.updated){
            return;
        }
        this.color = getColor();
        this.updated = false;
    }

    floodFill() {
        let scaledX = this.pos.x / BOARD_SIZE;
        let scaledY = this.pos.y / BOARD_SIZE;
        for (let x = scaledX - 1; x <= scaledX + 1; x++) {
            for (let y = scaledY - 1; y <= scaledY + 1; y++) {
                let tile = getTileAt(x, y);
                if (tile === undefined)
                    continue;
                if (this.hasSameColor(tile.color) && !tile.updated) {
                    tile.updated = true;
                    tile.floodFill();
                }
            }
        }
    }

    show() {
        fill(this.color);
        rect(this.pos.x, this.pos.y, BOARD_SIZE, BOARD_SIZE);
    }
}

function setup() {
    createCanvas(800, 800);
    frameRate(5);
    for (let y = 0; y < height; y += BOARD_SIZE) {
        for (let x = 0; x < width; x += BOARD_SIZE) {
            tiles.push(new Tile(x, y));
        }
    }
}

function draw() {
    background(0);
    tiles.forEach(function (e) {
        e.update();
        e.show();
    });
}

function randomColor() {
    let colors = [[0, 255, 0], [255, 0, 0], [255, 255, 0]];
    return color(random(colors));
}

function mouseClicked() {
    tiles[0].floodFill();
}