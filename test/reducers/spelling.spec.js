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
import {CELL_CLICK, GAME_START, GAME_SELECT, LAST_LETTER_FOUND, FINISHED_PLAYING_SOUND, PLAY_WORD, LETTER_CLICKED} from '../../js/constants/action-types'
import {START_FOUND_LETTERS, GAMES} from '../../js/constants/data'
import deepFreeze from 'deep-freeze'
import {difference} from 'ramda'

describe('Spelling game', () => {
  const letterButtonHyphens = [{name: '-'},
    {name: '-'}, {name: '-'},
    {name: '-'}, {name: '-'},
    {name: '-'}, {name: '-'},
    {name: '-'}, {name: '-'},
    {name: '-'}, {name: '-'},
    {name: '-'}, {name: '-'},
    {name: '-'}, {name: '-'},
    {name: '-'}, {name: '-'},
    {name: '-'}, {name: '-'},
    {name: '-'}, {name: '-'},
    {name: '-'}, {name: '-'},
    {name: '-'}, {name: '-'},
    {name: '-'}];

  const letterButtonLetters = [{name: 'a'},
    {name: 'b'}, {name: 'c'},
    {name: 'd'}, {name: 'e'},
    {name: 'f'}, {name: 'g'},
    {name: 'h'}, {name: 'i'},
    {name: 'j'}, {name: 'k'},
    {name: 'l'}, {name: 'm'},
    {name: 'n'}, {name: 'o'},
    {name: 'p'}, {name: 'q'},
    {name: 'r'}, {name: 's'},
    {name: 't'}, {name: 'u'},
    {name: 'v'}, {name: 'w'},
    {name: 'x'}, {name: 'y'},
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
      expect(difference(result.availableWords, GAMES[0])).toEqual([]);
      expect(result.sound).toEqual('');
      expect(result.status).toEqual('disabled');
    });

    it('on initialisation with supplied action type GAME_START', () => {
      const initialState = game(undefined, {});
      deepFreeze(initialState);

      const expectState = {
        availableWords: initialState.availableWords.slice(0),
        foundLetters: START_FOUND_LETTERS,
        foundWords: foundWords,
        sound: 'audio/start.mp3',
        status: 'Intro'
      };

      const state = game(initialState, {type: GAME_START});
      expect(state).toEqual(expectState);
    });

    it('the game has started, and intro audio finished', () => {

      const initialState = {
        availableWords: GAMES[0],
        foundLetters: START_FOUND_LETTERS,
        foundWords: foundWords,
        sound: 'audio/start.mp3',
        status: 'Intro'
      };
      deepFreeze(initialState);
      const foundWordsChanged = [{name: '---'}, {name: '---'}, {name: '---'}, {name: '---'}, {name: '---'}, {name: '---'}, {name: '---'}, {name: '---'}, {name: '---'}, {name: '---'}];

      const expectedState = {
        availableWords: GAMES[0],
        foundLetters: START_FOUND_LETTERS,
        foundWords: foundWordsChanged,
        currentWordPos: undefined,
        currentWord: undefined,
        sound: '',
        status: 'Waiting to play a word audio'
      };
      expectedState.foundWords[0].nextAvailable = true;

      const state = game(initialState, {type: FINISHED_PLAYING_SOUND});

      expect(state).toEqual(expectedState);
    });

    it('play a word audio', () => {

      const initialState = {
        availableWords: GAMES[0],
        foundLetters: START_FOUND_LETTERS,
        foundWords: foundWords,
        currentWordPos: undefined,
        currentWord: undefined,
        status: 'Waiting to play a word audio'
      };
      deepFreeze(initialState);

      const expectedState = {
        availableWords: GAMES[0],
        foundLetters: START_FOUND_LETTERS,
        foundWords: foundWords,
        currentWordPos: 3,
        currentWord: 'hut',
        sound: 'audio/words/hut.m4a',
        status: 'Playing'
      };

      const state = game(initialState, {type: PLAY_WORD, key: 3});

      expect(state).toEqual(expectedState);
    });

    it('word audio has finished', () => {

      const initialState = {
        availableWords: GAMES[0],
        foundLetters: START_FOUND_LETTERS,
        foundWords: foundWords,
        currentWordPos: 3,
        currentWord: 'hut',
        sound: 'audio/words/hut.m4a',
        status: 'Playing'
      };
      deepFreeze(initialState);

      const expectedState = {
        availableWords: GAMES[0],
        foundLetters: START_FOUND_LETTERS,
        foundWords: foundWords,
        currentWordPos: 3,
        currentWord: 'hut',
        sound: '',
        status: 'Waiting For Input'
      };

      const state = game(initialState, {type: FINISHED_PLAYING_SOUND});

      expect(state).toEqual(expectedState);
    });

    it('first letter is clicked', () => {
      const initialState = {
        availableWords: GAMES[0],
        foundLetters: START_FOUND_LETTERS,
        foundWords: foundWords,
        currentWordPos: 3,
        currentWord: 'hut',
        sound: '',
        status: 'Waiting For Input'
      };
      deepFreeze(initialState);

      const expectedState = {
        availableWords: GAMES[0],
        foundLetters: ['h', '-', '-'],
        foundWords: foundWords,
        currentWordPos: 3,
        currentWord: 'hut',
        sound: '',
        status: 'Waiting For Input'
      };

      const state = game(initialState, {type: LETTER_CLICKED, letter: 'h'});
      expect(state).toEqual(expectedState);
    });

    it('second letter is clicked', () => {
      const initialState = {
        availableWords: GAMES[0],
        foundLetters: ['h', '-', '-'],
        foundWords: foundWords,
        currentWordPos: 3,
        currentWord: 'hut',
        sound: '',
        status: 'Waiting For Input'
      };
      deepFreeze(initialState);

      const expectedState = {
        availableWords: GAMES[0],
        foundLetters: ['h', 'u', '-'],
        foundWords: foundWords,
        currentWordPos: 3,
        currentWord: 'hut',
        sound: '',
        status: 'Waiting For Input'
      };

      const state = game(initialState, {type: LETTER_CLICKED, letter: 'u'});
      expect(state).toEqual(expectedState);
    });

    it('third letter is clicked, successfully matching word', () => {
      const foundWordsChanged = [{name: '---'}, {name: '---'}, {name: '---'}, {name: '---'}, {name: '---'}, {name: '---'}, {name: '---'}, {name: '---'}, {name: '---'}, {name: '---'}];
      const initialState = {
        availableWords: GAMES[0],
        foundLetters: ['h', 'u', '-'],
        foundWords: foundWords,
        currentWordPos: 3,
        currentWord: 'hut',
        sound: '',
        status: 'Waiting For Input'
      };
      deepFreeze(initialState);

      let expectedState = {
        availableWords: GAMES[0],
        foundLetters: ['h', 'u', 't'],
        foundWords: foundWordsChanged,
        currentWordPos: 3,
        currentWord: 'hut',
        sound: 'audio/success.mp3',
        status: 'Word Matched'
      };
      expectedState.foundWords[3] = {'name': 'hut', 'match': true};

      const state = game(initialState, {type: LETTER_CLICKED, letter: 't'});
      expect(state).toEqual(expectedState);
    });

    it('play audio on successful word match', () => {

      const foundWordsChanged = [{name: '---'}, {name: '---'}, {name: '---'}, {name: 'hut', 'match': true}, {name: '---'}, {name: '---'}, {name: '---'}, {name: '---'}, {name: '---'}, {name: '---'}];
      const initialState = {
        availableWords: GAMES[0],
        foundLetters: START_FOUND_LETTERS,
        foundWords: foundWordsChanged,
        currentWordPos: 3,
        currentWord: 'hut',
        sound: 'audio/success.mp3',
        status: 'Word Matched'
      };
      deepFreeze(initialState);

      const expectedState = {
        availableWords: GAMES[0],
        foundLetters: START_FOUND_LETTERS,
        foundWords: foundWordsChanged,
        currentWordPos: 3,
        currentWord: 'hut',
        sound: '',
        status: 'Waiting to play a word audio'
      };

      const state = game(initialState, {type: FINISHED_PLAYING_SOUND});

      expect(state).toEqual(expectedState);
    });

    it('third letter is clicked, unsuccessfully matching word', () => {
      const foundWordsChanged = [{name: '---'}, {name: '---'}, {name: '---'}, {name: '---'}, {name: '---'}, {name: '---'}, {name: '---'}, {name: '---'}, {name: '---'}, {name: '---'}];
      const initialState = {
        availableWords: GAMES[0],
        foundLetters: ['h', 'u', '-'],
        foundWords: foundWords,
        currentWordPos: 3,
        currentWord: 'hut',
        sound: '',
        status: 'Waiting For Input'
      };
      deepFreeze(initialState);

      let expectedState = {
        availableWords: GAMES[0],
        foundLetters: ['h', 'u', 'p'],
        foundWords: foundWordsChanged,
        currentWordPos: 3,
        currentWord: 'hut',
        sound: 'audio/warning.mp3',
        status: 'Word Not Matched'
      };
      expectedState.foundWords[3] = {'name': 'hup', 'match': false};

      const state = game(initialState, {type: LETTER_CLICKED, letter: 'p'});
      expect(state).toEqual(expectedState);
    });

    it('play audio on unsuccessful word match', () => {

      const foundWordsChanged = [{name: '---'}, {name: '---'}, {name: '---'}, {name: 'hut', 'match': true}, {name: '---'}, {name: '---'}, {name: '---'}, {name: '---'}, {name: '---'}, {name: '---'}];
      const initialState = {
        availableWords: GAMES[0],
        foundLetters: START_FOUND_LETTERS,
        foundWords: foundWordsChanged,
        currentWordPos: 3,
        currentWord: 'hut',
        sound: 'audio/warning.mp3',
        status: 'Word Not Matched'
      };
      deepFreeze(initialState);

      const expectedState = {
        availableWords: GAMES[0],
        foundLetters: START_FOUND_LETTERS,
        foundWords: foundWordsChanged,
        currentWordPos: 3,
        currentWord: 'hut',
        sound: '',
        status: 'Waiting to play a word audio'
      };

      const state = game(initialState, {type: FINISHED_PLAYING_SOUND});

      expect(state).toEqual(expectedState);
    });

    it('third letter is clicked, unsuccessfully matching word', () => {
      const foundWordsChanged = [{name: '---'}, {name: '---'}, {name: '---'}, {name: '---'}, {name: '---'}, {name: '---'}, {name: '---'}, {name: '---'}, {name: '---'}, {name: '---'}];
      const initialState = {
        availableWords: GAMES[0],
        foundLetters: ['h', 'u', '-'],
        foundWords: foundWords,
        currentWordPos: 3,
        currentWord: 'hut',
        sound: '',
        status: 'Waiting For Input'
      };
      deepFreeze(initialState);

      let expectedState = {
        availableWords: GAMES[0],
        foundLetters: ['h', 'u', 'p'],
        foundWords: foundWordsChanged,
        currentWordPos: 3,
        currentWord: 'hut',
        sound: 'audio/warning.mp3',
        status: 'Word Not Matched'
      };
      expectedState.foundWords[3] = {'name': 'hup', 'match': false};

      const state = game(initialState, {type: LETTER_CLICKED, letter: 'p'});
      expect(state).toEqual(expectedState);
    });

    it('after successful audio has been played, the next available word pulses', () => {

      const foundWordsChanged = [{name: 'hut', matched:true}, {name: 'dad'}, {name: 'bog', matched:false}, {name: 'hut', 'match': true}, {name: '---'}, {name: '---'}, {name: '---'}, {name: '---'}, {name: '---'}, {name: '---'}];
      const foundWordsChanged2 = [{name: 'hut', matched:true}, {name: 'dad', nextAvailable:true}, {name: 'bog', matched:false}, {name: 'hut', 'match': true}, {name: '---'}, {name: '---'}, {name: '---'}, {name: '---'}, {name: '---'}, {name: '---'}];
      const initialState = {
        availableWords: GAMES[0],
        foundLetters: START_FOUND_LETTERS,
        foundWords: foundWordsChanged,
        currentWordPos: 3,
        currentWord: 'hut',
        sound: 'audio/words/hut.m4a',
        status: 'Word Matched'
      };
      deepFreeze(initialState);

      const expectedState = {
        availableWords: GAMES[0],
        foundLetters: START_FOUND_LETTERS,
        foundWords: foundWordsChanged2,
        currentWordPos: 3,
        currentWord: 'hut',
        sound: '',
        status: 'Waiting to play a word audio'
      };

      const state = game(initialState, {type: FINISHED_PLAYING_SOUND});

      expect(state).toEqual(expectedState);
    });

    it('after successful audio has been played, the next available word pulses, and the previous one stops', () => {

      const foundWordsChanged = [{name: 'hut', match:true}, {name: 'dad'}, {name: 'bog', match:false}, {name: 'hut', 'match': true}, {name: '---'}, {name: '---'}, {name: '---'}, {name: '---'}, {name: '---'}, {name: '---'}];
      const foundWordsChanged2 = [{name: 'hut', match:true}, {name: 'dad', nextAvailable:true}, {name: 'bog', match:false}, {name: 'hut', 'match': true}, {name: '---'}, {name: '---'}, {name: '---'}, {name: '---'}, {name: '---'}, {name: '---'}];
      const initialState = {
        availableWords: GAMES[0],
        foundLetters: START_FOUND_LETTERS,
        foundWords: foundWordsChanged,
        currentWordPos: 0,
        currentWord: 'hut',
        sound: 'audio/words/hut.m4a',
        status: 'Word Matched'
      };
      deepFreeze(initialState);

      const expectedState = {
        availableWords: GAMES[0],
        foundLetters: START_FOUND_LETTERS,
        foundWords: foundWordsChanged2,
        currentWordPos: 0,
        currentWord: 'hut',
        sound: '',
        status: 'Waiting to play a word audio'
      };

      const state = game(initialState, {type: FINISHED_PLAYING_SOUND});

      expect(state).toEqual(expectedState);
    });

    it('after successful audio has been played, of word that was not pulsing, the different word carries on pulsing', () => {

      const foundWordsChanged = [{name: 'hut', match:true}, {name: 'dad'}, {name: 'bog', match:false}, {name: 'hut', 'match': true}, {name: '---', nextAvailable:true}, {name: '---'}, {name: '---'}, {name: '---'}, {name: '---'}, {name: '---'}];
      const foundWordsChanged2 = [{name: 'hut', match:true}, {name: 'dad'}, {name: 'bog', match:false}, {name: 'hut', 'match': true}, {name: '---', nextAvailable:true}, {name: '---'}, {name: '---'}, {name: '---'}, {name: '---'}, {name: '---'}];
      const initialState = {
        availableWords: GAMES[0],
        foundLetters: START_FOUND_LETTERS,
        foundWords: foundWordsChanged,
        currentWordPos: 0,
        currentWord: 'hut',
        sound: 'audio/words/hut.m4a',
        status: 'Word Matched'
      };
      deepFreeze(initialState);

      const expectedState = {
        availableWords: GAMES[0],
        foundLetters: START_FOUND_LETTERS,
        foundWords: foundWordsChanged2,
        currentWordPos: 0,
        currentWord: 'hut',
        sound: '',
        status: 'Waiting to play a word audio'
      };

      const state = game(initialState, {type: FINISHED_PLAYING_SOUND});

      expect(state).toEqual(expectedState);
    });
  });
});