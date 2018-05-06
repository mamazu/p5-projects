const FULL_CIRCLE = 360;

class Circle {
  constructor(center, radius) {
    this.points = [];
    this.center = center;
    this.radius = radius;
    this.precision = 3;
  }

  addPoint() {
    console.log('Override this class');
  }

  getPointsLeft() {
    console.log('Override this class');
    return -1;
  }

  show() {
    beginShape();
    this.points.forEach(point => {
      if (point !== undefined) {
        vertex(point.x, point.y)
      }
    });
    endShape(CLOSE);
  }
}

class OrderedCircle extends Circle {
  constructor(center, radius) {
    super(center, radius);

    this.angle = 0;
  }

  addPoint() {
    if (this.angle >= FULL_CIRCLE) {
      return;
    }
    // Add point at current angle
    this.points.push(getPointFromAngle(this.angle, this.radius, this.center));

    this.angle += this.precision;
  }

  getPointsLeft() {
    let pointsLeft = FULL_CIRCLE / this.precision - this.points.length;
    return max(pointsLeft, 0);
  }
}

class RandomCircle extends Circle {
  constructor(center, radius) {
    super(center, radius);

    this.pointsLeft = [];
    this.generatePoints();
  }

  generatePoints() {
    for (let angle = 0; angle < FULL_CIRCLE; angle += this.precision) {
      let points = getPointFromAngle(angle, this.radius, this.center);
      this.pointsLeft.push(points);
    }
  }

  addPoint() {
    if (this.getPointsLeft() === 0) {
      return;
    }
    do {
      var index = random(this.pointsLeft.length) | 0;
      var point = this.pointsLeft[index];
    } while (point === undefined);
    this.pointsLeft[index] = undefined;
    this.points[index] = point;
  }

  getPointsLeft() {
    let pointsLeft = 0;
    this.pointsLeft.forEach(point => {
      pointsLeft += ((point === undefined) ? 0 : 1);
    });
    return pointsLeft;
  }
}

class PreciseCircle extends Circle {
  constructor(center, radius) {
    super(center, radius);

    this.intervalsLeft = [
      [0, 360]
    ]
    this.getPointFromAngle = angle => getPointFromAngle(angle, radius, center)
  }

  addPoint() {
    if (this.intervalsLeft.length === 0) {
      return;
    }

    let nextInterval = this.intervalsLeft.pop();

    this.getNextInterval(nextInterval);

    let midPoint = this.getMidPoint(nextInterval);
    let newPoint = this.getPointFromAngle(midPoint);
    this.points[floor(midPoint)] = newPoint;

    // this.sortPoints();
  }

  getNextInterval(interval) {
    let newInterval = this.split(interval);
    if (this.getSize(newInterval[0]) <= this.precision) {
      return;
    }

    this.intervalsLeft = this.intervalsLeft.concat(newInterval)
  }

  split(interval) {
    let midPoint = this.getMidPoint(interval);

    let leftInterval = [interval[0], midPoint];
    let rightInterval = [midPoint, interval[1]];

    return [leftInterval, rightInterval];
  }

  getMidPoint(interval) {
    return (interval[0] + interval[1]) / 2;
  }

  getSize(interval) {
    return abs(interval[0] - interval[1]);
  }

  getPointsLeft() {
    return this.intervalsLeft.length;
  }
}

function getPointFromAngle(angle, radius, center) {
  let x = radius * cos(angle) + center.x;
  let y = radius * sin(angle) + center.y;

  return createVector(x, y);
}