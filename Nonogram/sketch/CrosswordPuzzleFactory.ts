class CrosswordPuzzleFactory {
	private readonly wordList: WordToGuess[];

	constructor(wordList: string[], optimized?: boolean) {
		this.wordList = [];

		for (let wordString of wordList) {
			let word = this.parseWord(wordString)
			if (word !== undefined) {
				this.wordList.push(word);
			}
		}
		if(optimized === true){
			this.optimize();
		}
	}

	private parseWord(line: string): WordToGuess | undefined {
		let regex = /\{([ad])(\d+)\|(\d+)\}([^|]+)\|(.*)/i;
		let match = regex.exec(line)
		if (match === null) {
			console.error(`${line} does not match.`);
			return;
		}

		let parsedDirection = Direction.ACROSS;
		switch (match[1]) {
			case 'a':
			case 'A':
				parsedDirection = Direction.ACROSS;
				break;
			case 'd':
			case 'D':
				parsedDirection = Direction.DOWN;
				break;
		}

		let position: WordPosition = {
			direction: parsedDirection,
			x: Number(match[2]),
			y: Number(match[3]),
		};
		return new WordToGuess(match[4], position, match[5]);
	}

	private optimize(): void {
		// todo: optimize cross word puzzle
	}

	getCrossWordSize(): number[] {
		let maxX = 0, maxY = 0;
		this.wordList.forEach((word) => {
			let position = word.getPosition();
			let direction = position.direction;

			let x = position.x + ((direction === Direction.ACROSS) ? word.getLength() : 0);
			let y = position.y + ((direction === Direction.DOWN) ? word.getLength() : 0);

			maxX = sketchP.max(x, maxX);
			maxY = sketchP.max(y, maxY);
		});

		return [maxX, maxY];
	}

	make(): CrosswordPuzzle {
		let size = this.getCrossWordSize();
		let crossWordPuzzle = new CrosswordPuzzle(size[0], size[1]);

		this.wordList.forEach((word) => {
			crossWordPuzzle.addWord(word);
		});

		return crossWordPuzzle;
	}

	makeFilled(): CrosswordPuzzle {
		let crossWordPuzzle = this.make();
		this.wordList.forEach(crossWordPuzzle.addWord);

		return crossWordPuzzle;
	}
}