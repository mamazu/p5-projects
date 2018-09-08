let planetList;
let debug = true;
const GRAVITY_CONSTANT = 0.5;

class Planet {
  constructor(position, mass){
    this.position = position;
    this.mass = mass;
    this.movement = createVector();
  }

  update(otherPlanet){
    if(otherPlanet === undefined){return;}
    let direction = p5.Vector.sub(this.position, otherPlanet.position);
    let distance = ceil(direction.mag());
    if(distance > this.mass + otherPlanet.mass + 1){
      let force = (otherPlanet.mass * this.mass) / distance * GRAVITY_CONSTANT / 2;

      direction.setMag(force);
      otherPlanet.position.add(direction);
      otherPlanet.movement = direction;
      let otherDirection = p5.Vector.mult(direction, -1);
      this.position.add(otherDirection);
      this.movement = otherDirection;
    } else {
	  this.movement = createVector();
	}
  }

  avoidCollisons(planets){
    planets.forEach(planet => {
      let distance = p5.Vector.sub(this.position, planet.position);
      let collsionDistance = distance.mag();
      if(collsionDistance > this.mass + planet.mass){
        return;
      }
      collsionDistance = this.mass + planet.mass - collsionDistance;
      distance.setMag(collsionDistance);
      this.position.add(distance);
    });
  }

  show(){
    fill(60);
    strokeWeight(1);
    stroke(60);
    ellipse(this.position.x, this.position.y, this.mass);
    if(debug){
      this.movement.setMag(this.mass);
      let direction = p5.Vector.add(this.position, this.movement);
      stroke(255, 0, 255);
      strokeWeight(5);
      line(this.position.x, this.position.y, direction.x, direction.y)
    }
  }
}

class PlanetList{
    constructor(size){
      this.planets = [];
      if(size !== undefined){
        for (var i = 0; i < size; i++) {
          this.planets.push(new Planet(randomPosition(), random(10, 50)));
        }
      }
    }

    update(){
      for (var i = 0; i < this.planets.length; i++) {
        let currentPlanet = this.planets[i];
        for (var j = i+1; j < this.planets.length; j++) {
          let otherPlanet = this.planets[j];
          currentPlanet.update(otherPlanet);
        }
      }
      this.planets.forEach(planet => planet.update());
    }

    avoidCollisons(){
      this.planets.forEach(planet => planet.avoidCollisons(this.planets));
    }

    show(){
      this.planets.forEach(planet => planet.show());
    }
}

function setup(){
  createCanvas(800, 800);
  ellipseMode(RADIUS);
  planetList = new PlanetList(10);
}

function draw(){
  background(255);

  planetList.update();
  planetList.avoidCollisons();
  planetList.show();

}

// Helper functions
function randomPosition(){
  return createVector(random(width), random(height));
}
