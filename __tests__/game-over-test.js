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
  it('if this is the last word available to be submitted we display the game overcomponent', () => {
    const onStartNextGameMockFunc = jest.fn();
    const onStartSameGameMockFunc = jest.fn();
    // Render a gameover component in the document
    const gameOver = TestUtils.renderIntoDocument(
      <GameOver status='Game Finished' numberCorrect="5" onStartNextGame={onStartNextGameMockFunc} onStartSameGame={onStartSameGameMockFunc}/>
    );

    const gameOverNode = ReactDOM.findDOMNode(gameOver);
    expect(gameOverNode.style.display).toEqual('flex');
    const titleNode = gameOverNode.children[0].children[0];
    expect(titleNode.textContent).toEqual('You got 5 correct!');

  });

  it('if this is not the last word available to spell, then keep the component hidden', () => {
    const onStartNextGameMockFunc = jest.fn();
    const onStartSameGameMockFunc = jest.fn();
    // Render a gameover component in the document
    const gameOver = TestUtils.renderIntoDocument(
      <GameOver status='Playing' onStartNextGame={onStartNextGameMockFunc} onStartSameGame={onStartSameGameMockFunc}/>
    );

    const gameOverNode = ReactDOM.findDOMNode(gameOver);
    expect(gameOverNode.style.display).toEqual('none');
  });

  it('should call the appropriate function when clicking same game button', () => {
    const onStartNextGameMockFunc = jest.fn();
    const onStartSameGameMockFunc = jest.fn();
    // Render a gameover component in the document
    const gameOver = TestUtils.renderIntoDocument(
      <GameOver status='Game Finished' onStartNextGame={onStartNextGameMockFunc} onStartSameGame={onStartSameGameMockFunc}/>
    );

    const gameOverNode = ReactDOM.findDOMNode(gameOver);
    expect(gameOverNode.style.display).toEqual('flex');
    let startSameButton = gameOverNode.children[0].children[1].children[0].children[0];
    expect(startSameButton.tagName).toEqual('BUTTON');
    expect(startSameButton.textContent).toEqual('Start Again?');
    TestUtils.Simulate.click(startSameButton);
    expect(onStartSameGameMockFunc).toBeCalled();
  });

  it('should call the appropriate function when clicking new game button', () => {
    const onStartNextGameMockFunc = jest.fn();
    const onStartSameGameMockFunc = jest.fn();
    // Render a gameover component in the document
    const gameOver = TestUtils.renderIntoDocument(
      <GameOver status='Game Finished' onStartNextGame={onStartNextGameMockFunc} onStartSameGame={onStartSameGameMockFunc}/>
    );

    const gameOverNode = ReactDOM.findDOMNode(gameOver);
    expect(gameOverNode.style.display).toEqual('flex');
    let startNewButton = gameOverNode.children[0].children[1].children[1].children[0];
    expect(startNewButton.tagName).toEqual('BUTTON');
    expect(startNewButton.textContent).toEqual('Move to harder words?');
    TestUtils.Simulate.click(startNewButton);
    expect(onStartNextGameMockFunc).toBeCalled();
  });

  it(' displays the special message, sound, and hides next game button because no words were guessed correctly', () => {
    const onStartNextGameMockFunc = jest.fn();
    const onStartSameGameMockFunc = jest.fn();
    // Render a gameover component in the document
    const gameOver = TestUtils.renderIntoDocument(
      <GameOver numberCorrect='0' totalNumber='0' status='Game Finished' onStartNextGame={onStartNextGameMockFunc} onStartSameGame={onStartSameGameMockFunc}/>
    );

    const gameOverNode = ReactDOM.findDOMNode(gameOver);
    expect(gameOverNode.style.display).toEqual('flex');
    let buttonContainer = gameOverNode.children[0].children[1].children[1];
    expect(buttonContainer.children.length).toEqual(1);

    let startSameButton = gameOverNode.children[0].children[1].children[0].children[0];
    expect(startSameButton.tagName).toEqual('BUTTON');
    expect(startSameButton.textContent).toEqual('Start Again?');
    TestUtils.Simulate.click(startSameButton);
    expect(onStartSameGameMockFunc).toBeCalled();

    expect(gameOverNode.style.display).toEqual('flex');
    const titleNode = gameOverNode.children[0].children[0];
    expect(titleNode.textContent).toEqual('Shall we try again?')
  });

  it(' displays the special message, because no words were guessed incorrectly', () => {
    const onStartNextGameMockFunc = jest.fn();
    const onStartSameGameMockFunc = jest.fn();
    // Render a gameover component in the document
    const gameOver = TestUtils.renderIntoDocument(
      <GameOver numberCorrect='10' totalWords='10' status='Game Finished' onStartNextGame={onStartNextGameMockFunc} onStartSameGame={onStartSameGameMockFunc}/>
    );

    const gameOverNode = ReactDOM.findDOMNode(gameOver);
    expect(gameOverNode.style.display).toEqual('flex');
    let buttonContainer = gameOverNode.children[0].children[1];
    expect(buttonContainer.children.length).toEqual(2);

    const titleNode = gameOverNode.children[0].children[0];
    expect(titleNode.textContent).toEqual('Fanatastic, you got them all correct!')
  });

});