type pVector = p5.Vector;

enum HouseType {
	Home,
	Office,
};

function houseTypePrinter(houseType: HouseType): string {
	switch (houseType){
		case HouseType.Home:
			return 'home'
		case HouseType.Office:
			return 'office';
	}
}

class House implements Drawable {
	private readonly position: pVector;
	private readonly size: pVector;
	private readonly capacity: number;
	private currentInhabitants: Entity[] = [];
	private type: HouseType;

	constructor(position: pVector, size: pVector, capacity: number, houseType?: HouseType) {
		this.position = position;
		this.size = size;
		this.capacity = capacity;

		if (houseType === undefined) {
			this.type = HouseType.Home;
		} else {
			this.type = houseType;
		}
	}

	getPosition(): pVector {
		return p5.Vector.add(this.position, p5.Vector.mult(this.size, .5));
	}

	getLoad(): number {
		return this.currentInhabitants.length / this.capacity;
	}

	isFull(): boolean {
		return this.currentInhabitants.length === this.capacity;
	}

	getType(): HouseType
	{
		return this.type;
	}

	isHome(): boolean {
		return this.type === HouseType.Home;
	}

	isOffice(): boolean {
		return this.type === HouseType.Office;
	}

	addInhabitant(inhabitant: Entity) {
		this.currentInhabitants.push(inhabitant);
	}

	removeAllInhabitants(): void {
		let removeMethod: (e: Entity) => void;
		switch (this.type) {
			case HouseType.Home:
				removeMethod = (e: Entity) => e.setHome(undefined);
				break;
			case HouseType.Office:
				removeMethod = (e: Entity) => e.setWork(undefined);
				break;
			default:
				console.error('Invalid house type');
				return;
		}
		this.currentInhabitants.forEach(removeMethod);
	}

	private getCapacityColor(p: p5): p5.Color {
		const red = 255 * this.currentInhabitants.length / this.capacity;
		const green = 255 - red;

		return p.color(red, green, 0);
	}

	draw(p: p5) {
		p.fill(this.getCapacityColor(p));
		p.rect(this.position.x, this.position.y, this.size.x, this.size.y);

		const typeString = this.type === HouseType.Home ? 'L' : 'W';
		const capacityString = `${typeString}\n${this.currentInhabitants.length}/${this.capacity}`;
		p.fill(p.color(0));
		p.text(capacityString, this.position.x + this.size.x / 2, this.position.y + this.size.y / 2);
	}
}