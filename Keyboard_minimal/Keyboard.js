var keys = [];

function initKeys(){
  addRow(['q','w','e','r','t','y','u','i','o','p']);
  addRow(['a','s','d','f','g','h','j','k','l']);
  addRow(['z','x','c','v','b','n','m']);
  addRow([' ']);
  keys[' '].add(2.5, 0);
}

function addRow(keyRow){
  let row = keys.length;
  keyRow.forEach((keyName, column) => {
    let pos = createVector(column, row);
    keys[keyName] = createVector(pos.x+pos.y/2, pos.y);
  });
}

function calculateDistances(word, listOfWords){
  var wordDistance = {};
  listOfWords.forEach((currentWord) => wordDistance[currentWord] = getWordDistance(word, currentWord));  
  return wordDistance;
}

function getWordDistance(word1, word2) {
  let shortWord = (word1.length <= word2.length) ? word1 : word2;
  let sum = 0;

  for(let i = 0; i < shortWord.length; i++) {
    sum+= getDistance(word1[i], word2[i]);
  }
  return sum;
}

function getDistance(char1, char2) {
  if(char1 === char2)
    return 0;

  let position1 = keys[char1];
  let position2 = keys[char2];
  return dist(position1.x, position1.y, position2.x, position2.y);
}
