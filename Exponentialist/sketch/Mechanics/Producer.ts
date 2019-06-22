/// <reference path="Resource.ts" />

class Producer extends Resource {
	private outputResource: Resource;
	private outputFactor: number;
	private timeToProduce: number;
	private currentTime: number;

	constructor(producerName: string, output: Resource) {
		super(producerName);
		this.timeToProduce = 100;
		this.outputResource = output;
		this.outputFactor = 1;
		this.currentTime = 0;
	}

	tick(time: number): void {
		this.currentTime -= time;
		if (this.currentTime > 0) {
			return;
		}

		this.currentTime = this.timeToProduce;
		this.outputResource.addAmount(this.outputFactor * this.getAmount());
	}

	private getCurrentTime(): string {
		return `${(this.currentTime / 20).toFixed(0)} sec`;
	}

	show(): string {
		return `${super.show()} producing ${this.outputFactor} x ${this.outputResource.getName()} in ${this.getCurrentTime()}`;
	}
}