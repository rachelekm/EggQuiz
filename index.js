'use strict';
//for the Images Logo
const logoImages = [{
  src: 'https://i.imgur.com/Lpy7oXE.png?2', 
  alt: 'logo for the egg quiz for score of 0'
}, {
  src: 'https://i.imgur.com/jJrEIvH.png?1', 
  alt: 'logo for the egg quiz for score of 1'
}, {  
  src: 'https://i.imgur.com/kitHWe3.png?1', 
  alt: 'logo for the egg quiz for score of 2'
}, {
  src: 'https://i.imgur.com/PHEKTx7.png', 
  alt: 'logo for the egg quiz for score of 3'
}, {
  src: 'https://i.imgur.com/PtbIKau.png', 
  alt: 'logo for the egg quiz for score of 4'
}, { 
  src: 'https://i.imgur.com/cQJ0ZxR.png', 
  alt: 'logo for the egg quiz for score of 5'
}, {
  src: 'https://i.imgur.com/vkSlTO7.png', 
  alt: 'logo for the egg quiz for score of 6'
}, {
  src: 'https://i.imgur.com/bQhm3Db.png', 
  alt: 'logo for the egg quiz for score of 7'
}, {
  src: 'https://i.imgur.com/V6rHwK3.png', 
  alt: 'logo for the egg quiz for score of 8'
}, {
  src: 'https://i.imgur.com/W9lDYfn.png', 
  alt: 'logo for the egg quiz for score of 9'
}, {
  src: 'https://i.imgur.com/t1btWEz.png',
  alt: 'logo for the egg quiz for score of 10'
}];

const QUESTIONS = [{
    question: 'How many eggs can a domesticated chicken produce each year?',
    options: ['300 eggs','200 eggs','500 eggs','750 eggs'],
    answer: '300 eggs'
}, {
    question: 'What is the name of a yolkless chicken egg? Once believed to hatch glittering-eyed basilisks...',
    options: ['Chicken breaks','Arthur stones', 'Troll eggs', 'Fairy eggs'],
    answer: 'Fairy eggs'
}, {
    question: 'Which bird species lays the largest eggs?',
    options: ['Ostrich', 'Emu', 'Guillemot', 'Goose'],
    answer: 'Ostrich'
}, {
    question: "How many 2-egg omelets did the world's fastest omelet maker, Howard Helmer, once make in thirty minutes:",
    options: ['113 omelets','355 omelets','427 omelets', '56 omelets'],
    answer: '427 omelets'
}, {
    question: 'Which of the below is a method for telling if your eggs have gone bad:',
    options: ['Set the egg on a flat surface, and observe if it begins to spin.', 'Drop your egg into a bowl full of water, and observe if it floats.', 'Check the eggshell for developing spots.', 'Throw your egg into the air and let it fall to the ground, look for cracks.'],
    answer: 'Drop your egg into a bowl full of water, and observe if it floats.'
}, {
    question: 'What is the translated name of a classic Hong Kong energy drink, made from cracking a raw egg into a glass of boiling water and serving with sugar:',
    options: ['Yolk Seeking Consciousness', "A Pebble's Journey", "Turtle's Running Shoes", 'Monk Leaping into the Ocean'],
    answer: 'Monk Leaping into the Ocean'
}, {
    question: 'When was the first egg carton invented?',
    options: ['1918', '1956', '1882', '1971'],
    answer: '1918'
}, {
    question: 'How long does it take to hard-boil an egg?',
    options: ['15 minutes', '5 minutes', '3 minutes', '8 minutes'],
    answer: '8 minutes'
}, {
    question: 'Which of the below is a dish created by poaching eggs in a peppery tomato sauce?',
    options: ['Huevos motuleños', 'Shakshuka', 'Arzak eggs', 'Shake Shack'],
    answer: 'Shakshuka'
}, {
    question: 'Which U.S. president loved eggnog, and frequently served a boozy recipe:',
    options: ['George Washington', 'Dwight D. Eisenhower', 'William Howard Taft', 'Andrew Jackson'],
    answer: 'George Washington'
}];

let userScore = 0;

let questionCountDisplay = 1;

let shuffleArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

let currentQuestionIndex = 0;

function updateNewLogoImage(){
	let newImage = logoImages[userScore];
	$('.logo').attr('src', newImage.src).attr('alt', newImage.alt);
}

function shuffleQuestionDisplay(){
  let randomValue = shuffleArray[Math.floor(Math.random() * shuffleArray.length)];
  shuffleArray.splice(shuffleArray.indexOf(randomValue), 1);
  currentQuestionIndex = randomValue;
  return randomValue;
}

