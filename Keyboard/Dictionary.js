class Dictionary{
  constructor(listOfWords, lang){
    this.listOfWords = listOfWords;
    this.lang = lang;
  }

  getListOfWords() {
    return this.listOfWords[this.lang];
  }

  getWordsWithLength(length, error) {
    let result = [];
    error = (error === undefined) ? 0 : error;

    this.getListOfWords().forEach((word) => {
      if(abs(word.length - length) <= error){
        result.push(word);
      }
    });
    return result
  }

  getWordsContaining(part) {
    let result = [];
    this.getListOfWords().forEach((word) => {
      if(word.indexOf(part) !== -1){
        result.push(word);
      }
    });
    return result;
  }

}
