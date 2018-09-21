class Clock {
	constructor(outputBase) {
		this.time = 0;
		this.showMiliseconds = false;
		this.baseConverter = new BaseConverter(outputBase);
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

		if (this.showMiliseconds)
			return `${hours}:${minutes}:${seconds}.${ms}`;
		else
			return `${hours}:${minutes}:${seconds}`;
	}

	logBase(x) {
		return log(x) / log(this.baseConverter.base);
	}

	drawBlocks(textString) {
		let numbers = textString.split(/\D/).map(Number);
		let maxNum = ceil(this.logBase(60));
		let blocksWidth = width / numbers.length;
		let blocksHeight = height / maxNum;
		for (let i = 0; i < numbers.length; i++) {
			let number = numbers[i];
			while (number > 0) {
				let place = floor(this.logBase(number));
				let placeValues = pow(this.baseConverter.base, place)
				let multiplier = floor(number / placeValues);
				number -= placeValues * multiplier;

				this.baseConverter.selectColor(multiplier)
				rect(i * blocksWidth, place * blocksHeight, blocksWidth, blocksHeight);
			}
		}
	}

	draw() {
		let textString = this._getTimeString();

		// fill(255, 255, 255, 125);
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

class BaseConverter {
	constructor(base) {
		this.base = base;
	}
	selectColor(multiplier) {
		switch (multiplier) {
			case 1:
				fill(255, 255, 255, 125);
				break;
			case 2:
				fill(0, 0, 255);
				break;
		}
	}
}