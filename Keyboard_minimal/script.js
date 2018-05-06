var allWords = [];

function preload(){
  listOfWords = loadJSON('resources/listOfWords.json');
}

function setup(){
  noCanvas();
  noLoop();
  initKeys()
  allWords = listOfWords['words'];
}

function suggestWord(){
  //select('#word').value();
  let word = document.getElementById('wordInput').value;
  let suggestionBox = document.getElementById('suggestions');
  while(suggestionBox.length){
    suggestionBox.popElement();
  }
  let distances = calculateDistances(word, allWords);

}
