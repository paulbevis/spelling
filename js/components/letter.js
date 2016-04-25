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
import RaisedButton from 'material-ui/lib/raised-button';

export default class Letter extends Component {

  render() {
    let myStyle = {minWidth: '45px', margin: '5px 2px 5px 5px'};
    return (
      <RaisedButton label={this.props.name}
                    disabled={!(this.props.status === 'Waiting For Input')}
                    disabledBackgroundColor="#3A938C"
                    backgroundColor="#3A938C"
                    style={myStyle}
                    onClick={(e) => this.props.onLetterClicked(this.props.name)}
                    labelStyle={{textTransform: 'lowercase'}}/>
    )
  }
}
