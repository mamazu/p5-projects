class DiceRoller {
	constructor(multiplier) {
		this.value = undefined;
		this.multiplier = multiplier === undefined ? 1 : multiplier;
	}

	hasRolled() {
		return this.value !== undefined;
	}

	roll(sides) {
		this.value = floor(random(sides)) + 1;
	}

	getRolledValue() {
		return this.value;
	}

	setMultiplier(multiplier) {
		this.multiplier = multiplier;
	}

	getMultipliedValues() {
		return this.value * this.multiplier;
	}
}

class CountdownTimer {
	constructor(value) {
		this.value = value;
	}

	tick() {
		this.value--;
		if (this.value < 0) {
			this.value = 0;
		}
	}

	getValue() {
		return this.value;
	}

	getTime() {
		let minutes = floor(this.value / 60);
		if (minutes < 10) {
			minutes = `0${minutes}`;
		}
		let seconds = this.value % 60;
		if (seconds < 10) {
			seconds = `0${seconds}`;
		}
		return minutes + ':' + seconds;
	}
}