let keyboard = null;
let dictionary = null;
let listOfWords = [];

function preload() {
  listOfWords = loadJSON('resources/listOfWords.json');
}

function setup() {
  createCanvas(800, 800);
  keyboard = new Keyboard();
  dictionary = new Dictionary(listOfWords, 'en');
  setupDrawing();
}

function draw() {
  frameRate(2);
  background(0);
  translate(width / 4, height / 3);
  keyboard.draw();
}

function setupDrawing() {
  stroke(255);
  fill(255);
  textSize(20);
  textAlign(CENTER);
  rectMode(CENTER);
}

function startTyping() {
  let word = document.getElementById('word').value;
  let correctWordVar = correctWord(word);
  document.getElementById('guessedWord').innerHTML = correctWordVar;
  keyboard.type(word, correctWordVar);
}

function correctWord(word) {
  let wordsToCheck = mergeLists(dictionary.getWordsWithLength(word.length, 1), dictionary.getWordsContaining(word));
  return keyboard.suggestWord(word, wordsToCheck);
}

function mergeLists() {
  let set = new Set();
  for (let i = 0; i < arguments.length; i++) {
    let argument = arguments[i];
    argument = (argument instanceof Array) ? argument : new Array(argument);
    argument.forEach((entry) => {
      set.add(entry)
    });
  }
  // turn set to array
  return [...set];
}