"use strict";
var CrosswordPuzzle = (function () {
    function CrosswordPuzzle(width, height) {
        this.wordList = [];
        this.activeWord = undefined;
        this.width = width;
        this.height = height;
        this.fields = new Array(height);
        for (var y = 0; y < height; y++) {
            this.fields[y] = new Array(width);
            for (var x = 0; x < width; x++) {
                this.fields[y][x] = {
                    content: undefined,
                    hasWordAcross: false,
                    hasWordDown: false,
                    active: false
                };
            }
        }
    }
    CrosswordPuzzle.prototype.getFieldValue = function (x, y) {
        return this.fields[y][x].content;
    };
    CrosswordPuzzle.prototype.setFieldValue = function (char, x, y) {
        this.fields[y][x].content = char;
    };
    CrosswordPuzzle.prototype.addWord = function (word) {
        this.wordList.push(word);
        var position = word.getPosition();
        var field = this.fields[position.y][position.x];
        switch (position.direction) {
            case Direction.ACROSS:
                field.hasWordAcross = true;
            case Direction.DOWN:
                field.hasWordDown = true;
        }
        this.setWord(word.getEmptyWord());
    };
    CrosswordPuzzle.prototype.getWordList = function () {
        return this.wordList;
    };
    CrosswordPuzzle.prototype.setWord = function (wordObject) {
        var position = wordObject.getPosition();
        var word = wordObject.getSolution();
        switch (position.direction) {
            case Direction.DOWN:
                for (var i = 0; i < word.length; i++) {
                    this.setFieldValue(word[i], position.x, position.y + i);
                }
                break;
            case Direction.ACROSS:
                for (var i = 0; i < word.length; i++) {
                    this.setFieldValue(word[i], position.x + i, position.y);
                }
                break;
        }
    };
    CrosswordPuzzle.prototype.highlightWord = function (index) {
        if (index === undefined || index >= this.wordList.length) {
            if (this.activeWord !== undefined) {
                this.highlightFields(this.activeWord, false);
            }
            this.activeWord = undefined;
            return;
        }
        var word = this.wordList[index];
        if (word !== this.activeWord && this.activeWord !== undefined) {
            this.highlightFields(this.activeWord, false);
        }
        this.highlightFields(word, true);
        this.activeWord = word;
    };
    CrosswordPuzzle.prototype.highlightFields = function (word, status) {
        var position = word.getPosition();
        var wordLength = word.getLength();
        switch (position.direction) {
            case Direction.DOWN:
                for (var i = 0; i < wordLength; i++) {
                    this.fields[position.y + i][position.x].active = status;
                }
                break;
            case Direction.ACROSS:
                for (var i = 0; i < wordLength; i++) {
                    this.fields[position.y][position.x + i].active = status;
                }
                break;
        }
    };
    CrosswordPuzzle.prototype.solveWord = function (word) {
        if (this.activeWord === undefined) {
            throw new Error('No word active');
        }
        if (this.activeWord.getSolution() === word) {
            this.setWord(this.activeWord);
        }
        else {
            alert("this is the wrong word");
        }
    };
    CrosswordPuzzle.prototype.draw = function (p) {
        p.stroke(255, 255, 255);
        var tileSizeX = p.width / this.width;
        var tileSizeY = p.height / this.height;
        for (var x = 0; x < p.width / tileSizeX; x++) {
            for (var y = 0; y < p.height / tileSizeY; y++) {
                var field = this.fields[y][x];
                if (field.content === undefined) {
                    continue;
                }
                if (field.active) {
                    p.fill(255, 0, 0);
                }
                else {
                    p.fill(0, 0, 0);
                }
                p.rect(x * tileSizeX, y * tileSizeY, tileSizeX, tileSizeY);
                if (field.hasWordAcross || field.hasWordDown) {
                    p.fill(0, 255, 0);
                    p.rect(x * tileSizeX, y * tileSizeY, tileSizeX / 10, tileSizeY / 10);
                }
                p.fill(255, 255, 255);
                p.text(field.content, (x + .5) * tileSizeX, (y + 0.5) * tileSizeY);
            }
        }
    };
    return CrosswordPuzzle;
}());
var CrosswordPuzzleFactory = (function () {
    function CrosswordPuzzleFactory(wordList, optimized) {
        this.wordList = [];
        for (var _i = 0, wordList_1 = wordList; _i < wordList_1.length; _i++) {
            var wordString = wordList_1[_i];
            var word = this.parseWord(wordString);
            if (word !== undefined) {
                this.wordList.push(word);
            }
        }
        if (optimized === true) {
            this.optimize();
        }
    }
    CrosswordPuzzleFactory.prototype.parseWord = function (line) {
        var regex = /\{([ad])(\d+)\|(\d+)\}([^|]+)\|(.*)/i;
        var match = regex.exec(line);
        if (match === null) {
            console.error(line + " does not match.");
            return;
        }
        var parsedDirection = Direction.ACROSS;
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
        var position = {
            direction: parsedDirection,
            x: Number(match[2]),
            y: Number(match[3]),
        };
        return new WordToGuess(match[4], position, match[5]);
    };
    CrosswordPuzzleFactory.prototype.optimize = function () {
    };
    CrosswordPuzzleFactory.prototype.getCrossWordSize = function () {
        var maxX = 0, maxY = 0;
        this.wordList.forEach(function (word) {
            var position = word.getPosition();
            var direction = position.direction;
            var x = position.x + ((direction === Direction.ACROSS) ? word.getLength() : 0);
            var y = position.y + ((direction === Direction.DOWN) ? word.getLength() : 0);
            maxX = sketchP.max(x, maxX);
            maxY = sketchP.max(y, maxY);
        });
        return [maxX, maxY];
    };
    CrosswordPuzzleFactory.prototype.make = function () {
        var size = this.getCrossWordSize();
        var crossWordPuzzle = new CrosswordPuzzle(size[0], size[1]);
        this.wordList.forEach(function (word) {
            crossWordPuzzle.addWord(word);
        });
        return crossWordPuzzle;
    };
    CrosswordPuzzleFactory.prototype.makeFilled = function () {
        var crossWordPuzzle = this.make();
        this.wordList.forEach(crossWordPuzzle.addWord);
        return crossWordPuzzle;
    };
    return CrosswordPuzzleFactory;
}());
var Direction;
(function (Direction) {
    Direction[Direction["DOWN"] = 0] = "DOWN";
    Direction[Direction["ACROSS"] = 1] = "ACROSS";
})(Direction || (Direction = {}));
var WordToGuess = (function () {
    function WordToGuess(word, position, clue) {
        this.solution = word;
        this.position = position;
        this.clue = clue;
    }
    WordToGuess.prototype.getSolution = function () { return this.solution; };
    WordToGuess.prototype.getPosition = function () { return this.position; };
    WordToGuess.prototype.getClue = function () { return this.clue; };
    WordToGuess.prototype.getLength = function () {
        return this.solution.length;
    };
    WordToGuess.prototype.getEmptyWord = function () {
        var emptyString = " ".repeat(this.solution.length);
        return new WordToGuess(emptyString, this.position, this.clue);
    };
    return WordToGuess;
}());
var sketch = function (p) {
    var currentCrossword;
    var activeIndex;
    var wordList;
    p.preload = function () {
        wordList = p.loadStrings('media/config.txt');
    };
    p.setup = function () {
        p.createCanvas(400, 700);
        p.frameRate(5);
        p.textSize(30);
        p.textAlign(p.CENTER, p.CENTER);
        currentCrossword = (new CrosswordPuzzleFactory(wordList)).make();
    };
    p.draw = function () {
        currentCrossword.draw(p);
        currentCrossword.highlightWord(activeIndex);
        drawClues();
    };
    function drawClues() {
        var divAcross = document.querySelector('#clues div.across');
        var divDown = document.querySelector('#clues div.down');
        if (divAcross === null || divDown === null) {
            return;
        }
        divAcross.innerHTML = '';
        divDown.innerHTML = '';
        currentCrossword.getWordList().forEach(function (word, index) {
            var newP = document.createElement('p');
            newP.textContent = index + 1 + ") " + word.getClue();
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
    function addEventHandler(htmlElement, index) {
        htmlElement.addEventListener('mouseenter', function () { activeIndex = index; });
        htmlElement.addEventListener('mouseout', function () { activeIndex = undefined; });
        htmlElement.addEventListener('click', function () {
            var wordEntered = prompt('Enter word:');
            currentCrossword.solveWord(wordEntered);
        });
    }
};
var sketchP = new p5(sketch);
//# sourceMappingURL=build.js.map