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
import Letters from '../components/letters';
import PlayingArea from '../components/playing-area';
import {connect} from 'react-redux';
import * as actions from '../actions/spelling';
import PlaySound from '../components/play-sound';
import GameOver from '../components/game-over';

class Spelling extends Component {

  render() {
    const {
      letters, game, onFinishedPlaying, onLetterClicked, onPlayWord,
      onStartGame, onStartNextGame, onStartSameGame, onLetterElementCreated
    } = this.props;
    const myStyle = {display: 'flex', flexDirection: 'column', height: '100%'};
    const titleBarStyle = {
      background: '#333',
      height: '50px',
      fontSize: '30px',
      color: 'white',
      lineHeight: '44px',
      padding: '5px 5px 5px 15px'
    };

    return (
        <div>
          <div style={titleBarStyle}>Spelling Game</div>
          <div style={{display: 'flex', justifyContent: 'center'}}>
            <div style={myStyle} className="spelling">
              <GameOver status={this.props.game.status}
                        numberCorrect={this.props.game.numberCorrect}
                        totalWords={this.props.game.totalWords}
                        onStartSameGame={()=>onStartSameGame()}
                        onStartNextGame={()=>onStartNextGame()}/>
              <PlayingArea game={game}
                           onStartGame={()=>onStartGame()}
                           onPlayWord={(key) => onPlayWord(key)}
                           onLetterElementCreated={(letter, xPos, yPos) => onLetterElementCreated(letter, xPos, yPos)}/>
              <Letters key="letters"
                       letters={letters}
                       status={game.status}
                       onLetterClicked={(value)=> onLetterClicked(value)}/>
              <PlaySound sound={game.sound}
                         status={game.status}
                         onFinishedPlaying={() => onFinishedPlaying()}/>
            </div>
          </div>
        </div>

    );
  }
}

Spelling.propTypes = {
  game: PropTypes.shape({
    status: PropTypes.string.isRequired,
    sound: PropTypes.string.isRequired
  }).isRequired
};

const mapDispatchToProps = {
  onFinishedPlaying: actions.finishedPlayingSound,
  onLetterClicked: actions.letterClicked,
  onPlayWord: actions.playWord,
  onStartGame: actions.startGame,
  onStartSameGame: actions.startGame,
  onStartNextGame: actions.startNextGame,
  onLetterElementCreated: actions.letterElementCreated
};

const mapStateToProps = ({letters, game}) => {
  return {
    letters,
    game
  };
};

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps, mapDispatchToProps)(Spelling);
