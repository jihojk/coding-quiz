var questions = [
    {
        title: "Commonly used data types DO NOT include:",
        choices: ["Strings", "booleans", "alerts", "numbers"],
        answer: "alerts"

    },
    {
        title: "Inside which HTMML element do we put the JavaScript?",
        choices: ["<scripting>", "<js>", "<script>", "<javascript>"],
        answer: "<script>"
    },
    {
        title: "Where is the correct place to insert a JavaScript",
        choices: ["Only in the <head> section", "Only in the <body> section", "In both the <body> and <head>", "Neither places"],
        answer: "In both the <body> and <head>"
    },

    {
        title: "How do you start a FOR loops?",
        choices: ["for i= 1 to 5", "for (i<=5; i++)", "for(i=0; i<=5)", "for (i=0; i<=5; i++"],
        ansswer: "for (i=0; i<=5; i++"
    },
{
    title: "String values must be enclosed withing ___ when being assigned to variables.",
    choices: ["commas", "quotes", "curly brackets", "parenthesis"],
    answer: "quotes"
}
]

// Variable Declarations

var score = 0;
var questionsIndex = 0;
var currentTime = document.querySelector("#currentTime");
var timer = document.querySelector("#startTime");
var clock = document.querySelector("#clock");
var questionDiv = document.querySelector("#questionsDiv");
var wrapper = document.querySelector("#wrapper");

var secondsLeft = 76;
var holdInterval = 0;
var penalty = 10;
var ulCreate = document.createElement("ul");

timer.addEventListener("click", function(){
    if (holdInterval ===0){
        holdInterval= setInterval(function() {
            secondsLeft--;
            currentTime.textContent= secondsLeft;
            clock.textContent=secondsLeft;
            if (secondsLeft <= 0){
                clearInterval(holdInterval);
                allDone();
                currentTime.textContent = "Game Over!";
            }
        }, 1000);
    }
    render(questionsIndex);
});

// Render Quetsions

function render(questionsIndex) {
    questionsDiv.innerHTML = "";
    ulCreate.innerHTML = "";

    for (var i = 0; i < questions.length; i++) {
        var userQuestion = questions[questionsIndex].title;
        var userChoices = questions[questionsIndex].choices;
        questionsDiv.textContent = userQuestion;
    }
    userChoices.forEach(function (newItem) {
        var listItem = document.createElement("li");
        listItem.textContent = newItem;
        questionsDiv.appendChild(ulCreate);
        ulCreate.appendChild(listItem);
        listItem.addEventListener("click", (compare));
    })
}

function compare(event) {
    var element = event.target;
    if (element.matches("li")) {
        var createDiv = document.createElement("div");
        createDiv.setAttribute("id", "createDiv");
        if (element.textContent == questions[questionsIndex].answer) {
            score++;
            createDiv.textContent = "Correct! The answer was: " + questions[questionsIndex].answer;
        } else {
            secondsLeft = secondsLeft - penalty;
            createDiv.textContent = "Oops! The correct answer was: " + questions[questionsIndex].answer;
        }
    }

    questionsIndex++;
    if (questionsIndex >= questions.length) {
        allDone();
        createDiv.textContent = "Quiz is over. " + "" + "You got " + score + "/" + questions.length + " Correct!";
    } else {
        render(questionsIndex);
    }
    questionsDiv.appendChild(createDiv);

}

// allDone function that appends last page
function allDone(){
    questionsDiv.innerHTML="";
    currentTime.innerHTML="";

 //Header
var createH1 = document.createElement("h1");
createH1.setAttribute("id", "createH1");
createH1.textContent = "You are finsihed!"
questionsDiv.appendChild(createH1);
//P
var createP = document.createElement("p");
createP.setAttribute("id", "createP");
questionsDiv.appendChild(createP);

//Time and Score
if (secondsLeft >=0){
    var timeRemaining = secondsLeft;
    var createP2 = document.createElement("p");
    clearInterval(holdInterval);
    createP.textContent = "Your final score is: " + timeRemaining;
    questionsDiv.appendChild(createP2);
}
var createLabel = document.createElement("label");
createLabel.setAttribute("id", "createLabel");
createLabel.textContent="Enter your initials:  ";
questionsDiv.appendChild(createLabel);

//input form 
var createInput = document.createElement("input");
createInput.setAttribute("type", "text");
createInput.setAttribute("id", "initials");
createInput.textContent = "";
questionsDiv.appendChild(createInput);

//submit 
var createSubmit = document.createElement("button");
createSubmit.setAttribute("type", "submit");
createSubmit.setAttribute("id", "submit");
createSubmit.setAttribute("class", "btn btn-dark");
createSubmit.textContent="Submit";
questionsDiv.appendChild(createSubmit);

//Event to store initials and high score.
createSubmit.addEventListener("click", function(){
    var initials = createInput.value;
    if (initials === null){
        alert("Please enter your initials.");

    } else { 
        var finalScore = {
            initials: initials,
            score: timeRemaining
        }
        console.log(finalScore);
        
        var allScores = localStorage.getItem("allScores");
        if (allScores === null){
            allScores = [];
        } else {
            allScores = JSON.parse(allScores)
        }
        allScores.push(finalScore);
        var newScore = JSON.stringify(allScore);
        localStorage.setItem("allScores", "newScore");

    }

});

}