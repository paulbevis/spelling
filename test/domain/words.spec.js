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
import {wordSet} from '../../js/domain/words'
import {difference} from 'ramda'

describe('when requesting a set of words', () => {

  it('should return back an array of 10 words', () => {
    expect(wordSet(0).length).toEqual(10)
  });

  it('should contain the list of known words', () => {
    expect(difference(wordSet(0), ['bin', 'cat', 'fan', 'hut', 'jog', 'leg', 'nod', 'pen', 'run', 'wig'])).toEqual([]);
    expect(difference(wordSet(1), ['flat', 'shed', 'like', 'help', 'rain', 'wind', 'snow', 'tree', 'seat', 'door'])).toEqual([]);
  });

  it('should contain the list of known words, in a shuffled state', () => {
    expect(wordSet(0)).toNotEqual(['bin', 'cat', 'fan', 'hut', 'jog', 'leg', 'nod', 'pen', 'run', 'wig']);
    expect(wordSet(1)).toNotEqual(['flat', 'shed', 'like', 'help', 'rain', 'wind', 'snow', 'tree', 'seat', 'door']);
  });

});