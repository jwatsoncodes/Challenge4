var questions = [
    {
        prompt: "What does CSS stand for?",
        options: ["Cascading Style Sheets", "Cascading subtle Showers", "Character station seller", "Current style sheet"],
        answer: "Cascading Style Sheets"
    },

    {
        prompt: "What is CSS used for?",
        options: ["Coding function", "styling your page", "animating your page", "writing you jokes"],
        answer: "styling your page"
    },

    {
        prompt: "what do you need to link your CSS to your HMTL?",
        options: ["name of your file?", "You don't need to link it in any way", "use ./ to find it in your assets", "you can click through a provided list of options"],
        answer: "use ./ to find it in your assets"
    },

    {
        prompt: "What is most closely related to what Justify content space between means",
        options: ["equal room on all sides between objects", "centers all objects", "shifts all to left", "shifts all to right"],
        answer: "Equal room on all sides between objects" 
    },

    {
        prompt: "How many letters is CSS",
        options: ["1", "2", "3", "4"],
        answer: "3"
    }];

// DOM

var questionsEl = document.querySelector("#questions");
var nameEl = document.querySelector("#name");
var choicesEl = document.querySelector("#options");
var timerEl = document.querySelector("#timer");
var submitBtn = document.querySelector("#submit-score");
var reStartBtn = document.querySelector("#restart");
var startBtn = document.querySelector("#start");
var feedbackEl = document.querySelector("#feedback");




var currentQuestionIndex = 0;
var time = questions.length * 15;
var timerId;

// Hide Front page, begin

function quizStart() {
    timerId = setInterval(clockTick, 1000);
    timerEl.textContent = time;
    var landingScreenEl = document.getElementById("start-screen");
    landingScreenEl.setAttribute("class", "hide");
    questionsEl.removeAttribute("class");
    getQuestion();
}

// question loop 

function getQuestion() {
    var currentQuestion = questions[currentQuestionIndex];
  var promptEl = document.getElementById("question-words")
    promptEl.textContent = currentQuestion.prompt;
    choicesEl.innerHTML = "";
    currentQuestion.options.forEach(function(choice, i) {
        var choiceBtn = document.createElement("button");
        choiceBtn.setAttribute("value", choice);
        choiceBtn.textContent = i + 1 + ". " + choice;
        choiceBtn.onclick = questionClick;
        choicesEl.appendChild(choiceBtn);
    });
}

// Check for right answers and deduct time for wrong answer, go to next question

function questionClick() {
    if (this.value !== questions[currentQuestionIndex].answer) {
      time -= 10;
      if (time < 0) {
        time = 0;
      }
      timerEl.textContent = time;
      feedbackEl.textContent = `Incorrect, The correct answer was ${questions[currentQuestionIndex].answer}.`;
      feedbackEl.style.color = "red";
    } else {
      feedbackEl.textContent = "Correct!";
      feedbackEl.style.color = "green";
    }
    feedbackEl.setAttribute("class", "feedback");
    setTimeout(function() {
      feedbackEl.setAttribute("class", "feedback hide");
    }, 2000);
    currentQuestionIndex++;
    if (currentQuestionIndex === questions.length) {
      quizEnd();
    } else {
      getQuestion();
    }
}

// End quiz by hiding questions, stop timer and show final score

function quizEnd() {
    clearInterval(timerId);
    var endScreenEl = document.getElementById("quiz-end");
    endScreenEl.removeAttribute("class");
    var finalScoreEl = document.getElementById("score-final");
    finalScoreEl.textContent = time;
    questionsEl.setAttribute("class", "hide");
}

// End quiz if timer 0

function clockTick() {
    time--;
    timerEl.textContent = time;
    if (time <= 0) {
      quizEnd();
    }
}

// save with users name

function saveHighscore() {
    var name = nameEl.value.trim();
    if (name !== "") {
      var highscores =
        JSON.parse(window.localStorage.getItem("highscores")) || [];
      var newScore = {
        score: time,
        name: name
      };
      highscores.push(newScore);
      window.localStorage.setItem("highscores", JSON.stringify(highscores));
    }
}



function checkForEnter(event) {
    if (event.key === "Enter") {
        saveHighscore();
    }
}
nameEl.onkeyup = checkForEnter;



submitBtn.onclick = saveHighscore;



startBtn.onclick = quizStart;
