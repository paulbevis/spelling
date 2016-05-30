'use strict';

jest.unmock('../js/components/found-word');

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import FoundWord from '../js/components/found-word';
import {WAITING_TO_PLAY_AUDIO, WAITING_FOR_INPUT} from '../js/constants/data'

navigator.__defineGetter__('userAgent', function() {
  return 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/49.0.2454.85 Safari/537.36'
});

describe('FoundWord component', () => {
  const word = {'match': true, name: 'hut'};
  const id = '0';

  const mockFn = jest.fn();
  it('if word matched, then it should display the word, in yellow, with a happy icon', () => {

    // Render a found word component in the document
    const foundWord = TestUtils.renderIntoDocument(
      <FoundWord word={word} status="Playing" id={id} onPlayWord={mockFn}/>
    );

    const foundWordNode = ReactDOM.findDOMNode(foundWord);
    let nameSpan = foundWordNode.children[0].children[0];
    let icon = foundWordNode.children[0].children[1];
    expect(nameSpan.tagName).toEqual('SPAN');
    expect(nameSpan.textContent).toEqual(word.name);
    expect(nameSpan.style.color).toEqual('yellow');
    expect(icon.textContent).toEqual('sentiment_satisfied');
    expect(icon.style.color).toEqual('yellow');

  });

  it('if word matched, then it should not be able to be clicked, to play again', () => {

    // Render a found word component in the document
    const foundWord = TestUtils.renderIntoDocument(
      <FoundWord word={word} status={WAITING_TO_PLAY_AUDIO} id={id} onPlayWord={mockFn}/>
    );

    const foundWordNode = ReactDOM.findDOMNode(foundWord);
    let icon = foundWordNode.children[0].children[1];
    expect(icon.style.cursor).toEqual('default');
    TestUtils.Simulate.click(icon);
    expect(mockFn).not.toBeCalled();
  });

  it('is not matched correctly, then it should be able to be clicked again', () => {
    let word = {'match': false, name: 'xxx'};
    // Render a found word component in the document
    const foundWord = TestUtils.renderIntoDocument(
      <FoundWord word={word} status={WAITING_TO_PLAY_AUDIO} id={id} onPlayWord={mockFn}/>
    );

    const foundWordNode = ReactDOM.findDOMNode(foundWord);
    let icon = foundWordNode.children[0].children[1];
    expect(icon.style.cursor).toEqual('default');
    TestUtils.Simulate.click(icon);
    expect(mockFn).not.toBeCalled();
  });

  it('if word not matched correctly, then it should display the red frown icon', () => {
    let word = {'match': false, name: 'xxx'};
    // Render a found word component in the document
    const foundWord = TestUtils.renderIntoDocument(
      <FoundWord word={word} status={WAITING_TO_PLAY_AUDIO} id={id} onPlayWord={mockFn}/>
    );

    const foundWordNode = ReactDOM.findDOMNode(foundWord);
    let icon = foundWordNode.children[0].children[1];
    expect(icon.textContent).toEqual('sentiment_dissatisfied');
    expect(icon.style.color).toEqual('red');

    let nameSpan = foundWordNode.children[0].children[0];
    expect(nameSpan.style.color).toEqual('red');


  });

  it('if game not started yet i.e. status === disabled, icon should be a mic with a line through it', () => {
    let word = {name: '---'};
    // Render a found word component in the document
    const foundWord = TestUtils.renderIntoDocument(
      <FoundWord word={word} status='disabled' id={id} onPlayWord={mockFn}/>
    );

    const foundWordNode = ReactDOM.findDOMNode(foundWord);
    let icon = foundWordNode.children[0].children[1];
    expect(icon.textContent).toEqual('mic_off');
    expect(icon.style.color).toEqual('white');

    let nameSpan = foundWordNode.children[0].children[0];
    expect(nameSpan.style.color).toEqual('white');

  });

  it('if the game is just starting (playin the intro speech) i.e. status === Intro, icon should be a mic with a line through it', () => {
    let word = {name: '---'};
    // Render a found word component in the document
    const foundWord = TestUtils.renderIntoDocument(
      <FoundWord word={word} status='Intro' id={id} onPlayWord={mockFn}/>
    );

    const foundWordNode = ReactDOM.findDOMNode(foundWord);
    let icon = foundWordNode.children[0].children[1];
    expect(icon.textContent).toEqual('mic_off');
    expect(icon.style.color).toEqual('white');

    let nameSpan = foundWordNode.children[0].children[0];
    expect(nameSpan.style.color).toEqual('white');

  });


  it('if the game has started and the word has no match attempts, and the status is not intro or disabled, then, icon should be a white mic', () => {
    let word = {name: '---'};
    // Render a found word component in the document
    const foundWord = TestUtils.renderIntoDocument(
      <FoundWord word={word} status='Playing' id={id} onPlayWord={mockFn}/>
    );

    const foundWordNode = ReactDOM.findDOMNode(foundWord);
    let icon = foundWordNode.children[0].children[1];
    expect(icon.textContent).toEqual('mic');
    expect(icon.style.color).toEqual('white');

    let nameSpan = foundWordNode.children[0].children[0];
    expect(nameSpan.style.color).toEqual('white');

  });


});