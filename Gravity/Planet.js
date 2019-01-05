class Planet {
    constructor(position, mass) {
        this.position = position;
        this.mass = mass;
        this.movement = createVector();
    }

    update(otherPlanet) {
        let direction = p5.Vector.sub(this.position, otherPlanet.position);
        let distance = ceil(direction.mag());
        let force = (otherPlanet.mass * this.mass) / distance * GRAVITY_CONSTANT / 2;

        direction.setMag(force);
        let otherDirection = p5.Vector.mult(direction, -1);

        // otherPlanet.position.add(otherDirection);
        otherPlanet.movement.add(direction);

        this.position.add(this.movement);
        this.movement = otherDirection;
    }

    addForce(forceVector) {
        this.movement.add(forceVector);
    }

    avoidCollisons(planets) {
        planets.forEach(planet => {
            let distance = p5.Vector.sub(this.position, planet.position);
            let collsionDistance = distance.mag();
            if (collsionDistance > this.mass + planet.mass) {
                return;
            }
            collsionDistance = this.mass + planet.mass - collsionDistance;
            distance.setMag(collsionDistance);
            this.position.add(distance);
        });
    }

    show() {
        fill(60);
        strokeWeight(1);
        stroke(60);
        ellipse(this.position.x, this.position.y, this.mass);
        if (debug) {
            this.movement.setMag(this.mass);
            let direction = p5.Vector.add(this.position, this.movement);
            stroke(255, 0, 255);
            strokeWeight(5);
            line(this.position.x, this.position.y, direction.x, direction.y)
        }
    }
}