let planetList;
let debug = true;
const GRAVITY_CONSTANT = 0.5;

class PlanetList{
    constructor(size){
      this.planets = [];
      if(size !== undefined){
        for (var i = 0; i < size; i++) {
          this.planets.push(new Planet(randomPosition(), random(10, 50)));
        }
      }
    }

    addPlanet(planet) {
      this.planets.push(planet);
    }

    update(){
      for (var i = 0; i < this.planets.length; i++) {
        let currentPlanet = this.planets[i];
        for (var j = i+1; j < this.planets.length; j++) {
          let otherPlanet = this.planets[j];
          currentPlanet.update(otherPlanet);
        }
      }
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
  planetList = new PlanetList();
  planetList.addPlanet(new Planet(createVector(width/2, height/2), 10));

  let orbiter = new Planet(createVector(width/2 + 100, height/2 + 100), 10); 
  orbiter.addForce(createVector(10, 10));
  planetList.addPlanet(orbiter);
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
