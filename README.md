![simple javascript](https://img.shields.io/badge/javascript-simple-blue) ![simple javascript](https://img.shields.io/badge/material%20design-lite-ff69b4) ![noto](https://img.shields.io/badge/Noto-font-orange) ![hanzi-writer-data](https://img.shields.io/badge/Hanzi%20Writer-data-green)

# Unofficial-Chineseskill-Companion-Quiz
This unofficial quiz can be played in a browser. It completes nicely the Chineseskill app by working on:
* writing the Chinese characters
* and on the tones remembering 
  * (writing sentences in pin1yin1 with numbers has been erased from recent versions of Chineseskill app. Here you can go on practicing)
You can choose wich level you want to practice.

Unfortunately, I couldn't recreate the fantastic "voice recognition" part of the original Chineseskill app (which has also been cut from recent versions).


[Download the latest release](https://github.com/fxpar/Unofficial-Chineseskill-Companion-Quiz/releases)
(because I had to zip a part of this source code to comply to github file size limits)

## Supported browsers
* PC Chrome
* PC Firefox
* Android tablet Firefox BETA 
  * didn'work on my android Firefox 68.10.1, really needs "Firefox BETA"
  * takes 10 seconds to load the 900 questions and the 30mo file for characters stroke order

![Image of Yaktocat](https://github.com/fxpar/Unofficial-Chineseskill-Companion-Quiz/blob/master/screenshots/screen_20200726_134536.png)


## Help
The vocabulary contains words and sentences as:
* simplified Chinese, 
* pin1yin1 with number
* pinyin with accent pīnyīn
* english
* tag list

### Questions can be of the form:
* Cue: simplified; expected answer: english (hint:pin1yin1)
* Cue: english; expected answer: pin1yin1 (hint:simplified Chinese)
* Cue: simplified; expected answer: pin1yin1 (hint: english)
* Cue: english; expected answer: drawing simplified (hint: pin1yin1)
* Cue: pin1yin1; expected answer: drawing simplified (hint: english)

![Question Settings](/screenshots/questionSettings.png)

* **Learning mode**: shows the answer when asking the question
* **click after wrong**: when you make a mistake, you can choose to click to go to the next question, instead of having the 5 second timer
* [ ] **random**: does not actually work (sorry!)


![Hanzi Character Settings](/screenshots/hanziCharacterSettings.png)

* **show outline**: if you want to see the outline of the character in the quiz
* **character question**: decide if the writing question ask for
** only the first character
** all the characters (might be long in a sentence)
** last character
* **size**: you can increase the character writing

![Question list](/screenshots/questions.png)

* **number of quesions**: shows the total of questions corresponding to the "checked" tags
* **start**: sometimes a tag contains a lot of questions... if you want to start at a certain question
* **tags**: check the tags that you want to be interrogated

## Todo
* [ ] move question.js, quiz.js and hanzi-writer-short.js in res
* [ ] have a setting to decide timer after for getting to the next question
* [ ] have a timed answer
* [ ] make random question work
* [ ] correct the first three questions with a "v" instead of "ü"
* [ ] questions with sentence start with a capital (need to be more coherent)
* [ ] add setting to show / hide Hints
* [ ] add image for "add to home screen" shorcut
* [ ] upload release for "online" with all files on jsdelivr or cdn
* [ ] add online demo on my website (with all files distant)


## Sources
* https://ankiweb.net/shared/info/1418832623 ([Shared Deck Licence](https://ankiweb.net/account/terms))
* https://github.com/chanind/hanzi-writer-data ([licence Arphic](https://github.com/chanind/hanzi-writer-data/blob/master/ARPHICPL.TXT))
* https://getmdl.io/index.html ([licence Apache2.0](https://github.com/google/material-design-lite/blob/mdl-1.x/LICENSE))
* success gif: homemade with... PowerPoint

![success gif](/res/images/JquizAnimationSuccessMoyenStandard.gif)

