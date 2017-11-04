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

import React, {PropTypes, Component} from 'react';

const letterStyle = {
  color: 'white',
  flexBasis: 'auto',
  padding: '22px 35px',
  borderRadius: '3px',
  margin: '0 5px',
  background: '#7DA6A3'
};

export default class SubmittedLetter extends Component {

  render() {
    return <div ref={(c) => this._component = c} style={letterStyle}>{this.props.letter}</div>;
  }

  shouldComponentUpdate(nextProps) {
    return nextProps.letter !== this.props.letter;
  }

  componentDidUpdate() {
    this.updateLocation();
  }

  componentDidMount() {
    this.updateLocation();
  }

  updateLocation() {
    let {left, top} = this._component.getClientRects()[0];
    this.props.onLetterElementCreated(this.props.index, {left, top});
  }
}

SubmittedLetter.propTypes = {
  letter: PropTypes.string.isRequired
};