function displayQuestion() {
	let i = shuffleQuestionDisplay();
	let arrayObj = QUESTIONS[i];
	$('.questions').prop('hidden', false).html(
		"<div class='questionOutput'><h2 class='headerQuestion'>"+arrayObj.question+"</h2><form class=newQuestionForm action='/' method='get'><fieldset role='group'><label for='option'><input type='radio' name='option' value='option1' aria-label='option one' required/>"+arrayObj.options[0]+"</label></br><label for='option'><input type='radio' name='option' value='option2' aria-label='option two'/>"+arrayObj.options[1]+"</label></br><label for='option'><input type='radio' name='option' value='option3' aria-label='option three'/>"+arrayObj.options[2]+"</label></br><label for='option'><input type='radio' name='option' value='option4' aria-label='option four'/>"+arrayObj.options[3]+"</label></fieldset></br><button type='submit' class='submit'>Submit</button></form></div>"
		);
	window.scrollTo(0,document.body.scrollHeight);
}

function updateCounter(count1, count2){
	let questionCount = questionCounter(count1);
	let scoreCount = scoreCounter(count2);
	displayScoreBoard(questionCount, scoreCount);
}

function questionCounter(num){
	if(num === 1){
		questionCountDisplay += 1;
	}
	return questionCountDisplay;
}

function scoreCounter(num){
	if(num === 1){
		userScore += 1;
	}
	return userScore;
}

function displayScoreBoard(questionCount, scoreCount) {
	$('header .scoreboard').remove();
	$('header').append(
		"<div class='scoreboard'><ul><li>Question: <span class='qCount'>"+questionCount+"</span>/10</li><li>Score: <span class='sCount'>"+scoreCount+"</span>/10</li></ul></div>"
		);
}

function initializeQuiz(){
	userScore = 0;
	questionCountDisplay = 1;
	updateCounter(0, 0);
	shuffleArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
	updateNewLogoImage();
	$('.logo').removeClass('logoFinalPage');
	displayQuestion();
}

function startQuizButtonListener(){
  $('.start').on('click', event => {  
  	$('.startPage').hide();
  	$('.eggQuizName').hide();
  	initializeQuiz();
  	$('header').addClass("header_style");
  });
}

function correctAnswerDisplay(answer){
	$('.answers').html("<div class='answerResult'>You got it right! The answer is: <span class=bold>" + answer + "</span></br><button type='button' class='continue'>Continue</button></div>");
}

function incorrectAnswerDisplay(answer){
	$('.answers').html("<div class='answerResult'>Not quite, the correct answer is: <span class=bold>"+answer+"</span></br><button type='button' class='continue'>Continue</button></div>");
}

function compareAnswers(rightAns, userAns){
	return (rightAns === userAns) ? true : false;
}

function displayResults(index, answer){
  $('html,body').scrollTop(0);
  $('.questions').prop('hidden', true).contents().hide();
	let rightAnswer = QUESTIONS[index].answer;
	if(compareAnswers(rightAnswer, answer)){
		correctAnswerDisplay(rightAnswer);
		updateCounter(0, 1);
		updateNewLogoImage();
	}
	else if (!compareAnswers(rightAnswer, answer)){
		incorrectAnswerDisplay(rightAnswer);
		updateCounter(0, 0);
	}
}

function formSubmitButtonListener(){
	$('.questions').submit(function(event){
		let index = currentQuestionIndex;
		event.preventDefault();
		let answer = $("[type='radio']:checked").next().text();
		displayResults(index, answer);
		$('.questions .submit').hide();
		if(questionCountDisplay === QUESTIONS.length){
			lastQuestionPage();
		}
	});
}

function continueButtonListener(){
	$('.answers').on('click', '.continue', event => {
		if(questionCountDisplay === QUESTIONS.length){
			displayFinalPage();
		}
		else {		
			$('.answers .answerResult').hide();
			updateCounter(1, 0);
			displayQuestion();
		}
	});
}

function lastQuestionPage(){
	$('.answers .continue').text("Check out your final score");
}

function displayFinalPage(){
	$('.questions').contents().hide();
	$('.answers').contents().hide();
	$('.logo').addClass('logoFinalPage');
	$('.finalPage').prop('hidden', false).html("<div class='finalResultStyle'>"+finalResults()+"</br><button type='button' class='restart'>Restart</button></div>");
}

function finalResults() {
	if(userScore > 8){
		return "Well done, you know a whole lot about eggs! You answered "+userScore+" out of 10 questions correctly!";
	}
	else if (userScore >=5 && userScore <=8){
		return "Not too shabby! You answered "+userScore+" out of 10 questions correctly.";
	}
	else if(userScore <5){
		return "Time to brush up on your egg facts! You answered "+userScore+" out of 10 questions correctly.";
	}
}

function restartQuizButtonListener(){
	$('.finalPage').on('click', '.restart', event => {
		$('.finalPage').contents().remove();
		initializeQuiz();
	});
}

function handleQuizApp(){
  startQuizButtonListener();
  formSubmitButtonListener();
  continueButtonListener();
  restartQuizButtonListener();
}

$(handleQuizApp);