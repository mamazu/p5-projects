class Industry {
	private readonly productName: string;
	private producers: Producer[] = [];
	private resource: Resource;

	constructor(productName: string) {
		this.productName = productName;
		this.resource = new Resource('potato');
	}

	addProducer(producerName: string) {
		let producer = new Producer(producerName, this.getLastResource());
		producer.addAmount(1);
		this.producers.push(producer);
	}

	private getLastResource(): Resource {
		if(this.producers.length === 0) {
			return this.resource;
		}
		let lastIndex = this.producers.length -1;
		return this.producers[lastIndex];
	}

	tick(time: number): void {
		this.producers.forEach(producer => producer.tick(time))
	}

	show(): string {
		let headline = `<h2>${this.productName} industry (${this.resource.show()})</h2>`;
		let producers = this.producers.map((producer) => producer.show())
			.map(s => `<div>${s}</div>`).join('');

		return headline + producers;
	}
}