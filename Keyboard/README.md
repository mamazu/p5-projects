# Keyboard
This is a possible implementation of a keyboard correction algorithm based on the distance between the correct key and the typed key.

## How it works
Enter a word in the input box and hit "Type" then on the keyboard it will type your word and the correct word at the same time.

The correction algorithm takes the position of the center of the key that you have typed and compares it with all the words in the dictionary (see `resources/listOfWords.json`) and checks which words are the closest typed.