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
import FoundWord from './found-word';

const myStyle = {display: 'flex', flexDirection: 'column', flexWrap: 'nowrap', alignContent: 'space-around'};

const FoundWords = (props)=> <div className="found-words" style={myStyle}>
  {
    props.foundWords.map((word, index)=> {
      return <FoundWord key={'word'+index} word={word} id={index} status={props.status} onPlayWord={props.onPlayWord}/>;
    })
  }
</div>;

FoundWords.propTypes = {
  status: PropTypes.string.isRequired,
  onPlayWord: PropTypes.func.isRequired
};

export default FoundWords;
