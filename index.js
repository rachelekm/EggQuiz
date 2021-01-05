'use strict';

const sessionRecord = {
	userScore: 0,
	questionCountDisplay: 1,
	shuffleArray_Q: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
	shuffleArray_I: [0, 1, 2, 3],
	currentQuestionIndex: 0,
	currentRightAnswer: ''
}

const mv = {
	shuffleQuestionDisplay: function(){
		let randomValue = sessionRecord.shuffleArray_Q[Math.floor(Math.random() * sessionRecord.shuffleArray_Q.length)];
  		sessionRecord.shuffleArray_Q.splice(sessionRecord.shuffleArray_Q.indexOf(randomValue), 1);
  		sessionRecord.currentQuestionIndex = randomValue;
  		return model.questions[randomValue];
	},
	shuffleOptionsDisplay: function() {
		let randomValue = sessionRecord.shuffleArray_I[Math.floor(Math.random() * sessionRecord.shuffleArray_I.length)];
  		sessionRecord.shuffleArray_I.splice(sessionRecord.shuffleArray_I.indexOf(randomValue), 1);
  		return randomValue;
	},
	updateCounter: function(count1, count2){
		let questionCount = this.questionCounter(count1);
		let scoreCount = this.scoreCounter(count2);
		cv.displayScoreBoard(questionCount, scoreCount);
	},
	questionCounter: function(num){
		if(num === 1){
			sessionRecord.questionCountDisplay += 1;
		}
		return sessionRecord.questionCountDisplay;
	},
	scoreCounter: function(num){
		if(num === 1){
			sessionRecord.userScore += 1;
		}
		return sessionRecord.userScore;
	},
	compareAnswers: function(userAns){
		let rightAnswer = model.questions[sessionRecord.currentQuestionIndex].answerIndex;
		sessionRecord.currentRightAnswer = model.questions[sessionRecord.currentQuestionIndex].options[rightAnswer];
		return (rightAnswer === userAns) ? true : false;
	},
	initializeQuiz: function(){
		sessionRecord.userScore = 0;
		sessionRecord.questionCountDisplay = 1;
		sessionRecord.shuffleArray_Q = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
		sessionRecord.currentRightAnswer= '';
		this.updateCounter(0, 0);
		cv.updateNewLogoImage();
		cv.displayQuestion();
	}
}

const cv = {
	updateNewLogoImage: function(){
		let newImage = model.logoImages[sessionRecord.userScore];
		$('.logo').attr('src', newImage.src).attr('alt', newImage.alt);
	},
	displayQuestion: function(){
		let arrayObj = mv.shuffleQuestionDisplay();
		let inputs = this.inputHTML(arrayObj);
		$('.questions').prop('hidden', false).html(
			`<div class='questionOutput'>
			<h2 class='headerQuestion'>${arrayObj.question}</h2>
			<form class=newQuestionForm action='/' method='get'>
				<fieldset role='group'>${inputs}</fieldset>
				<button type='submit' class='submit'>Submit</button>
			</form>
			</div>`
			);
		window.scrollTo(0,document.body.scrollHeight);
	},
	inputHTML: function(o){
		let htmlArray = [];
		for(let i=0; i<4; i++){
			let ranIndex = mv.shuffleOptionsDisplay();
			console.log(ranIndex);
			htmlArray.push(`<label for='option'><input type='radio' name='option' value='index_${ranIndex}' required/>${o.options[ranIndex]}</label></br>`);
		}
		sessionRecord.shuffleArray_I = [0, 1, 2, 3];
		return htmlArray.join(' ');
	},
	displayScoreBoard: function(questionCount, scoreCount){
		$('header .scoreboard').remove();
		$('header').append(
			"<div class='scoreboard'><ul><li>Question: <span class='qCount'>"+questionCount+"</span>/10</li><li>Score: <span class='sCount'>"+scoreCount+"</span>/10</li></ul></div>"
			);
	},
	correctAnswerDisplay: function(){
		$('.answers').html(`<div class='answerResult'>You got it right! The answer is: <span class=bold>${sessionRecord.currentRightAnswer}</span></br><button type='button' class='continue'>Continue</button></div>`);
	},
	incorrectAnswerDisplay: function(){
		$('.answers').html(`<div class='answerResult'>Not quite, the correct answer is: <span class=bold>${sessionRecord.currentRightAnswer}</span></br><button type='button' class='continue'>Continue</button></div>`);
	},
	displayResults: function(i){
		$('html,body').scrollTop(0);
		$('.questions').prop('hidden', true).contents().hide();
		  if(mv.compareAnswers(i)){
			  cv.correctAnswerDisplay();
			  mv.updateCounter(0, 1);
			  cv.updateNewLogoImage();
		  }
		  else if (!mv.compareAnswers(i)){
			  cv.incorrectAnswerDisplay();
			  mv.updateCounter(0, 0);
		  }
	},
	lastQuestionPage: function(){
		$('.answers .continue').text("Check out your final score");
	},
	displayFinalPage: function(){
		$('.questions').contents().hide();
		$('.answers').contents().hide();
		$('.logo').addClass('logoFinalPage');
		$('.finalPage').prop('hidden', false).html("<div class='finalResultStyle'>"+this.finalResults()+"</br><button type='button' class='restart'>Restart</button></div>");
	},
	finalResults: function(){
		if(sessionRecord.userScore > 8){
			return "Well done, you know a whole lot about eggs! You answered "+sessionRecord.userScore+" out of 10 questions correctly!";
		}
		else if (sessionRecord.userScore >=5 && sessionRecord.userScore <=8){
			return "Not too shabby! You answered "+sessionRecord.userScore+" out of 10 questions correctly.";
		}
		else if(sessionRecord.userScore <5){
			return "Time to brush up on your egg facts! You answered "+sessionRecord.userScore+" out of 10 questions correctly.";
		}
	},
	pageEventListeners: function(){
		$('.start').on('click', (e) => {  
			$('.startPage').hide();
			$('.eggQuizName').hide();
			$('.logo').removeClass('logoFinalPage');
			$('header').addClass("header_style");
			mv.initializeQuiz();
		});
		$('.questions').submit((e) => {
			e.preventDefault();
			e.stopPropagation();
			let answer = $("[type='radio']:checked").val().split('_')[1];
			this.displayResults(Number(answer));
			$('.questions .submit').hide();
			if(sessionRecord.questionCountDisplay === model.questions.length){
				cv.lastQuestionPage();
			}
		});
		$('.answers').on('click', '.continue', (e) => {
			e.stopPropagation();
			if(sessionRecord.questionCountDisplay === model.questions.length){
				cv.displayFinalPage();
			}
			else {		
				$('.answers .answerResult').hide();
				mv.updateCounter(1, 0);
				cv.displayQuestion();
			}
		});
		$('.finalPage').on('click', '.restart', (e) => {
			e.stopPropagation();
			$('.finalPage').contents().remove();
			$('.logo').removeClass('logoFinalPage');
			mv.initializeQuiz();
		});
	}
}

$(cv.pageEventListeners());