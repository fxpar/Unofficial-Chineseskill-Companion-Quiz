
// PROGRESSIVE WEB APP: Register service worker.
/*
if ('serviceWorker' in navigator) {
window.addEventListener('load', () => {
navigator.serviceWorker.register('/res/service-worker.js')
.then((reg) => {
console.log('Service worker registered.', reg);
});
});
}
 */

class Quiz {
    lines = [];
    levels = new Set();
    progress = 0;
    answers;
    qid;
    status;
    scores = new Array();
    tags = {};
    questionSet = new Set();
    questionsList = [];
    checked;
	numQuestion;
	numHint;
	numAnswer;
	num;
	success;
	myAudio;

    constructor() {
        this.checkingInput = false;
        this.loadQuestionsAndTags(questions); // load questions and load tags
        this.answers = this.lines.slice();
        this.createTagsMenu();
        this.checkTag(); // if no tag is checked, it checks the first one
        this.createCheckedTagsQuestionsList(); // only take into account questions related to checked tags
        console.log(this.questionsList);
		this.num=0;
        this.ask(this.num);
    }
	
	restart(){
		document.getElementById("question").innerHTML ="";
		this.num = document.getElementById('questionSlider').value;
		//this.progress = 0;
		this.num=0;
		this.createCheckedTagsQuestionsList();
		console.log("restart ask("+this.num+")");
		this.ask(this.num);
	}

    ask(num) {
		var rand =  Math.floor(Math.random() * 4 ) + 1; 
		
		console.log("rand:"+rand);
		
		switch(rand){
			case 1:
				this.numQuestion = 2; // chinese
				this.numHint = 5; // english
				this.numAnswer = 3; // pin1yin1
				break;
			
			case 2:
				this.numQuestion = 5; // english
				this.numHint = 2; // chinese
				this.numAnswer = 3; // pin1yin1
				break;
				
			case 3:
				this.numQuestion = 5;
				this.numHint = 3;
				this.numAnswer = 2;
				break;
				
			case 4:
				this.numQuestion = 2;
				this.numHint = 3;
				this.numAnswer = 5;
				break;
		}
		console.log("numQuestion:"+this.numQuestion+" numAnswer:"+this.numAnswer+" numHint:"+this.numHint);
		console.log("ask(num):"+num);
		console.log(this.questionsList.length);
		// if this is the end, display success animated gif
        if (num == this.questionsList.length) {
			this.showSuccess();
        } else if (num == this.questionsList.length+1) {
			
			this.qid=0;
			this.restart();
		}else{
			
            document.querySelector('#progressbar1').MaterialProgress.setProgress(this.progress);

            this.qid = this.questionsList[num];
            console.log("qid questionsList " + num + "=>" + this.questionsList[num]);
            document.getElementById("correct").textContent = '';
            document.getElementById("correct").style.display = 'none';
            document.getElementById("uncorrect").textContent = '';
            document.getElementById("uncorrect").style.display = 'none';
            document.getElementById("username").textContent = 'anonymous';
            document.getElementById("question").innerHTML = this.answers[this.qid][this.numQuestion];
            document.getElementById("hint").textContent = this.answers[this.qid][this.numHint];
            document.getElementById("qlevel").textContent = this.answers[this.qid][1];
            document.getElementById("answerLabel").textContent = this.answers[0][this.numAnswer];
            document.getElementById("uanswer").value = "";
			//audio part
			this.setAudio();
            if (document.getElementById('learning-mode').checked) {
                document.getElementById("correct").textContent = this.answers[this.qid][this.numAnswer];
                document.getElementById("correct").style.display = 'block';
            }
			console.log("characterQuestion selected index:"+document.getElementById('characterQuestion').selectedIndex);
			//HanziWriter
			if(this.numAnswer==2){
				this.characterWriter();
			}else{
				// hide character box
				document.getElementById('character-target-div').style.display = "none";
			}
			
			
            this.checked = false;
        }
    }


	setAudio(){
		if (this.answers[this.qid][8]){
			var audioSource = this.answers[this.qid][8];
			this.myAudio = document.getElementById("audio");
			// document.getElementById("audioSource").setAttribute("src", "./res/sound/"+audioSource);
			this.myAudio.setAttribute("src", "./res/sound/csk/"+audioSource);
			this.myAudio.load();
			this.myAudio.play();
		}
		
	}
	showSuccess(){
		console.log("**** attention");
			document.getElementById("correct").textContent = '';
            document.getElementById("correct").style.display = 'none';
            document.getElementById("uncorrect").textContent = '';
            document.getElementById("uncorrect").style.display = 'none';
			document.getElementById("question").innerHTML = "";
            document.getElementById("hint").textContent = "";
            document.getElementById("qlevel").textContent = "";
            document.getElementById("answerLabel").textContent = "";
            document.getElementById("uanswer").value = "";
			document.getElementById('character-target-div').style.display = "none";
			this.success = true;
            document.getElementById("question").innerHTML = "<img width='100%' height='100%'  src='./res/images/JquizAnimationSuccessMoyenStandard.gif'/>";
			this.qid++;
	}

