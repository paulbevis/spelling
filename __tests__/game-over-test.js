'use strict';

jest.unmock('../js/components/game-over');
jest.unmock('material-ui/lib/raised-button');

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import GameOver from '../js/components/game-over';

navigator.__defineGetter__('userAgent', function() {
  return 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/49.0.2454.85 Safari/537.36'
});

describe('In the game, after the user submits a word...', () => {
  it('if this is the last word available to be submitted we display the component', () => {
    // Render a gameover component in the document
    const gameOver = TestUtils.renderIntoDocument(
      <GameOver status='Game Finished' numberCorrect="5"/>
    );

    const gameOverNode = ReactDOM.findDOMNode(gameOver);
    expect(gameOverNode.style.display).toEqual('flex');
    const titleNode = gameOverNode.children[0].children[0];
    expect(titleNode.textContent).toEqual('You got 5 correct!');

  });

  it('if this is not the last word available to spell, then keep the component hidden', () => {
    // Render a gameover component in the document
    const gameOver = TestUtils.renderIntoDocument(
      <GameOver status='Playing'/>
    );

    const gameOverNode = ReactDOM.findDOMNode(gameOver);
    expect(gameOverNode.style.display).toEqual('none');
  });

});