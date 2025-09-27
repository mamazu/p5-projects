# Crossword Puzzle
This is a very basic crossword puzzle game written in Typescript based in the [Starter Project of Gaweph](https://github.com/Gaweph/p5-typescript-starter).

## Getting Started
First run `npm install` to set up the project. To use the server run `npm start` and a broswer will open on localhost port 3000

## How to use
To enter a word, move the coursor over the word that you want to solve in the down and across section on top op the screen. When the cells are highlighted in red click the clue and a pop up will apear and ask you for the word.

## How to configure
If you want to change the words that are used have a look in the media directory where the file `config.txt` exists.
In there the following format is used:
> `{A1|1}` means across (A) at position (1|1)
> then the word that the user has to guess follows `hello`
> and after the pipe, the clue follows: `a greeting`
> the whole line would look like this `{A1|1}hello|a greeting`