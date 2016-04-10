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

function buildLetters() {
  var alphabet = "abcdefghijklmnopqrstuvwxyz".split("");
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
    // case GAME_SELECT:
    //   return {'description': '(List ' + action.listNumber + ')', 'number': action.listNumber};
    default:
      return buildLetters();
  }
}

function foundWords(state = {}, action) {
  switch (action.type) {
    // case GAME_SELECT:
    //   return {'description': '(List ' + action.listNumber + ')', 'number': action.listNumber};
    default:
      return buildFoundWords();
  }
}

const spellingAppReducers = combineReducers({
  letters,
  foundWords
});

export default spellingAppReducers