	characterWriter(){
		document.getElementById('character-target-div').textContent = "";
		var cs = document.getElementById('characterSize'); // cs character size
		var csSize = cs.options[cs.selectedIndex].value;
		
				document.getElementById('character-target-div').style.display = "block";
				
				switch(document.getElementById('characterQuestion').selectedIndex){
					case 0:
						//first char
						var myAnswerFirst = this.answers[this.qid][this.numAnswer].charAt(0);
						break;
					case 1:
						//all characters
						var myAnswerFirst = this.answers[this.qid][this.numAnswer];
						break;
					case 2:
						//last char
						var myAnswerFirst = this.answers[this.qid][this.numAnswer].slice(-1);
						break;
					case 3:
						// random char
						var myAnswerFirst = this.answers[this.qid][this.numAnswer].charAt(0);
						break;
				}
				//var myAnswerFirst = this.answers[this.qid][this.numAnswer].charAt(0);
			//alert(myAnswerFirst);
			var writer=[];
			for (var i=0; i<myAnswerFirst.length; i++){
				 writer[i] = HanziWriter.create('character-target-div', myAnswerFirst.charAt(i), {
					 charDataLoader: function(char) {
						return strokesjson[myAnswerFirst.charAt(i)];
					}, 
					onComplete: function(summaryData) {
						console.log('Complete!');
						document.getElementById("uanswer").value = document.getElementById("uanswer").value+summaryData.character;
						quiz.status = "correct";
						quiz.checked = true;
						//this.checkInput;
					},
				  width: csSize,
				  height: csSize,
				  showCharacter: false,
				  showOutline: document.getElementById("showOutline").checked,
				  showHintAfterMisses: 1,
				  highlightOnComplete: true,
				  padding: 5,
				  radicalColor: '#168F16'
				});
			writer[i].quiz();
			}
	}

    checkInput() {
        //alert(checked);
		if (this.success == true) {
			this.success = false;
			this.restart();
		}else{
			if (this.checked == false) {
				var userAnswer = document.getElementById("uanswer").value;

				var quizAnswer = this.answers[this.qid][this.numAnswer];
				if (userAnswer == quizAnswer) {
					//alert ("perfect!\n" + quizAnswer + " = " + userAnswer);
					document.getElementById("correct").textContent = this.answers[this.qid][this.numAnswer];
					document.getElementById("correct").style.display = 'block';
					this.scores[this.qid] = this.scores[this.qid] + 1;
					this.status = "correct";
				} else {
					//alert ("sorry!\n" + quizAnswer + " < > " + userAnswer);
					document.getElementById("uncorrect").textContent = this.answers[this.qid][this.numAnswer];
					document.getElementById("uncorrect").style.display = 'block';
					//document.getElementById("success").setAttribute("value", "0");
					this.scores[this.qid] = this.scores[this.qid] - 1;
					this.status = "uncorrect";
				}
				this.checked = true;
				this.qid++;
				this.num++;
				this.progress = this.progress + 1;
				//document.querySelector('#progressbar1').MaterialProgress.setProgress(progress+5);
			}
			if (this.status == "correct") {
				setTimeout(function () {
					//console.log("progress correct"+quiz.progress);
					quiz.ask(quiz.num);
				}, 2000);
			} else {
				if (document.getElementById('clickAfterWrong').checked == true){
					this.status="correct";
					this.checked=true;
				}else{
					setTimeout(function () {
						//console.log("progress uncorrect"+quiz.progress);
						quiz.ask(quiz.num);
					}, 5000); 
				}
			}
		}
        return true;

    }

    //loadQuestions is a private method, hence the #
    loadQuestionsAndTags(csv) {
        var allTextLines = csv.split(/\r\n|\n/);

        for (var i = 0; i < allTextLines.length; i++) {
            var data = allTextLines[i].split(';');
            //console.log(data[7]);

            var tarr = [];
            for (var j = 0; j < data.length; j++) {
                tarr.push(data[j]);
            }
            //add the csv parts to lines
            this.lines.push(tarr);

            //process tags
            //use the tags[] array declared at the beginning
            //cut at ',' and clean spaces with "trim()"
            if (i > 1) {
                if (data[7]) {
                    this.loadTags(data[7], i)
                }
            }
        }
    }

