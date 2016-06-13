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

import * as types from '../constants/action-types';

export function startGame() {
  return {
    type: types.GAME_START
  };
}
export function startNextGame() {
  return {
    type: types.GAME_NEXT_START
  };
}
export function finishedPlayingSound() {
  return {
    type: types.FINISHED_PLAYING_SOUND
  };
}
export function letterClicked(letter) {
  return {
    type: types.LETTER_CLICKED,
    letter
  };
}
export function playWord(key) {
  return {
    type: types.PLAY_WORD,
    key
  };
}