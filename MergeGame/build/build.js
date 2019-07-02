"use strict";
class Circle {
    constructor(position) {
        this.level = 0;
        this.radius = 20;
        this.bgColor = sketchP.color(255);
        this.position = position ? position : getRandomPosition();
        this.destination = undefined;
    }
    upgrade() {
        this.bgColor = sketchP.color(255, 0, 0);
        this.level += 1;
        this.destination = undefined;
    }
    overlaps(otherCircle) {
        const otherPosition = otherCircle.position;
        let pow = sketchP.pow;
        return pow(this.position.x - otherPosition.x, 2) + pow(this.position.y - otherPosition.y, 2) <= pow((this.radius + otherCircle.radius) * 0.8, 2);
    }
    contains(vector) {
        let pow = sketchP.pow;
        return pow(this.position.x - vector.x, 2) + pow(this.position.y - vector.y, 2) <= pow(this.radius, 2);
    }
    setDestination(destination) {
        this.destination = destination;
        this.bgColor = sketchP.color(255, 0, 0);
    }
    update() {
        if (this.destination === undefined) {
            return;
        }
        else if (distance(this.position, this.destination) < 5) {
            this.destination = undefined;
            return;
        }
        let heading = p5.Vector.sub(this.destination, this.position);
        let speed = sketchP.max(heading.mag() / 10, 5);
        heading.setMag(speed);
        this.position.add(heading);
    }
    draw() {
        sketchP.fill(this.bgColor);
        sketchP.ellipse(this.position.x, this.position.y, this.radius);
        if (this.destination !== undefined && debug) {
            sketchP.line(this.position.x, this.position.y, this.destination.x, this.destination.y);
        }
        sketchP.fill(sketchP.color(0));
        sketchP.text(String(this.level), this.position.x, this.position.y);
    }
}
function getRandomPosition() {
    const x = sketchP.random(0, sketchP.height);
    const y = sketchP.random(0, sketchP.width);
    return sketchP.createVector(x, y);
}
function distance(v1, v2) {
    return sketchP.dist(v1.x, v1.y, v2.x, v2.y);
}
class CircleList {
    constructor() {
        this.circles = [];
    }
    addCircle(circle) {
        if (circle === undefined) {
            circle = new Circle();
        }
        if (this.circles[circle.level] === undefined) {
            this.circles[circle.level] = [];
        }
        this.circles[circle.level].push(circle);
    }
    *circleList() {
        for (let circles of this.circles) {
            for (let circle of circles) {
                yield circle;
            }
        }
    }
    update() {
        this.circles.forEach(circleList => circleList.forEach(c => c.update()));
        this.checkUpgrades();
    }
    getCircleAt(position) {
        for (let circle of this.circleList()) {
            if (circle.contains(position)) {
                return circle;
            }
        }
    }
    getValue() {
        let value = 0;
        this.circles.forEach((circleList, index) => {
            value += sketchP.round(sketchP.pow(3, index) * circleList.length);
        });
        return value;
    }
    magnetize() {
        for (let circleLevel of this.circles) {
            if (circleLevel.length < 2) {
                continue;
            }
            let circleLength = circleLevel.length;
            for (let i = 0; i < circleLength / 2; i++) {
                circleLevel[i].setDestination(circleLevel[circleLength - 1 - i].position);
            }
        }
    }
    checkUpgrades() {
        for (let circleList of this.circles) {
            for (let i = 0; i < circleList.length; i++) {
                const left = circleList[i];
                for (let j = i + 1; j < circleList.length; j++) {
                    const right = circleList[j];
                    if (left.overlaps(right)) {
                        left.upgrade();
                        circleList.splice(j, 1);
                        const firstCircle = circleList.splice(i, 1)[0];
                        this.addCircle(firstCircle);
                    }
                }
            }
        }
    }
    draw() {
        sketchP.textSize(25);
        this.circles.forEach(circleList => circleList.forEach(c => c.draw()));
    }
    toString() {
        let string = '';
        for (let level in this.circles) {
            let count = this.circles[level].length;
            string += `Level ${level}: ${count} <br />`;
        }
        return string;
    }
}
const debug = true;
let sketch = (p) => {
    const speed = 200;
    const circles = new CircleList();
    let selectedCircle;
    let statsP;
    p.setup = () => {
        p.createCanvas(600, 600);
        statsP = document.createElement('p');
        let parent = document.body;
        parent.appendChild(statsP);
        p.ellipseMode(p.RADIUS);
        p.textAlign(p.CENTER, p.CENTER);
        p.frameRate(20);
    };
    p.draw = () => {
        p.background(0);
        circles.update();
        circles.draw();
        p.textSize(45);
        p.fill(255, 0, 255);
        p.text(String(circles.getValue()), p.width / 2, 45);
        statsP.innerHTML = circles.toString();
    };
    p.mouseDragged = () => {
        if (selectedCircle !== undefined) {
            selectedCircle.position = p.createVector(p.mouseX, p.mouseY);
        }
    };
    p.mousePressed = () => {
        const mouseVector = p.createVector(p.mouseX, p.mouseY);
        if (p.mouseButton === p.CENTER) {
            circles.addCircle(new Circle(mouseVector));
        }
        selectedCircle = circles.getCircleAt(mouseVector);
    };
    p.mouseReleased = () => {
        selectedCircle = undefined;
        circles.checkUpgrades();
    };
    p.keyPressed = () => {
        if (p.keyCode === 77) {
            circles.magnetize();
        }
    };
};
let sketchP = new p5(sketch);
//# sourceMappingURL=build.js.map