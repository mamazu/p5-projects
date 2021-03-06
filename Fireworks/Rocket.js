class Particle {
  constructor(position) {
    this.pos = position.copy();
    this.size = 2;

    // Create movement
    this.movement = this.randomUpwardsVector();
    this.movement.setMag(random(1, 2));

    this.lifetime = randomize(settings.lifeTime);
  }

  randomUpwardsVector() {
    let x = random(-1, 1);
    let y = random(-1, .35);
    return createVector(x, y);
  }

  isDone() {
    return this.lifetime <= 0;
  }

  update() {
    this.pos.add(this.movement);
    this.lifetime--;
  }

  draw() {
    ellipse(this.pos.x, this.pos.y, this.size);
  }
}

class Explosion {
  constructor(position) {
    this.pos = position;
    this.particles = [];
    this.createParticles(randomize(settings.particleCount));
    this.color = this.getRandomColor();
  }

  createParticles(amount) {
    this.particles = Array(floor(amount)).fill(0).map(x => new Particle(this.pos));
  }

  getRandomColor() {
    let levels = [];
    do {
      levels = Array(3).fill(0).map(x => random(255));
    } while (average(levels) < 255 / 2)
    return color(...levels);
  }

  isDone() {
    return this.particles.length === 0;
  }

  getParticleCount() {
    return this.particles.length;
  }

  update() {
    this.particles.forEach(particle => particle.update());
    this.particles = this.particles.filter(particle => !particle.isDone());
  }

  draw() {
    fill(this.color);
    this.particles.forEach(particle => particle.draw());
  }
}

class Rocket {
  constructor(position) {
    const x = random(width * 0.03, width * 0.97);
    const y = random(height * 0.05, height * 0.95);
    this.end_pos = createVector(x, y);
    this.setPosition(position);

    this.size = 5;
    this.speed = randomize(settings.rocketSpeed);
  }

  setPosition(position) {
    if (position === undefined) {
      // Start at the lower edge of the canvas
      this.pos = createVector(this.end_pos.x, height);
    } else {
      this.pos = position.copy();
    }
  }

  update() {
    this.pos.y -= this.speed;

    if (this.isDone()) {
      renderable.push(new Explosion(this.pos));
    }
  }

  isDone() {
    return this.pos.y < this.end_pos.y;
  }

  draw() {
    fill(255);
    ellipse(this.pos.x, this.pos.y, this.size);
  }
}

function average(array) {
  return array.reduce((p, c) => p + c, 0) / array.length;
}