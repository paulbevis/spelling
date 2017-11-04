/**
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

import expect from 'expect'
import {game, letterLocations} from '../../js/reducers/spelling'
import letters from '../../js/reducers/letters'
import {START_FOUND_LETTERS, START_LETTERS, GAME_LETTERS, WAITING_TO_PLAY_AUDIO, WAITING_FOR_INPUT} from '../../js/constants/data'
import * as types from '../../js/constants/action-types';
import {wordSet} from '../../js/domain/words'
import deepFreeze from 'deep-freeze'
import {difference} from 'ramda'

describe('Spelling game: letters reducer tests', () => {
  const state = {
    destinations: [
      {xPos: 1, yPos: 1},
      {xPos: 2, yPos: 2},
      {xPos: 3, yPos: 3}],
    src: [
      {value: 'a'}, {value: 'b'}, {value: 'c'},
      {value: 'd'}, {value: 'e'}, {value: 'f'},
      {value: 'g'}, {value: 'h'}, {value: 'i'},
      {value: 'j'}, {value: 'k'}, {value: 'l'},
      {value: 'm'}, {value: 'n'}, {value: 'o'},
      {value: 'p'}, {value: 'q'}, {value: 'r'},
      {value: 's'}, {value: 't'}, {value: 'u'},
      {value: 'v'}, {value: 'w'}, {value: 'x'},
      {value: 'y'}, {value: 'z'}]
  };
  const expectedState = {
    destinations: [
      {xPos: 1, yPos: 1, letter: 'a'},
      {xPos: 2, yPos: 2},
      {xPos: 3, yPos: 3}],
    src: [
      {
        value: 'a',
        "dest": {
        "xPos": 1,
        "yPos": 1
      }
      }, {value: 'b'}, {value: 'c'},
      {value: 'd'}, {value: 'e'}, {value: 'f'},
      {value: 'g'}, {value: 'h'}, {value: 'i'},
      {value: 'j'}, {value: 'k'}, {value: 'l'},
      {value: 'm'}, {value: 'n'}, {value: 'o'},
      {value: 'p'}, {value: 'q'}, {value: 'r'},
      {value: 's'}, {value: 't'}, {value: 'u'},
      {value: 'v'}, {value: 'w'}, {value: 'x'},
      {value: 'y'}, {value: 'z'}]
  };

  describe('when updating letters state: addLocationToLetter', () => {

    it('when is first shown, should build list of letter objects to use, before starting', () => {
        deepFreeze(state);
        const result = letters(state, {letter: 'a', type: 'LETTER_CLICKED'});
        expect(result).toEqual(expectedState);
      }
    );
  });
});
