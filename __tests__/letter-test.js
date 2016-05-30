'use strict';

jest.unmock('../js/components/letter');
jest.unmock('material-ui/lib/raised-button');

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import Letter from '../js/components/letter';
import {WAITING_FOR_INPUT} from '../js/constants/data'

navigator.__defineGetter__('userAgent', function() {
  return 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/49.0.2454.85 Safari/537.36'
});

describe('Letter component', () => {
  it('is not disabled, so it allows clicks, sending the name', () => {
    let buttonName = 'a';

    const myFunc = ((name) => {
      expect(buttonName).toEqual(name)
    });

    // Render a letter component in the document
    const letter = TestUtils.renderIntoDocument(
      <div><Letter status={WAITING_FOR_INPUT} letter="a" onLetterClicked={myFunc}/></div>
    );

    const letterNode = ReactDOM.findDOMNode(letter);
    let button = letterNode.children[0];
    TestUtils.Simulate.click(button);
    const spanNode=button.children[0].children[0];
    expect(spanNode.textContent).toEqual('a');
  });

  it('is not disabled, so it allows clicks, fails if wrong name', () => {
    let buttonName = 'a';

    const myFunc = ((name) => {
      expect('wrong name').not.toEqual(name)
    });

    // Render a checkbox with label in the document
    const letter = TestUtils.renderIntoDocument(
      <div><Letter status={WAITING_FOR_INPUT} letter="a" onLetterClicked={myFunc}/></div>
    );

    const letterNode = ReactDOM.findDOMNode(letter);
    let button = letterNode.children[0];
    TestUtils.Simulate.click(button);
    const spanNode=button.children[0].children[0];
    expect(spanNode.textContent).toEqual('a');
  });

  it('is disabled, so no click allowed', () => {
    let buttonName = 'a';
    const mockFn = jest.fn();

    // Render a checkbox with label in the document
    const letter = TestUtils.renderIntoDocument(
      <div><Letter status='Will make button disabled!' letter="a" onLetterClicked={mockFn}/></div>
    );

    const letterNode = ReactDOM.findDOMNode(letter);
    let button = letterNode.children[0];
    TestUtils.Simulate.click(button);
    expect(mockFn).not.toBeCalled();
    const spanNode=button.children[0].children[0];
    expect(spanNode.textContent).toEqual('a');

  });

});