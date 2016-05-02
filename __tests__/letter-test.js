'use strict';

jest.unmock('../js/components/letter');
jest.unmock('material-ui/lib/raised-button');

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import Letter from '../js/components/letter';

describe('Letter tests', () => {
  it('if not disabled, then it allows clicks, sending the name', () => {
    let buttonName = 'a';

    const myFunc = ((name) => {
      expect(buttonName).toEqual(name)
    });

    // Render a letter component in the document
    const letter = TestUtils.renderIntoDocument(
      <Letter status='Waiting For Input' name="a" onLetterClicked={myFunc}/>
    );

    const letterNode = ReactDOM.findDOMNode(letter);
    let button = letterNode.children[0];
    TestUtils.Simulate.click(button);
    const spanNode=button.children[0].children[0];
    expect(spanNode.textContent).toEqual('a');
  });

  it('if not disabled, then it allows clicks, fails if wrong name', () => {
    let buttonName = 'a';

    const myFunc = ((name) => {
      expect('wrong name').not.toEqual(name)
    });

    // Render a checkbox with label in the document
    const letter = TestUtils.renderIntoDocument(
      <Letter status='Waiting For Input' name="a" onLetterClicked={myFunc}/>
    );

    const letterNode = ReactDOM.findDOMNode(letter);
    let button = letterNode.children[0];
    TestUtils.Simulate.click(button);
    const spanNode=button.children[0].children[0];
    expect(spanNode.textContent).toEqual('a');
  });

  it('button disabled, so no click allowed', () => {
    let buttonName = 'a';
    const mockFn = jest.fn();

    // Render a checkbox with label in the document
    const letter = TestUtils.renderIntoDocument(
      <Letter status='Will make button disabled!' name="a" onLetterClicked={mockFn}/>
    );

    const letterNode = ReactDOM.findDOMNode(letter);
    let button = letterNode.children[0];
    TestUtils.Simulate.click(button);
    expect(mockFn).not.toBeCalled();
    const spanNode=button.children[0].children[0];
    expect(spanNode.textContent).toEqual('a');

  });

});