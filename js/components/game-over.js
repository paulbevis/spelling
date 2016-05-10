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
import RaisedButton from 'material-ui/lib/raised-button';

export default class GameOver extends Component {
  render() {
    const gameOverStyle = {
      display: 'flex',
      justifyContent: 'center',
      flexDirection: 'column',
      background: '#b1edff',
      zIndex: '1',
      opacity: '.95',
      borderRadius: '20px',
      padding: '20px'
    };

    return (
      <div style={{display:this.props.status === 'Game Finished' ? 'flex' : 'none',justifyContent: 'center', marginTop:'100px'}}>
        <div className="game-over" style={gameOverStyle}>
          <div style={{marginBottom:'20px', fontSize: '40px'}}>You got <span>{this.props.numberCorrect}</span> correct!</div>
          <div style={{display:'flex', justifyContent:'space-between'}}>
            <RaisedButton label="Start Again?" primary={true} onClick={this.props.onStartSameGame}/>
            <RaisedButton label="Move to harder words?" primary={true} onClick={this.props.onStartNextGame}/>
          </div>
        </div>
      </div>
    );
  }
}

GameOver.propTypes = {
  status: PropTypes.string.isRequired,
  onStartSameGame: PropTypes.func.isRequired,
  onStartNextGame: PropTypes.func.isRequired
};

