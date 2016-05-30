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
import {letters, game} from '../../js/reducers/spelling'
import {CELL_CLICK, GAME_START, GAME_SELECT, LAST_LETTER_FOUND, FINISHED_PLAYING_SOUND, PLAY_WORD, LETTER_CLICKED} from '../../js/constants/action-types'
import {START_FOUND_LETTERS, START_LETTERS, GAME_LETTERS, WAITING_TO_PLAY_AUDIO} from '../../js/constants/data'
import {wordSet} from '../../js/domain/words'
import deepFreeze from 'deep-freeze'
import {difference} from 'ramda'

describe('Spelling game', () => {
  const letterButtonHyphens = START_LETTERS.split('');

  const letterButtonLetters = GAME_LETTERS.split('');


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
    const availableWords = wordSet(0);

    it('on initialisation for the first time, with no supplied action type', () => {
      const result = game(undefined, {});
      expect(result.foundLetters).toEqual(START_FOUND_LETTERS);
      expect(result.foundWords).toEqual(foundWords);
      expect(result.sound).toEqual('');
      expect(result.status).toEqual('disabled');
    });

    it('on initialisation with supplied action type GAME_START', () => {
      const initialState = game(undefined, {});
      deepFreeze(initialState);


      const expectState = {
        availableWords: availableWords,
        foundLetters: START_FOUND_LETTERS,
        foundWords: foundWords,
        sound: 'audio/intro.m4a',
        status: 'Intro',
        gameNumber: 0
      };
      const state = game(initialState, {type: GAME_START});
      expect(difference(state.foundLetters, expectState.foundLetters)).toEqual([]);
      expect(state.foundLetters).toEqual(expectState.foundLetters);
      expect(state.foundLetters).toEqual(expectState.foundLetters);
      expect(state.foundWords).toEqual(expectState.foundWords);
      expect(state.sound).toEqual(expectState.sound);
      expect(state.status).toEqual(expectState.status);
      expect(state.gameNumber).toEqual(expectState.gameNumber);
    });

    it('the game has started, and intro audio finished', () => {
      const initialState = {
        availableWords: availableWords,
        foundLetters: START_FOUND_LETTERS,
        foundWords: foundWords,
        sound: 'audio/intro.m4a',
        status: 'Intro',
        gameNumber: 0
      };
      deepFreeze(initialState);
      const foundWordsChanged = [{name: '---'}, {name: '---'}, {name: '---'}, {name: '---'}, {name: '---'}, {name: '---'}, {name: '---'}, {name: '---'}, {name: '---'}, {name: '---'}];

      const expectedState = {
        availableWords: availableWords,
        foundLetters: START_FOUND_LETTERS,
        foundWords: foundWordsChanged,
        currentWordPos: undefined,
        currentWord: undefined,
        sound: '',
        status: WAITING_TO_PLAY_AUDIO,
        gameNumber: 0
      };
      expectedState.foundWords[0].nextAvailable = true;

      const state = game(initialState, {type: FINISHED_PLAYING_SOUND});

      expect(state).toEqual(expectedState);
    });

    it('play a word audio', () => {
      const initialState = {
        availableWords: availableWords,
        foundLetters: START_FOUND_LETTERS,
        foundWords: foundWords,
        currentWordPos: undefined,
        currentWord: undefined,
        status: WAITING_TO_PLAY_AUDIO,
        gameNumber: 0
      };
      deepFreeze(initialState);

      const expectedState = {
        availableWords: availableWords,
        foundLetters: START_FOUND_LETTERS,
        foundWords: foundWords,
        currentWordPos: 3,
        currentWord: availableWords[3],
        sound: 'audio/words/' + availableWords[3] + '.m4a',
        status: 'Playing',
        gameNumber: 0
      };

      const state = game(initialState, {type: PLAY_WORD, key: 3});

      expect(state).toEqual(expectedState);
    });

    it('word audio has finished', () => {
      const initialState = {
        availableWords: availableWords,
        foundLetters: START_FOUND_LETTERS,
        foundWords: foundWords,
        currentWordPos: 3,
        currentWord: 'hut',
        sound: 'audio/words/hut.m4a',
        status: 'Playing',
        gameNumber: 0
      };
      deepFreeze(initialState);

      const expectedState = {
        availableWords: availableWords,
        foundLetters: START_FOUND_LETTERS,
        foundWords: foundWords,
        currentWordPos: 3,
        currentWord: 'hut',
        sound: '',
        status: 'Waiting For Input',
        gameNumber: 0
      };

      const state = game(initialState, {type: FINISHED_PLAYING_SOUND});

      expect(state).toEqual(expectedState);
    });

    it('first letter is clicked', () => {
      const initialState = {
        availableWords: availableWords,
        foundLetters: START_FOUND_LETTERS,
        foundWords: foundWords,
        currentWordPos: 3,
        currentWord: 'hut',
        sound: '',
        status: 'Waiting For Input',
        gameNumber: 0
      };
      deepFreeze(initialState);

      const expectedState = {
        availableWords: availableWords,
        foundLetters: ['h', '-', '-'],
        foundWords: foundWords,
        currentWordPos: 3,
        currentWord: 'hut',
        sound: '',
        status: 'Waiting For Input',
        gameNumber: 0
      };

      const state = game(initialState, {type: LETTER_CLICKED, letter: 'h'});
      expect(state).toEqual(expectedState);
    });

    it('second letter is clicked', () => {
      const initialState = {
        availableWords: availableWords,
        foundLetters: ['h', '-', '-'],
        foundWords: foundWords,
        currentWordPos: 3,
        currentWord: 'hut',
        sound: '',
        status: 'Waiting For Input',
        gameNumber: 0
      };
      deepFreeze(initialState);

      const expectedState = {
        availableWords: availableWords,
        foundLetters: ['h', 'u', '-'],
        foundWords: foundWords,
        currentWordPos: 3,
        currentWord: 'hut',
        sound: '',
        status: 'Waiting For Input',
        gameNumber: 0
      };

      const state = game(initialState, {type: LETTER_CLICKED, letter: 'u'});
      expect(state).toEqual(expectedState);
    });

    it('third letter is clicked, successfully matching word', () => {
      const foundWordsChanged = [{name: '---'}, {name: '---'}, {name: '---'}, {name: '---'}, {name: '---'}, {name: '---'}, {name: '---'}, {name: '---'}, {name: '---'}, {name: '---'}];
      const initialState = {
        availableWords: availableWords,
        foundLetters: ['h', 'u', '-'],
        foundWords: foundWords,
        currentWordPos: 3,
        currentWord: 'hut',
        sound: '',
        status: 'Waiting For Input',
        gameNumber: 0
      };
      deepFreeze(initialState);

      let expectedState = {
        availableWords: availableWords,
        foundLetters: ['h', 'u', 't'],
        foundWords: foundWordsChanged,
        currentWordPos: 3,
        currentWord: 'hut',
        sound: 'audio/success.mp3',
        status: 'Word Matched',
        gameNumber: 0
      };
      expectedState.foundWords[3] = {'name': 'hut', 'match': true};

      const state = game(initialState, {type: LETTER_CLICKED, letter: 't'});
      expect(state).toEqual(expectedState);
    });

    it('play audio on successful word match', () => {

      const foundWordsChanged = [{name: '---', nextAvailable: true}, {name: '---'}, {name: '---'}, {name: 'hut', 'match': true}, {name: '---'}, {name: '---'}, {name: '---'}, {name: '---'}, {name: '---'}, {name: '---'}];
      const initialState = {
        availableWords: availableWords,
        foundLetters: START_FOUND_LETTERS,
        foundWords: foundWordsChanged,
        currentWordPos: 3,
        currentWord: 'hut',
        sound: 'audio/success.mp3',
        status: 'Word Matched',
        gameNumber: 0
      };
      deepFreeze(initialState);

      const expectedState = {
        availableWords: availableWords,
        foundLetters: START_FOUND_LETTERS,
        foundWords: foundWordsChanged,
        currentWordPos: 3,
        currentWord: 'hut',
        sound: '',
        status: WAITING_TO_PLAY_AUDIO,
        gameNumber: 0
      };

      const state = game(initialState, {type: FINISHED_PLAYING_SOUND});

      expect(state).toEqual(expectedState);
    });

    it('third letter is clicked, unsuccessfully matching word', () => {
      const foundWordsChanged = [{name: '---'}, {name: '---'}, {name: '---'}, {name: '---'}, {name: '---'}, {name: '---'}, {name: '---'}, {name: '---'}, {name: '---'}, {name: '---'}];
      const initialState = {
        availableWords: availableWords,
        foundLetters: ['h', 'u', '-'],
        foundWords: foundWords,
        currentWordPos: 3,
        currentWord: 'hut',
        sound: '',
        status: 'Waiting For Input',
        gameNumber: 0
      };
      deepFreeze(initialState);

      let expectedState = {
        availableWords: availableWords,
        foundLetters: ['h', 'u', 'p'],
        foundWords: foundWordsChanged,
        currentWordPos: 3,
        currentWord: 'hut',
        sound: 'audio/warning.mp3',
        status: 'Word Not Matched',
        gameNumber: 0
      };
      expectedState.foundWords[3] = {'name': 'hup', 'match': false};

      const state = game(initialState, {type: LETTER_CLICKED, letter: 'p'});
      expect(state).toEqual(expectedState);
    });

    it('play audio on unsuccessful word match', () => {

      const foundWordsChanged = [{name: '---', nextAvailable: true}, {name: '---'}, {name: '---'}, {name: 'hut', 'match': true}, {name: '---'}, {name: '---'}, {name: '---'}, {name: '---'}, {name: '---'}, {name: '---'}];
      const initialState = {
        availableWords: availableWords,
        foundLetters: START_FOUND_LETTERS,
        foundWords: foundWordsChanged,
        currentWordPos: 3,
        currentWord: 'hut',
        sound: 'audio/warning.mp3',
        status: 'Word Not Matched',
        gameNumber: 0
      };
      deepFreeze(initialState);

      const expectedState = {
        availableWords: availableWords,
        foundLetters: START_FOUND_LETTERS,
        foundWords: foundWordsChanged,
        currentWordPos: 3,
        currentWord: 'hut',
        sound: '',
        status: WAITING_TO_PLAY_AUDIO,
        gameNumber: 0
      };

      const state = game(initialState, {type: FINISHED_PLAYING_SOUND});

      expect(state).toEqual(expectedState);
    });

    it('third letter is clicked, unsuccessfully matching word', () => {
      const foundWordsChanged = [{name: '---'}, {name: '---'}, {name: '---'}, {name: '---'}, {name: '---'}, {name: '---'}, {name: '---'}, {name: '---'}, {name: '---'}, {name: '---'}];
      const initialState = {
        availableWords: availableWords,
        foundLetters: ['h', 'u', '-'],
        foundWords: foundWords,
        currentWordPos: 3,
        currentWord: 'hut',
        sound: '',
        status: 'Waiting For Input',
        gameNumber: 0
      };
      deepFreeze(initialState);

      let expectedState = {
        availableWords: availableWords,
        foundLetters: ['h', 'u', 'p'],
        foundWords: foundWordsChanged,
        currentWordPos: 3,
        currentWord: 'hut',
        sound: 'audio/warning.mp3',
        status: 'Word Not Matched',
        gameNumber: 0
      };
      expectedState.foundWords[3] = {'name': 'hup', 'match': false};

      const state = game(initialState, {type: LETTER_CLICKED, letter: 'p'});
      expect(state).toEqual(expectedState);
    });

    it('after successful audio has been played, the next available word pulses', () => {

      const foundWordsChanged = [{name: 'hut', match: true}, {name: 'dad'}, {name: 'bog', match: false},
        {
          name: 'bag', 'match': true
        },
        {name: '---'},
        {name: '---'}, {name: '---'},
        {name: '---'}, {name: '---'}, {name: '---'}];
      const foundWordsChanged2 = [{name: 'hut', match: true}, {name: 'dad', nextAvailable: true}, {name: 'bog', match: false}, {
        name: 'bag',
        'match': true
      }, {name: '---'}, {name: '---'}, {name: '---'}, {name: '---'}, {name: '---'}, {name: '---'}];
      const initialState = {
        availableWords: availableWords,
        foundLetters: START_FOUND_LETTERS,
        foundWords: foundWordsChanged,
        currentWordPos: 0,
        currentWord: 'hut',
        sound: 'audio/words/hut.m4a',
        status: 'Word Matched',
        gameNumber: 0
      };
      deepFreeze(initialState);

      const expectedState = {
        availableWords: availableWords,
        foundLetters: START_FOUND_LETTERS,
        foundWords: foundWordsChanged2,
        currentWordPos: 0,
        currentWord: 'hut',
        sound: '',
        status: WAITING_TO_PLAY_AUDIO,
        gameNumber: 0
      };

      const state = game(initialState, {type: FINISHED_PLAYING_SOUND});

      expect(state).toEqual(expectedState);
    });

    it('after successful audio has been played, the next available word pulses, and the previous one stops', () => {

      const foundWordsChanged = [{name: 'hut', match: true}, {name: 'dad'}, {name: 'bog', match: false}, {
        name: 'hut',
        'match': true
      }, {name: '---'}, {name: '---'}, {name: '---'}, {name: '---'}, {name: '---'}, {name: '---'}];
      const foundWordsChanged2 = [{name: 'hut', match: true}, {name: 'dad', nextAvailable: true}, {name: 'bog', match: false}, {
        name: 'hut',
        'match': true
      }, {name: '---'}, {name: '---'}, {name: '---'}, {name: '---'}, {name: '---'}, {name: '---'}];
      const initialState = {
        availableWords: availableWords,
        foundLetters: START_FOUND_LETTERS,
        foundWords: foundWordsChanged,
        currentWordPos: 0,
        currentWord: 'hut',
        sound: 'audio/words/hut.m4a',
        status: 'Word Matched',
        gameNumber: 0
      };
      deepFreeze(initialState);

      const expectedState = {
        availableWords: availableWords,
        foundLetters: START_FOUND_LETTERS,
        foundWords: foundWordsChanged2,
        currentWordPos: 0,
        currentWord: 'hut',
        sound: '',
        status: WAITING_TO_PLAY_AUDIO,
        gameNumber: 0
      };

      const state = game(initialState, {type: FINISHED_PLAYING_SOUND});

      expect(state).toEqual(expectedState);
    });

    it('after successful audio has been played, of word that was not pulsing, the different word carries on pulsing', () => {

      const foundWordsChanged = [{name: 'hut', match: true}, {name: 'dad'}, {name: 'bog', match: false}, {name: 'hut', 'match': true}, {
        name: '---',
        nextAvailable: true
      }, {name: '---'}, {name: '---'}, {name: '---'}, {name: '---'}, {name: '---'}];
      const foundWordsChanged2 = [{name: 'hut', match: true}, {name: 'dad', nextAvailable: true}, {name: 'bog', match: false}, {name: 'hut', 'match': true}, {
        name: '---',
        nextAvailable: true
      }, {name: '---'}, {name: '---'}, {name: '---'}, {name: '---'}, {name: '---'}];
      const initialState = {
        availableWords: availableWords,
        foundLetters: START_FOUND_LETTERS,
        foundWords: foundWordsChanged,
        currentWordPos: 0,
        currentWord: 'hut',
        sound: 'audio/words/hut.m4a',
        status: 'Word Matched',
        gameNumber: 0
      };
      deepFreeze(initialState);

      const expectedState = {
        availableWords: availableWords,
        foundLetters: START_FOUND_LETTERS,
        foundWords: foundWordsChanged2,
        currentWordPos: 0,
        currentWord: 'hut',
        sound: '',
        status: WAITING_TO_PLAY_AUDIO,
        gameNumber: 0
      };

      const state = game(initialState, {type: FINISHED_PLAYING_SOUND});

      expect(state).toEqual(expectedState);
    });

    it('word not matched audio finishes playing, and the game has been completed', () => {
      const foundWordsChanged = [{name: 'hut', match: true}, {name: 'dad', match: false}, {name: 'bog', match: false}];

      const initialState = {
        availableWords: availableWords,
        foundLetters: START_FOUND_LETTERS,
        foundWords: foundWordsChanged,
        currentWordPos: 0,
        currentWord: 'hut',
        sound: 'audio/warning.mp3',
        status: 'Word Not Matched',
        gameNumber: 0
      };
      deepFreeze(initialState);

      const expectedState = {
        availableWords: availableWords,
        foundLetters: START_FOUND_LETTERS,
        foundWords: foundWordsChanged,
        currentWordPos: 0,
        currentWord: 'hut',
        sound: 'audio/applause.mp3',
        status: 'Game Finished',
        numberCorrect: 1,
        gameNumber: 0,
        totalWords: 3
      };
      const state = game(initialState, {type: FINISHED_PLAYING_SOUND});

      expect(state).toEqual(expectedState);
    });

    it('word matched audio finishes playing, and the game has been completed', () => {
      const foundWordsChanged = [{name: 'hut', match: true}, {name: 'dad', match: false}, {name: 'bog', match: false}];

      const initialState = {
        availableWords: availableWords,
        foundLetters: START_FOUND_LETTERS,
        foundWords: foundWordsChanged,
        currentWordPos: 0,
        currentWord: 'hut',
        sound: 'audio/success.mp3',
        status: 'Word Matched',
        gameNumber: 0
      };
      deepFreeze(initialState);

      const expectedState = {
        availableWords: availableWords,
        foundLetters: START_FOUND_LETTERS,
        foundWords: foundWordsChanged,
        currentWordPos: 0,
        currentWord: 'hut',
        sound: 'audio/applause.mp3',
        status: 'Game Finished',
        numberCorrect: 1,
        gameNumber: 0,
        totalWords: 3
      };
      const state = game(initialState, {type: FINISHED_PLAYING_SOUND});

      expect(state).toEqual(expectedState);
    });
    it('word matched audio finishes playing, and the game has been completed, with all words matched', () => {
      const foundWordsChanged = [{name: 'hut', match: true}, {name: 'dad', match: true}, {name: 'bog', match: true}];

      const initialState = {
        availableWords: availableWords,
        foundLetters: START_FOUND_LETTERS,
        foundWords: foundWordsChanged,
        currentWordPos: 0,
        currentWord: 'hut',
        sound: 'audio/success.mp3',
        status: 'Word Matched',
        gameNumber: 0
      };
      deepFreeze(initialState);

      const expectedState = {
        availableWords: availableWords,
        foundLetters: START_FOUND_LETTERS,
        foundWords: foundWordsChanged,
        currentWordPos: 0,
        currentWord: 'hut',
        sound: 'audio/applause.mp3',
        status: 'Game Finished',
        numberCorrect: 3,
        gameNumber: 0,
        totalWords: 3
      };
      const state = game(initialState, {type: FINISHED_PLAYING_SOUND});

      expect(state).toEqual(expectedState);
    });

    it('after the game has completed keep the dialog displayed until one of the buttons is clicked', () => {
      const foundWordsChanged = [{name: 'hut', match: true}, {name: 'dad', match: false}, {name: 'bog', match: false}];
      const initialState = {
        availableWords: availableWords,
        foundLetters: START_FOUND_LETTERS,
        foundWords: foundWordsChanged,
        currentWordPos: 0,
        currentWord: 'hut',
        sound: 'audio/applause.mp3',
        status: 'Game Finished',
        numberCorrect: 1,
        gameNumber: 0,
        totalWords: 3
      };
      deepFreeze(initialState);

      const expectedState = {
        availableWords: availableWords,
        foundLetters: START_FOUND_LETTERS,
        foundWords: foundWordsChanged,
        currentWordPos: 0,
        currentWord: 'hut',
        sound: '',
        status: 'Game Finished',
        numberCorrect: 1,
        gameNumber: 0,
        totalWords: 3
      };
      const state = game(initialState, {type: FINISHED_PLAYING_SOUND});

      expect(state).toEqual(expectedState);
    });
  });
});
