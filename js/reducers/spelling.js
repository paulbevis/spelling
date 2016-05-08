/*
 Copyright 2016 Paul Bevis

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

 http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
 */
'use strict';

import {combineReducers} from 'redux';
import {GAME_LETTERS, START_LETTERS, START_FOUND_LETTERS} from '../constants/data';
import {GAME_START, FINISHED_PLAYING_SOUND, LETTER_CLICKED, PLAY_WORD} from '../constants/action-types';
import {GAMES} from '../constants/data';
import {map, prop, findIndex, length, filter} from 'ramda';

function buildLetters(letters) {
  var addToProperty = (letter)=>({'name': letter});
  return map(addToProperty, letters.split(''));
}

function buildFoundWords() {
  var words = [];
  for (var i = 0; i < GAMES[0].length; i++) {
    words.push({name: '---'});
  }
  return words;
}

export function letters(state = {}, action) {
  switch (action.type) {
    case GAME_START:
    case FINISHED_PLAYING_SOUND:
    case LETTER_CLICKED:
      return buildLetters(GAME_LETTERS);

    default:
      return buildLetters(START_LETTERS);
  }
}

function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}

function getAvailableWords() {
  let wordArray = GAMES[0].slice(0);
  shuffleArray(wordArray);
  return wordArray;
}

function defaultData() {
  return {
    foundLetters: START_FOUND_LETTERS,
    foundWords: buildFoundWords(),
    availableWords: getAvailableWords(),
    sound: '',
    status: 'disabled'
  };
}

function startGame(state) {
  let game = {};
  game.availableWords = state.availableWords;
  game.foundLetters = START_FOUND_LETTERS;
  game.foundWords = buildFoundWords();
  game.sound = 'audio/start.mp3';
  game.status = 'Intro';
  return game;
}

function setNextAvailableWord(foundWords) {
  // let newFoundWords = Object.assign([], foundWords.slice(0));
  const nextAvailableFunc = (x)=> prop('match', x) === undefined ? x : undefined;
  let nextAvailableWordPos = findIndex(nextAvailableFunc, foundWords);
  return [
    ...foundWords.slice(0, nextAvailableWordPos),
    Object.assign({}, {name: foundWords[nextAvailableWordPos].name}, {nextAvailable: true}),
    ...foundWords.slice(nextAvailableWordPos + 1)
  ];
}

function wordSubmitted(game) {
  if (isGameFinished(game)) {
    game.status = 'Game Finished';
    game.sound = 'audio/applause.mp3';
    game.numberCorrect = calculateTheNumberOfCorrectGuesses(game);
  } else {
    game.status = 'Waiting to play a word audio';
    game.foundWords = setNextAvailableWord(game.foundWords);
  }
}

function finishedPlayingSound(state) {
  let game = {};
  game.availableWords = state.availableWords;
  game.foundWords = state.foundWords;
  game.foundLetters = START_FOUND_LETTERS;
  game.currentWordPos = state.currentWordPos;
  game.currentWord = state.currentWord;
  game.sound = '';
  switch (state.status) {
    case 'Playing':
      game.status = 'Waiting For Input';
      break;
    case'Waiting For Input':
      game.status = 'Waiting For Input';
      break;
    case 'Word Matched':
      wordSubmitted(game);
      break;
    case 'Word Not Matched':
      wordSubmitted(game);
      break;
    case 'Intro':
      game.status = 'Waiting to play a word audio';
      game.foundWords = setNextAvailableWord(game.foundWords);
      break;
    case 'Game Finished':
      game.status = state.status;
      game.numberCorrect = state.numberCorrect;
      break;

    default:
      game.status = state.status;
  }
  return game;
}

function isGameFinished(game) {
  //all foundWords have a match value means that the game if over
  const nextAvailableFunc = (x)=> prop('match', x) === undefined ? x : undefined;
  let nextAvailableWordPos = findIndex(nextAvailableFunc, game.foundWords);
  return nextAvailableWordPos === -1;
}

function calculateTheNumberOfCorrectGuesses(game) {
  var isSuccessfullyMatched = word => word.match;
  return length(filter(isSuccessfullyMatched, game.foundWords));
}

function letterClicked(state, letter) {
  let game = {};
  game.availableWords = state.availableWords;
  game.foundLetters = Object.assign([], state.foundLetters);
  game.foundWords = Object.assign([], state.foundWords);
  game.status = state.status;
  game.currentWordPos = state.currentWordPos;
  game.currentWord = state.currentWord;
  game.sound = '';
  if (state.foundLetters[0] === '-') {
    game.foundLetters[0] = letter;
  } else {
    if (state.foundLetters[1] === '-') {
      game.foundLetters[1] = letter;
    } else {
      if (state.foundLetters[2] === '-') {
        game.foundLetters[2] = letter;
        var submittedWord = game.foundLetters.join('');
        game.foundWords[state.currentWordPos] = {'name': submittedWord};
        if (submittedWord === state.currentWord) {
          game.sound = 'audio/success.mp3';
          game.status = 'Word Matched';
          game.foundWords[game.currentWordPos].match = true;
        } else {
          game.sound = 'audio/warning.mp3';
          game.status = 'Word Not Matched';
          game.foundWords[game.currentWordPos].match = false;
        }
        delete game.foundWords[game.currentWordPos].nextAvailable;
      }
    }
  }
  return game;
}

function playWord(state, availableWordPos) {
  let game = {};
  game.availableWords = state.availableWords;
  game.foundWords = state.foundWords;
  game.foundLetters = START_FOUND_LETTERS;
  game.currentWord = game.availableWords[availableWordPos];
  game.sound = 'audio/words/' + game.currentWord + '.m4a';
  game.status = 'Playing';
  game.currentWordPos = availableWordPos;
  return game;
}

export function game(state = defaultData(), action) {
  switch (action.type) {
    case GAME_START:
      return startGame(state);

    case FINISHED_PLAYING_SOUND:
      return finishedPlayingSound(state);

    case LETTER_CLICKED:
      return letterClicked(state, action.letter);

    case PLAY_WORD:
      return playWord(state, action.key);

    default:
      return state;
  }
}

const spellingAppReducers = combineReducers({
  letters,
  game
});

export default spellingAppReducers;