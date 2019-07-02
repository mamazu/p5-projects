const debug = true;

let sketch = (p: p5) => {
  const speed = 200;
  const circles = new CircleList();
  let selectedCircle: Circle | undefined;
  let statsP: HTMLElement;

  p.setup = () => {
    p.createCanvas(600, 600);
    statsP = document.createElement('p')

    let parent = document.body;
    parent.appendChild(statsP);

    p.ellipseMode(p.RADIUS);
    p.textAlign(p.CENTER, p.CENTER);
    p.frameRate(20);

    // setInterval(() => circles.addCircle(), speed);
  }

  p.draw = () => {
    p.background(0);

    circles.update();
    circles.draw();

    p.textSize(45);
    p.fill(255, 0, 255);
    p.text(String(circles.getValue()), p.width / 2, 45);
    statsP.innerHTML = circles.toString();
  }

  p.mouseDragged = () => {
    if (selectedCircle !== undefined) {
      selectedCircle.position = p.createVector(p.mouseX, p.mouseY);
    }
  }

  p.mousePressed = () => {
    const mouseVector = p.createVector(p.mouseX, p.mouseY);
    if (p.mouseButton === p.CENTER) {
      circles.addCircle(new Circle(mouseVector))
    }
    selectedCircle = circles.getCircleAt(mouseVector);
  }

  p.mouseReleased = () => {
    selectedCircle = undefined;
    circles.checkUpgrades()
  }

  p.keyPressed = () => {
    // Code 77 = M
    if (p.keyCode === 77) {
      circles.magnetize();
    }
  }

};

let sketchP = new p5(sketch);