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

import {clone} from 'ramda'

export const wordSet = function(wordSetNumber) {
  const availableWordSets = [
    ['bin', 'cat', 'fan', 'hut', 'jog', 'leg', 'nod', 'pen', 'run', 'wig'],
    ['bin', 'cat', 'fan', 'hut', 'jog', 'leg', 'nod', 'pen', 'run', 'wig']];

  const shuffleArray = function(suppliedArray) {
    let array = clone(suppliedArray);
    for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  };

  const word = function(wordSetNumber) {
    return shuffleArray(availableWordSets[wordSetNumber]);
  };

  return word(wordSetNumber);
};