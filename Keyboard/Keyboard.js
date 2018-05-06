class Keyboard{
  constructor(layout){
    this.keys = [];
    this.typing =
    {
      "word" : "",
      "correction" : "",
      "index" : 0
    }
    if(layout == undefined || layout === 'en'){
      this.initEn();
    }
  }

  addRow(keys, row){
    let rowIndex = this.keys.length;
    keys.forEach((keyName, column) => {
      let pos = createVector(column, row);
      let scale = 50;
      this.keys[keyName] =
      {
        "scale" : 50,
        "pos": createVector(pos.x+pos.y/2, pos.y).mult(scale),
        "typed" : false,
        "size" : undefined
      };
    });
  }

  initEn(){
    this.addRow(['q','w','e','r','t','y','u','i','o','p'], 0);
    this.addRow(['a','s','d','f','g','h','j','k','l'], 1);
    this.addRow(['z','x','c','v','b','n','m'], 2);
    this.addRow([' '], 3);
    let space = this.keys[' '];
    space.size = createVector(6, 1);
    space.pos.add(2.5 * space.scale, 0);
  }

  type(word, correctWord){
    this.typing.word = word;
    this.typing.index = 0;

    correctWord = (correctWord === undefined) ? "" : correctWord;
    this.typing.correction = correctWord;
    print(this.typing);
  }

  typeNextCharacter(){
    this.typing.index++;
  }
  // Static
  suggestWord(word, listOfWords) {
    let bestWord = "";
    let shortestDistance = Infinity;
    listOfWords.forEach((possibleWord) => {
      let distance = this.getWordDistance(word, possibleWord);
      if(distance < shortestDistance){
        shortestDistance = distance;
        bestWord = possibleWord;
      }
      print(distance, possibleWord);
    });
    return bestWord;
  }

  getWordDistance(word1, word2) {
    let shortWord = (word1.length <= word2.length) ? word1 : word2;
    let longWord = (shortWord == word2) ? word1 : word2;
    let sum = 0;

    for(let i = 0; i < shortWord.length; i++) {
      sum+= this.getDistance(word1[i], word2[i]);
    }

    // If one of the words is longer than the other add spaces
    for(let j = shortWord.length; j < longWord.length; j++){
      sum += this.getDistance(longWord[j], ' ');
    }
    return sum;
  }

  getDistance(char1, char2) {
    if(char1 === char2)
      return 0;

    let p1 = this.keys[char1].pos;
    let p2 = this.keys[char2].pos;
    return dist(p1.x, p1.y, p2.x, p2.y);
  }

  getKeyColor(keyName) {
    let index = this.typing.index;

    // If its correct, mark it green
    if(keyName === this.typing.correction[index]){
      return (index < this.typing.word.length) ? color(0, 125, 0) : color(125, 125, 0);
    }

    // If its wrong but typed mark it red
    if(keyName === this.typing.word[index])
      return color(125, 0, 0);

    return color(0);
  }

  draw() {
    for(let keyName in this.keys) {
      let color = this.getKeyColor(keyName);
      fill(color);

      this.drawKey(keyName);
    }

    this.typeNextCharacter();
  }

  drawKey(keyName){
    let key = this.keys[keyName];
    let pos = key.pos;
    if(key.size === undefined){
      rect(pos.x, pos.y, key.scale, key.scale);
    }else{
      rect(pos.x, pos.y, key.size.x * key.scale, key.size.y * key.scale);
    }
    fill(255);
    text(keyName, pos.x, pos.y);
    fill(255, 0, 0);
  }

}
