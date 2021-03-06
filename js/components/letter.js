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

import React, {PropTypes} from 'react';
import RaisedButton from 'material-ui/lib/raised-button';
import {WAITING_FOR_INPUT} from '../constants/data';

let myStyle = {minWidth: '47px', margin: '5px 2px 5px 5px'};
const disabledColour = '#3A938C';
const Letter = (props) => <RaisedButton label={props.letter}
                                        disabled={!(props.status === WAITING_FOR_INPUT)}
                                        disabledBackgroundColor={disabledColour}
                                        backgroundColor={disabledColour}
                                        style={myStyle}
                                        onClick={() => props.onLetterClicked(props.letter)}
                                        labelStyle={{textTransform: 'lowercase',fontSize: '18px'}}/>;

Letter.propTypes = {
  letter: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  onLetterClicked: PropTypes.func.isRequired
};
export default Letter;
