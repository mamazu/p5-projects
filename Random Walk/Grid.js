class Grid {
	constructor(width, height) {
		this.fields = new Array(height);
		for(let y = 0; y < height; y++){
			this.fields[y] = new Array(width);
		}

		this.height = height;
		this.width = width;
	}

	/**
	 * 
	 * @param {p5.Vector} point 
	 */
	update(point) {
		this.fields[point.y][point.x] = true
	}

	contains(point){
		if(point.x < 0 || point.x >= this.width){
			return false;
		}
		if(point.y < 0 || point.t >= this.height){
			return false;
		}

		return true;
	}

	draw() {
		stroke(255);
		let fieldHeight = (height - 1) / this.height;
		let fieldWidth = (width - 1) / this.width;
		for (let y = 0; y < this.height; y++) {
			for (let x = 0; x < this.width; x++) {
				if(this.fields[y][x] != undefined){
					fill(255, 0, 0);
				}else{
					fill(0);
				}
				rect(fieldWidth * x, fieldHeight * y, fieldWidth, fieldHeight);
			}
		}
	}
}