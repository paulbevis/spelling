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
import {GAME_START,FINISHED_PLAYING_SOUND, LETTER_CLICKED, PLAY_WORD} from '../constants/action-types'

export function startGameAction() {
  return {
    type: GAME_START
  }
}
export function finishedPlayingSoundAction(value) {
  return {
    type: FINISHED_PLAYING_SOUND,
    value
  }
}
export function letterClickedAction(value) {
  return {
    type: LETTER_CLICKED,
    value
  }
}
export function playWordAction(word) {
  return {
    type: PLAY_WORD,
    word
  }
}