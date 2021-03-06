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
import SubmittedLetter from './submitted-letter';

export default class SubmittedLetters extends Component {

  render() {
    let animating = this.props.status === 'Word Matched' ? 'animated bounce' : this.props.status === 'Word Not Matched' ? 'animated hinge' : '';
    return (
      <div style={{display:'flex',flexGrow:'5',flexDirection:'column', justifyContent:'center'}}>
        <div className="word-display" style={{display:'flex',  flexDirection:'row', justifyContent:'center', fontSize:'50px'}}>
          <div className={animating} style={{display:'flex',  flexDirection:'row', justifyContent:'center'}}>
            {
              this.props.foundLetters.map((letter, index) =>
                <SubmittedLetter key={'letter'+index} letter={letter} status={this.props.status}/>)
            }
          </div>
        </div>
      </div>
    );
  }

}
SubmittedLetters.propTypes = {
  status: PropTypes.string.isRequired,
  foundLetters: PropTypes.array.isRequired
};

