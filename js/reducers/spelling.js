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
import {combineReducers} from 'redux'
import {GAME_LETTERS, START_LETTERS, START_FOUND_LETTERS} from '../constants/data'
import {GAME_START, FINISHED_PLAYING_SOUND, LETTER_CLICKED} from '../constants/action-types'
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
function defaultData() {
  return {
    foundLetters: START_FOUND_LETTERS,
    foundWords: buildFoundWords(),
    words: [],
    wordMessages: [],
    sound: {},
    wordMatched: ''
  }
}

function game(state = defaultData(), action) {
  let game = GAMES[0];

  switch (action.type) {
    case GAME_START:
      game.foundWords = buildFoundWords();
      game.foundLetters = START_FOUND_LETTERS;
      game.sound = {audio: 'audio/start.mp3', task: 'start'};
      game.status = 'Intro';
      return game;

    case FINISHED_PLAYING_SOUND:
      game.foundWords=state.foundWords;
      game.foundLetters = START_FOUND_LETTERS;
      game.currentWord = 0;
      if (state.status === 'Intro') {
        game.sound = {audio: GAMES[0].audio[0], task: 'word'};
        game.status = 'Playing';
        return game;
      } else {
        game.sound = {audio: GAMES[0].audio[0], task: 'word'};
        game.status = 'Waiting';
        return game;
      }

    case LETTER_CLICKED:
      game.wordMatched = '';
      game.foundLetters = Object.assign([], state.foundLetters);
      if (state.foundLetters[0] === '-') {
        game.foundLetters[0] = action.value;
      } else {
        if (state.foundLetters[1] === '-') {
          game.foundLetters[1] = action.value;
        } else {
          if (state.foundLetters[2] === '-') {
            game.foundLetters[2] = action.value;
            var submittedWord = game.foundLetters.join('');
            game.foundWords[0]={'name':submittedWord,icon:'check_cirle'};
            if (submittedWord === GAMES[0].words[0]) {
              game.wordMatched = 'Yes';
              game.sound = {audio: 'audio/success.mp3', task: 'matching'};
              game.status = 'Playing';
            } else {
              game.sound = {audio: 'audio/warning.mp3', task: 'matching'};
              game.wordMatched = 'No';
              game.status = 'Playing';

            }
          }
        }
      }
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