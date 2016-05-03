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
import expect from 'expect'
import {letters, game} from '../../js/reducers/spelling'
import {CELL_CLICK, GAME_START, GAME_SELECT, LAST_LETTER_FOUND} from '../../js/constants/action-types'
import {START_FOUND_LETTERS, GAMES} from '../../js/constants/data'
import deepFreeze from 'deep-freeze'
import {difference} from 'ramda'

describe('Spelling game', () => {
  const letterButtonHyphens = [{name: '-'},
    {name: '-'},
    {name: '-'},
    {name: '-'},
    {name: '-'},
    {name: '-'},
    {name: '-'},
    {name: '-'},
    {name: '-'},
    {name: '-'},
    {name: '-'},
    {name: '-'},
    {name: '-'},
    {name: '-'},
    {name: '-'},
    {name: '-'},
    {name: '-'},
    {name: '-'},
    {name: '-'},
    {name: '-'},
    {name: '-'},
    {name: '-'},
    {name: '-'},
    {name: '-'},
    {name: '-'},
    {name: '-'}];

  const letterButtonLetters = [{name: 'a'},
    {name: 'b'},
    {name: 'c'},
    {name: 'd'},
    {name: 'e'},
    {name: 'f'},
    {name: 'g'},
    {name: 'h'},
    {name: 'i'},
    {name: 'j'},
    {name: 'k'},
    {name: 'l'},
    {name: 'm'},
    {name: 'n'},
    {name: 'o'},
    {name: 'p'},
    {name: 'q'},
    {name: 'r'},
    {name: 's'},
    {name: 't'},
    {name: 'u'},
    {name: 'v'},
    {name: 'w'},
    {name: 'x'},
    {name: 'y'},
    {name: 'z'}];

  const foundWords = [{name: '---'}, {name: '---'}, {name: '---'}, {name: '---'}, {name: '---'}, {name: '---'}, {name: '---'}, {name: '---'}, {name: '---'}, {name: '---'}];

  describe('when creating letters state', () => {

    it('when is first shown, should build list of letter objects to use, before starting', () => {
        const result = letters(null, {});
        expect(result).toEqual(letterButtonHyphens);
      }
    );

    it('when the start button is clicked, the letter buttons are populated with letters', () => {
      const result = letters(null, {type: GAME_START});
      expect(result).toEqual(letterButtonLetters);
    });
  });

  describe('when creating game state', () => {
    it('on initialisation for the first time, with no supplied action type', () => {
      const result = game(undefined, {});
      expect(result.foundLetters).toEqual(START_FOUND_LETTERS);
      expect(result.foundWords).toEqual(foundWords);
      expect(difference(result.availableWords, GAMES[0].words)).toEqual([]);
    });

    it('on initialisation with supplied action type GAME_START', () => {
      const result = game(undefined, {type: GAME_START});
      expect(result).toEqual(undefined);
    });

  });
});