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
import Letter from './letter';

export default class Letters extends Component {

  lettersInRange(start) {
    return this.props.letters.src.slice(start, start + 13).map((letter, index)=>
      <Letter key={index}
              letter={letter}
              status={this.props.status}
              onLetterClicked={this.props.onLetterClicked}
              setDestinationLocation={this.props.setDestinationLocation}/>);
  }

  render() {
    const myStyle = {display: 'flex', flexDirection: 'row', flexWrap: 'wrap', alignContent: 'space-around'};

    return (
      <div style={{minHeight:'100px',display:this.props.status === 'Game Finished'?'none':'flex', alignItems:'flex-end'}}>
        <div style={{marginBottom:'10px'}}>

          <div style={myStyle} className="top-letter-row">
            {this.lettersInRange(0)}
          </div>

          <div style={myStyle} className="bottom-letter-row">
            {this.lettersInRange(13)}
          </div>
        </div>
      </div>
    );
  }
}

Letters.propTypes = {
  status: PropTypes.string.isRequired,
  onLetterClicked: PropTypes.func.isRequired
};
