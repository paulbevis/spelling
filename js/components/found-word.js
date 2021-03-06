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

import React, {Component, PropTypes} from 'react';
import * as constants from '../constants/data';

export default class FoundWord extends Component {
  render() {
    const correct = {colour: 'yellow', icon: 'sentiment_satisfied', selectable: 'default'};
    const wrong = {colour: 'red', icon: 'sentiment_dissatisfied', selectable: 'default'};
    const unknown = {colour: 'white', icon: 'mic', selectable: this.props.word.nextAvailable ? 'pointer' : 'default'};
    const disabled = {colour: 'white', icon: 'mic_off', selectable: 'default'};
    let results = this.props.word.match === true ? correct :
      this.props.word.match === false ? wrong :
        this.props.status === 'disabled' || this.props.status === 'Intro' ? disabled : unknown;

    const myStyle = {
      padding: '2px 10px 2px 10px',
      margin: '2px',
      fontSize: '22px',
      lineHeight: '34px',
      background: this.props.word.nextAvailable ? '#ff4081' : '#7DA6A3',
      borderRadius: '2px'
    };
    const pulsingClasses = this.props.word.nextAvailable ? 'pulse animated infinite' : '';

    return (
      <div style={myStyle} className={pulsingClasses}>
        <div style={{display:'flex', flexDirection: 'row', justifyContent:'center'}}>
          <span style={{color:results.colour}}>{this.props.word.name}</span>
          <i className="material-icons"
             style={{padding:'5px',cursor: results.selectable, color:results.colour}}
             onClick={() => this.processClick()}>{results.icon}</i>
        </div>
      </div>
    );
  }

  processClick() {
    if (this.props.word.nextAvailable &&
      this.props.word.match !== true &&
      (this.props.status === constants.WAITING_TO_PLAY_AUDIO || this.props.status === constants.WAITING_FOR_INPUT)) {
      this.props.onPlayWord(this.props.id);
    }
  }

}

FoundWord.propTypes = {
  word: PropTypes.object.isRequired,
  onPlayWord: PropTypes.func.isRequired
};

