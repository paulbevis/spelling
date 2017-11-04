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

import {GAME_LETTERS, START_LETTERS} from '../constants/data';
import * as types from '../constants/action-types';
import {find, findIndex, findLast, map, propEq} from 'ramda';

export default  function letters(state = buildLetters(START_LETTERS), action) {
  console.log('state: ',action)
  switch (action.type) {
    case types.GAME_START:
    case types.GAME_NEXT_START:
      return buildLetters(GAME_LETTERS);
    case types.LETTER_CLICKED:
      return addLocationToLetter(state, action);
    case types.SUBMITTED_LETTER_LOCATION:
      return updateDestinationForLetter(state, action);

    default:
      return state;
  }
}

function updateDestinationForLetter(state, action) {
  console.log('setting location', action);
  let newState = {};
  newState.src = state.src;
  // newState.currentDestination = state.destcurrentDestination;
  newState.destinations = [
    ...state.destinations.slice(0, action.elementIndex),
    Object.assign({}, {xPos: action.rect.left, yPos: action.rect.top}),
    ...state.destinations.slice(action.elementIndex + 1)
  ];
  return newState;
}

function addLocationToLetter(state, action) {
  let newState = {};
  let letterIndex = action.letter.charCodeAt() - 97;

  let firstFreeLocationIndex = findIndex((dest) => !dest.letter, state.destinations);

  newState.destinations = [
    ...state.destinations.slice(0, firstFreeLocationIndex),
    Object.assign({}, {
      xPos: state.destinations[firstFreeLocationIndex].xPos,
      yPos: state.destinations[firstFreeLocationIndex].yPos,
      letter: action.letter
    }),
    ...state.destinations.slice(firstFreeLocationIndex + 1)
  ]


  // map((dest) => dest.letter ? dest : {xPos: dest.xPos, yPos: dest.yPos, letter: action.letter}, state.destinations);
  // const occurrence = findLast(propEq('letter', action.letter))(newState.destinations);
  newState.src = [
    ...state.src.slice(0, letterIndex),
    Object.assign({}, {
      value: state.src[letterIndex].value, dest: {
        xPos: newState.destinations[firstFreeLocationIndex].xPos,
        yPos: newState.destinations[firstFreeLocationIndex].yPos
      }
    }),
    ...state.src.slice(letterIndex + 1)
  ];
  return newState;
}

function buildLetters(letters) {
  return {src: map((letter) => ({value: letter}), letters.split('')), destinations: []};
}