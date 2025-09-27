enum Direction {
	DOWN, ACROSS
}

interface WordPosition {
	x: number
	y: number
	direction: Direction
}

class WordToGuess {
	private readonly solution: string;
	private readonly position: WordPosition;
	private readonly clue: string;

	constructor(word: string, position: WordPosition, clue: string) {
		this.solution = word;
		this.position = position;
		this.clue = clue;
	}

	getSolution(): string { return this.solution; }
	getPosition(): WordPosition { return this.position; }
	getClue(): string { return this.clue; }

	getLength(): number {
		return this.solution.length;
	}

	getEmptyWord(): WordToGuess {
		let emptyString = " ".repeat(this.solution.length); 
		return new WordToGuess(emptyString, this.position, this.clue);
	}
}