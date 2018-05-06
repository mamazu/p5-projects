class Particle {
  constructor(position) {
    this.pos = position.copy();
    this.size = 5;

    // Create movement
    let x = random(-1, 1);
    let y = random(-1, 1);
    this.movement = createVector(x, y);
    this.movement.setMag(random(1, 2));
  }

  is_inside_canvas() {
    let x_out = this.pos.x < -this.size || this.pos.x > width + this.size;
    let y_out = this.pos.y < -this.size || this.pos.y > height + this.size;

    return !(x_out || y_out);
  }

  update() {
    this.pos.add(this.movement);
  }

  draw() {
    ellipse(this.pos.x, this.pos.y, this.size);
  }
}

class Explosion {
  constructor(position) {
    this.pos = position;
    this.particles = [];
    this.create_particles(randomize(settings.particleCount));
    this.color = this.get_random_color();
  }

  create_particles(amount) {
    for (let i = 0; i < amount; i++) {
      this.particles.push(new Particle(this.pos));
    }
  }

  get_random_color() {
    return color(random(255), random(255), random(255));
  }

  is_done() {
    return this.particles.length === 0;
  }

  update() {
    this.particles.forEach(particle => particle.update());
    this.particles = this.particles.filter(particle => particle.is_inside_canvas());
  }

  draw() {
    fill(this.color);
    this.particles.forEach(particle => particle.draw());
  }
}

class Rocket {
  constructor(position) {
    let x = random(height * 0.05, height * 0.95);
    let y = random(width * 0.05, width * 0.95);
    this.end_pos = createVector(x, y);

    if (position === undefined) {
      this.pos = createVector(this.end_pos.x, height);
    } else {
      this.pos = position.copy();
    }

    this.size = 5;
    this.speed = randomize(settings.rocketSpeed);
  }

  update() {
    this.pos.y -= this.speed;
  }

  is_done() {
    if (this.pos.y < this.end_pos.y) {
      renderable.push(new Explosion(this.pos));
      return true;
    }
    return false;
  }

  draw() {
    fill(255);
    ellipse(this.pos.x, this.pos.y, this.size);
  }
}