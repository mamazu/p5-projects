let sketch = (p: p5) => {
    let currentCrossword: CrosswordPuzzle;
    let activeIndex: number | undefined;
    let wordList: string[];

    p.preload= () => {
        wordList = p.loadStrings('media/config.txt');
    }

    p.setup = () => {
        p.createCanvas(400, 700);
        p.frameRate(5);
        p.textSize(30);
        p.textAlign(p.CENTER, p.CENTER);

        currentCrossword = (new CrosswordPuzzleFactory(wordList)).make();
    };

    p.draw = () => {
        currentCrossword.draw(p);
        currentCrossword.highlightWord(activeIndex);
        drawClues();
    };

    function drawClues(): void {
        let divAcross = document.querySelector('#clues div.across');
        let divDown = document.querySelector('#clues div.down');
        if (divAcross === null || divDown === null) {
            return;
        }

        divAcross.innerHTML = '';
        divDown.innerHTML = '';
        currentCrossword.getWordList().forEach((word, index) => {
            let newP = document.createElement('p');
            newP.textContent = `${index + 1}) ${word.getClue()}`;
            addEventHandler(newP, index);

            if (divAcross === null || divDown === null) {
                return;
            }
            switch (word.getPosition().direction) {
                case Direction.ACROSS:
                    divAcross.appendChild(newP);
                    break;
                case Direction.DOWN:
                    divDown.appendChild(newP);
                    break;
            }
        });
    }

    function addEventHandler(htmlElement: HTMLElement, index: number) {
        // On mouse hover set the active word to highlight
        htmlElement.addEventListener('mouseenter', () => { activeIndex = index;});
        htmlElement.addEventListener('mouseout', () => { activeIndex = undefined });

        htmlElement.addEventListener('click', () => {
            let wordEntered = prompt('Enter word:');
            currentCrossword.solveWord(wordEntered);
        });
    }
};

let sketchP = new p5(sketch);
