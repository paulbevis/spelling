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
import RaisedButton from 'material-ui/RaisedButton';
import {WAITING_FOR_INPUT} from '../constants/data';
import {Motion, spring} from 'react-motion';

// const disabledColour = '#3A938C';
class Letter extends Component {

  constructor(props) {
    super(props);
    this.state = {open: false, buttonPressed: false};
    this.onRest = this.onRest.bind(this);
  }

  onRest() {
    setTimeout(() => {
      if (this.state.buttonPressed) {
        this.setState({open: !this.state.open, buttonPressed: false});
      }
    }, 0);
  }

  // componentWillUpdate(nextProps, nextState) {
  //   console.log('componentWillUpdate');
  // }

  render() {
    return (
      <Motion style={{
        x: spring(this.state.open ? 400 : 0, {stiffness: 40, damping: 8}),
        y: spring(this.state.open ? 360 : 0, {stiffness: 50, damping: 10}),
        z: spring(this.state.open ? 10 : 0)
      }} onRest={this.onRest}>
        {({x, y, z}) =>
          <RaisedButton label={this.props.letter}  primary={true}
                        disabled={!(this.props.status === WAITING_FOR_INPUT)}

                        style={{
                          transform: `perspective(30px) translate3d(${x}px, 0, ${z}px) rotate(${y}deg)`,
                          minWidth: '47px',
                          margin: '5px 2px 5px 5px'
                        }}
                        onClick={() => this.buttonClicked()}
                        ref={(ref) => this.myRef = ref}
                        labelStyle={{textTransform: 'lowercase',fontSize: '18px'}}/>
        }
      </Motion>);
  }


  buttonClicked() {
    this.setState({open: !this.state.open, buttonPressed: !this.state.buttonPressed});
    this.props.onLetterClicked(this.props.letter);
  }
}

Letter.propTypes = {
  letter: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  onLetterClicked: PropTypes.func.isRequired
};
export default Letter;
