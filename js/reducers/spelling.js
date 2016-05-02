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

import {combineReducers} from 'redux'
import {GAME_LETTERS, START_LETTERS, START_FOUND_LETTERS} from '../constants/data'
import {GAME_START, FINISHED_PLAYING_SOUND, LETTER_CLICKED, PLAY_WORD} from '../constants/action-types'
import {GAMES} from '../constants/data'

function buildLetters(letters) {
  var alphabet = letters.split("");
  return alphabet.map((letter) => {
      return {name: letter}
    }
  )
}
function buildFoundWords() {
  var words = [];
  for (var i = 0; i < 10; i++) {
    words.push({name: '---'});
  }
  return words;
}

function letters(state = {}, action) {
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
  let wordArray = Object.assign([], GAMES[0].words);
  shuffleArray(wordArray);
  return wordArray;
}

function defaultData() {
  return {
    foundLetters: START_FOUND_LETTERS,
    foundWords: buildFoundWords(),
    availableWords: getAvailableWords(),
    wordMessages: [],
    sound: {},
    wordMatched: '',
    status: 'disabled'
  }
}

function game(state = defaultData(), action) {
  let game = {};
  game.availableWords = state.availableWords;
  game.foundWords = state.foundWords;
  game.foundLetters = START_FOUND_LETTERS;
  game.currentWordPos = state.currentWordPos
  game.currentWord = state.currentWord;
  game.sound = {};

  switch (action.type) {
    case GAME_START:
      game.foundWords = buildFoundWords();
      game.sound = {audio: 'audio/start.mp3', task: 'start'};
      game.status = 'Intro';
      return game;

    case FINISHED_PLAYING_SOUND:
      switch (state.status) {
        case 'Playing':
          game.status = 'Waiting For Input';
          break;
        case'Waiting For Input':
          game.status = 'Waiting For Input';
          break;
        case 'Word Matched':
          game.status = 'Waiting to play a word audio';
          break;
        case 'Word Not Matched':
          game.status = 'Waiting to play a word audio';
          break;
        case 'Intro':
          game.status = 'Waiting to play a word audio';
          break;

        default:
          game.sound = {};
      }
      return game;

    case LETTER_CLICKED:
      game.foundLetters = Object.assign([], state.foundLetters);
      game.foundWords = Object.assign([], state.foundWords);
      game.status=state.status;
      if (state.foundLetters[0] === '-') {
        game.foundLetters[0] = action.value;
      } else {
        if (state.foundLetters[1] === '-') {
          game.foundLetters[1] = action.value;
        } else {
          if (state.foundLetters[2] === '-') {
            game.foundLetters[2] = action.value;
            var submittedWord = game.foundLetters.join('');
            game.foundWords[state.currentWordPos] = {'name': submittedWord};
            if (submittedWord === state.currentWord) {
              game.sound = {audio: 'audio/success.mp3', task: 'matching'};
              game.status = 'Word Matched';
              game.foundWords[game.currentWordPos].match = true
            } else {
              game.sound = {audio: 'audio/warning.mp3', task: 'matching'};
              game.status = 'Word Not Matched';
              game.foundWords[game.currentWordPos].match = false;
            }
          }
        }
      }
      return game;

    case PLAY_WORD:
      game.currentWord = game.availableWords[action.key];
      game.sound = {audio: 'audio/words/' + game.currentWord + '.m4a', task: 'word'};
      game.status = 'Playing';
      game.currentWordPos = action.key;
      return game;

    default:
      return state;
  }
}

const spellingAppReducers = combineReducers({
  letters,
  game
});

export default spellingAppReducers