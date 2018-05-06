class Point{
	constructor(position, pointColor){
		this.center = position;

		if(pointColor === undefined){
			this.color = color(random(255), random(255), random(255));
		} else {
			this.color = pointColor;
		}
	}

	draw(){
		fill(invertColor(this.color));
		ellipse(this.center.x, this.center.y, 5);
	}
}

class CircleList{
	constructor(){
		this.points = [];
	}

	clear(){
		this.points = [];
	}

	addCircle(circle){
		this.points.push(circle);
	}

	getDist(vec, point){
		return pow(vec.x - point.center.x, 2)+pow(vec.y - point.center.y, 2);
	}

	getColor(x, y){
		let color = undefined;
		let distance = Infinity;
		let pos = createVector(x, y);
		this.points.forEach((circle) => {
			let d = this.getDist(pos, circle);
			if(d < distance){
				distance = d;
				color = circle.color;
			}
		});
		return color;
	}

	draw(){
		for(let x = 0; x < width; x++){
			for(let y = 0; y < height; y++){
				let color = this.getColor(x, y);
				if(color !== undefined)
					set(x, y, color)
			}
		}
		updatePixels();
		this.points.forEach((c) => c.draw());
	}
}
