class Clock {
	constructor(outputBase) {
		this.time = 0;
		this.outputBase = outputBase;
	}

	tick() {
		this.time++;
	}

	_getTimeString() {
		let time = this.time;

		// This is not actually miliseconds but it looks cooler that way
		let ms = formatNumber(this.time % 60);
		time = (time - ms) / 60;

		let seconds = formatNumber(time % 60);
		time = (time - seconds) / 60;

		let minutes = formatNumber(time % 60);
		time = (time - minutes) / 60;

		let hours = time

		return `${hours}:${minutes}:${seconds}.${ms}`;
	}

	logBase(x) {
		return log(x) / log(this.outputBase);
	}

	drawBlocks(textString) {
		let numbers = textString.replace(/\D/g, '');
		console.log(numbers);
		let maxNum = ceil(this.logBase(10));
		let blocksWidth = width / numbers.length;
		let blocksHeight = height / maxNum;
		for (let i = 0; i < numbers.length; i++) {
			let number = numbers[i];
			while (number > 0) {
				let place = floor(this.logBase(number));
				rect(i * blocksWidth, place * blocksHeight, blocksWidth, blocksHeight);
				number -= pow(this.outputBase, place);
			}
		}
	}

	draw() {
		let textString = this._getTimeString();

		fill(255, 255, 255, 125);
		stroke(0, 255, 0, 124);
		strokeWeight(10);
		this.drawBlocks(textString);

		fill(255, 0, 0);
		noStroke();
		text(textString, width / 2, height / 2);
	}
}

function formatNumber(number) {
	return number < 10 ? `0${number}` : number;
}