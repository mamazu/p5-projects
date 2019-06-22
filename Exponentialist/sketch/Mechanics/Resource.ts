class Resource {
	private readonly name: string;
	private amount: number;

	constructor(name: string) {
		this.name = name;
		this.amount = 0;
	}

	getName(): string {
		return this.name;
	}

	getAmount(): number {
		return this.amount;
	}

	addAmount(amount: number): void {
		this.amount += amount;
	}

	show(): string {
		return `${this.amount.toLocaleString()}x ${this.name}`;
	}
}