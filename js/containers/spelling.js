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
import Letters from '../components/letters'
import PlayingArea from '../components/playing-area'
import {connect} from 'react-redux'
import {startGameAction, finishedPlayingSoundAction, letterClickedAction, playWordAction} from '../actions/spelling'
import PlaySound from '../components/play-sound'


class Spelling extends Component {

  render() {
    const {dispatch, letters, game} = this.props;
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
            <PlayingArea game={game}
                         onStartGame={()=>dispatch(startGameAction())}
                         onPlayWord={(key) => dispatch(playWordAction(key))}/>
            <Letters key="letters" 
                     letters={letters} 
                     status={game.status} 
                     onLetterClicked={(value) => dispatch(letterClickedAction(value))}/>
            <PlaySound sound={game.sound} 
                       status={game.status} 
                       onFinishedPlaying={(value) => dispatch(finishedPlayingSoundAction(value))}/>
          </div>
        </div>
      </div>
    )
  }

}

function select(state) {
  return {
    letters: state.letters,
    game: state.game

  };
}

// Wrap the component to inject dispatch and state into it
export default connect(select)(Spelling)
