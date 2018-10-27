interface Field {
	content: string | undefined;
	hasWordAcross: boolean;
	hasWordDown: boolean;
	active: boolean
}

class CrosswordPuzzle {
	private fields: Field[][];
	private readonly width: number;
	private readonly height: number;
	private wordList: WordToGuess[] = [];
	private activeWord: WordToGuess | undefined = undefined;

	constructor(width: number, height: number) {
		this.width = width;
		this.height = height;

		this.fields = new Array(height);
		for (let y = 0; y < height; y++) {
			this.fields[y] = new Array(width);
			for (let x = 0; x < width; x++) {
				this.fields[y][x] = {
					content: undefined,
					hasWordAcross: false,
					hasWordDown: false,
					active: false
				};
			}
		}
	}

	getFieldValue(x: number, y: number): string | undefined {
		return this.fields[y][x].content;
	}

	setFieldValue(char: string, x: number, y: number): void {
		this.fields[y][x].content = char;
	}

	addWord(word: WordToGuess): void {
		this.wordList.push(word);

		// Set the starting field to have a word across or down to solve
		let position = word.getPosition()
		let field = this.fields[position.y][position.x];
		switch (position.direction) {
			case Direction.ACROSS:
				field.hasWordAcross = true;
			case Direction.DOWN:
				field.hasWordDown = true;
		}

		// Add an emptyWord to the field
		this.setWord(word.getEmptyWord());
	}

	getWordList(): WordToGuess[] {
		return this.wordList;
	}

	private setWord(wordObject: WordToGuess): void {
		let position = wordObject.getPosition();
		let word = wordObject.getSolution();

		switch (position.direction) {
			case Direction.DOWN:
				for (let i = 0; i < word.length; i++) {
					this.setFieldValue(word[i], position.x, position.y + i);
				}
				break;
			case Direction.ACROSS:
				for (let i = 0; i < word.length; i++) {
					this.setFieldValue(word[i], position.x + i, position.y);
				}
				break
		}
	}

	highlightWord(index?: number): void {
		if (index === undefined || index >= this.wordList.length) {
			if (this.activeWord !== undefined) {
				this.highlightFields(this.activeWord, false);
			}
			this.activeWord = undefined;
			return;
		}

		let word = this.wordList[index];
		if (word !== this.activeWord && this.activeWord !== undefined) {
			this.highlightFields(this.activeWord, false);
		}
		this.highlightFields(word, true);
		this.activeWord = word;
	}

	highlightFields(word: WordToGuess, status: boolean): void {
		let position = word.getPosition();
		let wordLength = word.getLength();

		switch (position.direction) {
			case Direction.DOWN:
				for (let i = 0; i < wordLength; i++) {
					this.fields[position.y + i][position.x].active = status;
				}
				break;
			case Direction.ACROSS:
				for (let i = 0; i < wordLength; i++) {
					this.fields[position.y][position.x + i].active = status;
				}
				break
		}
	}

	solveWord(word: string): void {
		if (this.activeWord === undefined) {
			throw new Error('No word active');
		}

		if (this.activeWord.getSolution() === word) {
			this.setWord(this.activeWord);
		} else {
			alert("this is the wrong word");
		}
	}

	draw(p: p5) {
		p.stroke(255, 255, 255);
		let tileSizeX = p.width / this.width;
		let tileSizeY = p.height / this.height;

		for (let x = 0; x < p.width / tileSizeX; x++) {
			for (let y = 0; y < p.height / tileSizeY; y++) {
				let field = this.fields[y][x];
				if (field.content === undefined) {
					continue;
				}

				// Draw background and borders
				if (field.active) {
					p.fill(255, 0, 0);
				} else {
					p.fill(0, 0, 0);
				}
				p.rect(x * tileSizeX, y * tileSizeY, tileSizeX, tileSizeY);

				// Draw little indicator that it still has a word across or down to solve
				if (field.hasWordAcross || field.hasWordDown) {
					p.fill(0, 255, 0);
					p.rect(x * tileSizeX, y * tileSizeY, tileSizeX / 10, tileSizeY / 10);
				}

				// Draw the content
				p.fill(255, 255, 255);
				p.text(field.content, (x + .5) * tileSizeX, (y + 0.5) * tileSizeY);
			}
		}
	}
}