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

export default class PlaySound extends Component {

  render() {
    return (
      <div>
        <audio src={this.props.sound.audio} preload="auto" ref="sound"/>
      </div>
    )
  }

  componentDidUpdate() {
    if (this.props.status === 'Playing') {
      this.refs.sound.play();
    }
  }

  componentDidMount() {
    this.refs.sound.addEventListener("ended", (e)=> {
      this.props.onFinishedPlaying(this.props.sound.task)
    });
    this.refs.sound.play();

  }

  componentWillUnmount() {
    this.refs.sound.removeEventListener("ended", (e)=> {
    }, false);
  }
}
