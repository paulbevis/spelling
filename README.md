# spelling
Spelling game aimed primarily at year one students.
 
The children will be asked to spell different words, and they will click on different letters to make the words, 
and the application will indicate whether they have been successful or not.  The game will end after 10 attempts to spell random words.

### Technology
This is a javascript app, created using react and redux. Using Flex as the layout framework of choice.

### Tests

To run Jest tests in Intellij, in debug mode, set the following configuration:
*   Node Parameters:        `--harmony`
*   Javascript file:        `node_modules/jest-cli/bin/jest.js`
*   Application Parameters: `--runInBand`

To run Mocha tests in Intellij
*   Extra Mocha Options:    `--compilers js:babel-core/register`

[Demo site:](http://catamaranprojects.com/spelling)


###To automatcially rebuild on code change:

> webpack --watch

###To build production version (minified)
webpack --config webpack.production.config.js

### Game State Flow
 
|User Interaction       |Action                     |Old Status         |New Status                     |
|---                    |---------                  |----------         |---                            |
|Press START            |GAME_START                 |                   |Intro                          |
|Intro Sound starts     |                           |                   |                               |
|Intro Sound finishes   |FINISHED_PLAYING_SOUND     |Intro              |Playing                        |
|Mic symbol clicked     |PLAY_WORD                  |Waiting to play a word audio|Playing               |
|Sound Starts           |                           |                   |                               |
|Sound finishes         |FINISHED_PLAYING_SOUND     |Playing            |Waiting For Input              |
|Word Matched                                                                                           |
|Letter submitted       |LETTER_CLICKED             |Waiting For Input  |Waiting For Input              |
|Letter submitted       |LETTER_CLICKED             |Waiting For Input  |Waiting For Input              |
|Letter submitted       |LETTER_CLICKED             |Waiting For Input  |Word Matched                   |
|Sound starts           |                           |                   |                               |
|Sound finishes         |FINISHED_PLAYING_SOUND     |Word Matched       |Waiting to play a word audio   |      
 
###License Apache

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
 
 

