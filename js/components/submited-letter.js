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

export default class SubmittedLetter extends Component {

  render() {
    return (
      <div style={{color: '#0cc3ff', flexBasis:'auto',padding:'22px 35px', borderRadius:'10px', border:'1px dashed #0cc3ff', margin: '0 5px'}}>{this.props.letter}</div>
    )
  }
}

