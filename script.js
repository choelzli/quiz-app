let timeLeft = document.querySelector(".time-left");


let quizContainer = document.getElementById("container");
let nextBtn = document.getElementById("next-button");
let countOfQuestion = document.querySelector(".number-of-question");
let displayContainer = document.getElementById("display-container")
let scoreContainer = document.querySelector(".score-container");
let restart = document.getElementById("restart");
let userScore = document.getElementById("user-score");
let start = document.querySelector(".start");
let startBtn = document.getElementById("start-button");
let saveScoreBtn = document.getElementById("saveScoreBtn")
let username = document.getElementById("username")
const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
let questionCount;
let scoreCount = 0;
let count = 70;
let countdown;


const quizArray = [
    {
		id: "0",
        question: "Which of these countries is in Oceania?",
        options: [
            'Papua New Guinea',
            'French Guinea',
            'Equatorial Guinea',
            'Guinea-Bissau',
		],
        correct: 'Papua New Guinea'
    },
    {
		id: "1",
        question: "What building is the tallest in the western hemisphere?",
        options: [
            'Willis Tower (formerly Sears Tower)',
            'Burj Khalifa',
            'Freedom Tower',
            'Taipei 101',
		],
        correct: 'Freedom Tower'
    },
	{
		id: "2",
        question: "Which of the US cities is the least populated?",
        options: [
            'Philadelphia',
            'San Diego',
            'Houston',
            'Boston',
		],
        correct: 'Boston'
    },
	{
		id: "3",
        question: "Which of these countries is not an island?",
        options: [
            'Sri Lanka',
            'Seychelles',
            'Marrakesh',
            'Cyprus',
		],
        correct: 'Marrakesh'
    },
	{
		id: "4",
        question: 'Which of these is not one of the "Four Asian Tigers", economies that experienced high growth and rapid industrialization since the 1960s?',
        options: [
            'Singapore',
            'Hong Kong',
            'Taiwan',
            'Japan',
		],
        correct: 'Japan'
    },
	{
		id: "5",
        question: "Which of these is not a region in Italy?",
        options: [
            'Bologna',
            'Puglia',
            'Veneto',
            'Tuscany',
		],
        correct: 'Bologna'
    },
	{
		id: "6",
        question: "In what country is the tallest sculpture in the world located?",
        options: [
            'Brazil',
            'China',
            'Japan',
            'India',
		],
        correct: 'India'
    },
	{
		id: "7",
        question: "In what kingdom is the Faroe Islands located?",
        options: [
            'Iceland',
            'Greenland',
            'Denmark',
            'Estonia',
		],
        correct: 'Denmark'
    }
];


restart.addEventListener('click', () => {
	initial();
	displayContainer.classList.remove("hide");
	scoreContainer.classList.add('hide');
});

function endGame () {
	displayContainer.classList.add("hide");
	scoreContainer.classList.remove("hide");
	userScore.innerHTML = "Score: " + ((scoreCount /quizArray.length)*100) + "%";
};

nextBtn.addEventListener('click', (displayNext = () =>{
	questionCount += 1;
	if (count >= 0) {
	if(questionCount == quizArray.length){
		endGame();
	}
	else{
		countOfQuestion.innerHTML = questionCount + 1 + " of " + quizArray.length + " Questions";

		quizDisplay(questionCount);
		clearInterval(countdown);
		timerDisplay();
	} 
	}
	else {
		endGame();
	}

}));

function timerDisplay () {
	countdown = setInterval(() =>{
		count--;
		timeLeft.innerHTML = count + `s remaining`;
		if (count <= 0) {
			clearInterval(countdown);
			endGame();
		}
	}, 1000);
};

function generateQuiz() {
	quizArray.sort(() => Math.random() - 0.5);

	for(let i of quizArray){
		i.options.sort(()=> Math.random() - 0.5);
		let div = document.createElement("div");
		div.classList.add("container-mid", "hide");

		countOfQuestion.innerHTML = 1 + " of " + quizArray.length + " Questions";

		let question_DIV = document.createElement("p");
		question_DIV.classList.add("question");
		question_DIV.innerHTML = i.question;
		div.appendChild(question_DIV);

		div.innerHTML += `
		<button class="option-div" onclick="checker(this)">${i.options[0]}</button>
		<button class="option-div" onclick="checker(this)">${i.options[1]}</button>
		<button class="option-div" onclick="checker(this)">${i.options[2]}</button>
		<button class="option-div" onclick="checker(this)">${i.options[3]}</button>
		`;

		quizContainer.appendChild(div);
	}
}

const quizDisplay = (questionCount) => {
	let quizCards = document.querySelectorAll(".container-mid");

	quizCards.forEach((card) => {
		card.classList.add("hide");
	});
	quizCards[questionCount].classList.remove("hide");
};

function checker(userOption){
	let userSolution = userOption.innerText;
	let question = document.getElementsByClassName("container-mid")[questionCount];
	let options = question.querySelectorAll(".option-div");

	if(userSolution === quizArray[questionCount].correct){
		userOption.classList.add("correct");
		scoreCount++;
	} else {
		userOption.classList.add("incorrect");
		count -=5 ;
	}
	

}

function initial(){
	quizContainer.innerHTML = "";
	questionCount = 0;
	scoreCount = 0;
	count = 70;
	clearInterval(countdown);
	timerDisplay();
	generateQuiz();
	quizDisplay(questionCount);
}

startBtn.addEventListener("click",() => {
	start.classList.add("hide");
	displayContainer.classList.remove("hide");
	initial();
});

function saveHighScore(event) {
	console.log("clicked the save button!");
	event.preventDefault();
	const saveScore = {
		score: ((scoreCount/quizArray.length)*100),
		name: username.value
	};
	highScores.push(saveScore);
	localStorage.setItem("highScores", JSON.stringify(highScores));

}

window.onload = () => {
	start.classList.remove("hide");
	displayContainer.classList.add("hide");
};