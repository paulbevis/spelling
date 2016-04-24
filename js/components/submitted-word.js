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
import React, {Component, PropTypes} from 'react'

export default class SubmittedWord extends Component {
  render() {
    const correct = {colour: 'green', icon: 'sentiment_satisfied', selectable: 'default'};
    const wrong = {colour: 'red', icon: 'sentiment_dissatisfied', selectable: 'default'};
    const unknown = {colour: 'white', icon: 'mic', selectable: 'pointer'};
    let results = this.props.word.match === true ? correct : this.props.word.match === false ? wrong : unknown;
    const myStyle = {
      padding: '2px 10px 2px 10px',
      margin: '2px',
      fontSize: '22px',
      lineHeight: '34px',
      color: results.colour,
      background: '#7DA6A3',
      borderRadius: '2px'
    };
    return (
      <div style={myStyle}>
        <div style={{display:'flex', flexDirection: 'row', justifyContent:'center'}}>
          <span>{this.props.word.name}</span>
          <i className="material-icons" 
             style={{padding:'5px',cursor: results.selectable}} 
             onClick={(e) => this.props.onPlayWord(this.props.word.name)}>{results.icon}</i>
        </div>
      </div>
    )
  }

}