    loadTags(tagsStr, i) {
        var tagsString = tagsStr.split(',').map(function (item) {
            return item.trim();
        });

        //if there are tags we add the question number to the tag array
        for (var k = 0; k < tagsString.length; k++) {
            //console.log(tagsString[k]);
            if (tagsString[k]) {
                if (this.tags[tagsString[k]]) {
                    this.tags[tagsString[k]];
                } else {
                    this.tags[tagsString[k]] = [];
                }
                this.tags[tagsString[k]].push(i);
            }
        }
    }

    /** For each checked tag, add the number of the questions to the questionSet
     ** Then create the questionsList array from the questionSet
     **/
    createCheckedTagsQuestionsList() {
		this.questionSet.clear();
        //console.log("tags size:"+Object.keys(this.tags).length);
        for (var i = 0; i < Object.keys(this.tags).length; i++) {
            //console.log(Object.keys(this.tags)[i]+":"+this.tags[Object.keys(this.tags)[i]].length);
            if (document.getElementById("tag" + Object.keys(this.tags)[i]).checked == true) {
                for (var j = 0; j < this.tags[Object.keys(this.tags)[i]].length; j++) {
                    //console.log(this.tags[Object.keys(this.tags)[i]][j]);
                    this.questionSet.add(this.tags[Object.keys(this.tags)[i]][j]);
                }
            }
        }
        console.log(this.questionSet);
        this.questionsList = Array.from(this.questionSet);
		
		//deal with slider value
		var slider = document.getElementById('questionSlider');
		slider.setAttribute("max",this.questionsList.length);
		slider.MaterialSlider.change(0);
		
		document.getElementById('questionsListLength').textContent = this.questionsList.length+" questions";
    }

    /**
     * Create tags menu
     * @todo correct the number of questions for each tag
     */
    createTagsMenu() {

        var tagsList = "";
        let tagsArr = Array.from(this.tags);
        console.log(this.tags);
        //console.log(Object.keys(this.tags).length);
        for (var i = 0; i < Object.keys(this.tags).length; i++) {
            //console.log(Object.keys(this.tags)[i]);
            this.tag = String(Object.keys(this.tags)[i]);
            var tagId = "tag" + this.tag.replace(/\s+/g, "");
            //control if something is already checked
            //used later to check at least one tag

            var tagChecked = localStorage.getItem(tagId);

            //console.log("get " + tagId + " as " + tagChecked);

            tagsList = tagsList + `<li class="mdl-list__item">
			<span class="mdl-list__item-primary-content">
			<i class="material-icons  mdl-list__item-icon">bookmark_border</i>
			${Object.keys(this.tags)[i]} (${this.tags[Object.keys(this.tags)[i]].length})
			</span>
			<span class="mdl-list__item-secondary-action">
			<label class="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" for="${tagId}">
			<input id="${tagId}"  onclick="storeValues(this.id, this.checked);quiz.createCheckedTagsQuestionsList();" type="checkbox" ${tagChecked} id="${tagId}" class="mdl-checkbox__input"  />
			</label>
			</span>
			</li>
			`;
        }

        var ul = document.getElementById("tag-list");
        ul.innerHTML = tagsList;
    }

    checkTag() {
        if (!document.querySelector("#tag-list input[type='checkbox']:checked"))
            var inputs = document.querySelector("#tag-list input[type='checkbox']").checked = true;

    }

	sliderChange(val){
		document.getElementById('questionSliderChip').setAttribute('data-badge', val);
	}
	
	

}

class User {}

function storeValues(id, value) {
    var val;
    if (value) {
        val = "checked";
    } else {
        val = "";
    }
    //console.log('Value for '+ id +' prepared to ' + val);
    window.localStorage.setItem(id, val);
    console.log('Value for ' + id + ' is set to ' + val);
    //reload page
    //document.location.reload() //-> boucle infinie!!!
}

function runScript(e) {
    //See notes about 'which' and 'key'
    //catches the "enter" typed on keyboard instead of button type
    if (e.keyCode == 13) {
        quiz.checkInput();
        //checked = true;
        return true;
    }
}

function changeCharacterSize(val){
	quiz.characterWriter();
/* 		document.querySelectorAll("svg").forEach(function(item) { 
		item.setAttribute("width", val);
		item.setAttribute("height", val);
	});
 */}
//var questions est chargé par un script dans le header
//var strokesjson est chargé par un js script dans le header
