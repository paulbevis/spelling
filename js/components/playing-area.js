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
import FoundWords from './found-words';
import SubmittedLetters from './submitted-letters';
import RaisedButton from 'material-ui/lib/raised-button';

export default class PlayArea extends Component {

  render() {
    return (
      <div style={{display:this.props.game.status === 'Game Finished'?'none':'flex',flexDirection:'column', height:'100%'}}>
        <div className='button-controls' style={{marginTop:'10px'}}>
          <RaisedButton label="Start" primary={true} onClick={this.props.onStartGame}/>
        </div>
        <div style={{display:'flex', flexGrow:'1'}}>

          <SubmittedLetters foundLetters={this.props.game.foundLetters} status={this.props.game.status}/>
          <FoundWords foundWords={this.props.game.foundWords} status={this.props.game.status} onPlayWord={this.props.onPlayWord}/>
        </div>
      </div>
    );
  }
}

PlayArea.propTypes = {
  game: PropTypes.object.isRequired,
  onPlayWord: PropTypes.func.isRequired,
  onStartSameGame: PropTypes.func.isRequired,
  onStartNewGame: PropTypes.func.isRequired
};
