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
import RaisedButton from 'material-ui/lib/raised-button';
import {WAITING_FOR_INPUT} from '../constants/data';
import {Motion, spring} from 'react-motion';
import ReactDOM from 'react-dom';

// const disabledColour = '#3A938C';
class Letter extends Component {

  constructor(props) {
    super(props);
    this.state = {open: false, buttonPressed: false, left: 0, top: 0};
    this.onRest = this.onRest.bind(this);
  }

  componentDidMount() {
    const node = ReactDOM.findDOMNode(this.myRef);
    let {left, top} = node.getClientRects()[0];
    this.setState({left, top});
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (nextProps.status !== this.props.status ||
    nextProps.letter != this.props.letter ||
    nextState.open !== this.state.open ||
    nextState.buttonPressed !== this.state.buttonPressed);
  }


  onRest() {
    setTimeout(() => {
      if (this.state.buttonPressed) {
        this.setState({open: !this.state.open, buttonPressed: false});
      }
    }, 0);
  }

  render() {
    const xRatio = (102 / 47);
    const yRatio = (100 / 36);
    let x = 0, y = 0;
    if (this.props.letter.dest && this.state.buttonPressed) {
      console.log('letter:', this.props.letter, this.state);
      // console.log('dest: ', destIndex, this.props.letterLocations.destinations.length)
      let left = this.props.letter.dest.xPos;
      let top = this.props.letter.dest.yPos;
      x = (left - this.state.left) / xRatio + 12;
      y = (top - this.state.top) / yRatio + 12;
      // console.log('component will move itself: ', x, y, this.state.open)
    }
    // console.log('letter render: ', this.props, this.state);
    return (
      <Motion style={{
        x: spring(this.state.open ? x : 0, {stiffness: 40, damping: 8}),
        y: spring(this.state.open ? y : 0, {stiffness: 40, damping: 8}),
        r: spring(this.state.open ? 360 : 0, {stiffness: 50, damping: 10}),
        xPlane: spring(this.state.open ? xRatio : 1),
        yPlane: spring(this.state.open ? yRatio : 1)
      }} onRest={this.onRest}>
        {({x, y, r, xPlane, yPlane}) =>
          <RaisedButton label={this.props.letter.value} secondary={true}
                        disabled={!(this.props.status === WAITING_FOR_INPUT)}
                        style={{
                          transform: `scale(${xPlane}, ${yPlane}) translate3d(${x}px, ${y}px, 0) rotate(${r}deg)`,
                          minWidth: '47px',
                          margin: '5px 2px 5px 5px'
                        }}
                        onClick={() => this.buttonClicked()}
                        ref={(ref) => this.myRef = ref}
                        labelStyle={{textTransform: 'lowercase', fontSize: '18px'}}/>
        }
      </Motion>);
  }

  buttonClicked() {
    this.setState({open: !this.state.open, buttonPressed: !this.state.buttonPressed});
    // this.props.setDestinationLocation(this.props.letter.value);
    this.props.onLetterClicked(this.props.letter.value);

  }
}

Letter.propTypes = {
  letter: PropTypes.object.isRequired,
  status: PropTypes.string.isRequired,
  onLetterClicked: PropTypes.func.isRequired
};
export default Letter;
