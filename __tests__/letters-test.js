'use strict';

jest.unmock('../js/containers/letters');
jest.unmock('../js/components/letter');
jest.unmock('material-ui/lib/raised-button');

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import Letters from '../js/containers/letters';
import {GAME_LETTERS} from '../js/constants/data'

navigator.__defineGetter__('userAgent', function() {
  return 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/49.0.2454.85 Safari/537.36'
});

describe('Letters tests', () => {
  it('when game not over display two rows of letter components', () => {
    let buttonName = 'a';

    const myFunc = jest.fn();
    const lettersArray = GAME_LETTERS.split('');

    // Render a letter component in the document
    const letters = TestUtils.renderIntoDocument(
      <Letters key='letters' letters={lettersArray} status='Waiting For Input' onLetterClicked={myFunc}/>
    );

    const lettersNode = ReactDOM.findDOMNode(letters);
    expect(lettersNode.style.display).toEqual('flex');
    expect(lettersNode.children[0].children.length).toEqual(2);// two rows of letters

    const lettersInTopRow = lettersNode.children[0].children[0].children.length;
    const lettersInBottomRow = lettersNode.children[0].children[1].children.length;
    const topRowNode = lettersNode.children[0].children[0];
    const bottomRowNode = lettersNode.children[0].children[1];

    expect(topRowNode.className).toEqual('top-letter-row');
    expect(bottomRowNode.className).toEqual('bottom-letter-row');
    expect(lettersInTopRow).toEqual(13);// first row of letters
    expect(lettersInBottomRow).toEqual(13);// first row of letters
  });

  it('when game is over then do not display any letters', () => {
    let buttonName = 'a';

    const myFunc = jest.fn();
    const lettersArray = GAME_LETTERS.split('');

    // Render a letter component in the document
    const letters = TestUtils.renderIntoDocument(
      <Letters key='letters' letters={lettersArray} status='Game Finished' onLetterClicked={myFunc}/>
    );

    const lettersNode = ReactDOM.findDOMNode(letters);
    expect(lettersNode.style.display).toEqual('none');
  });

});