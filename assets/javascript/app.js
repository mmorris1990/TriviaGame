$(document).ready(function() {

// VARIABLES //

var questionCounter = 0;

var answerTimeout = 3000;

var increment;

var timeLeft = 10;

var corrent = 0;

var incorrect = 0;

var userAnswer = [];

var questions = [
    {
        question: "The National Hockey League only consists of teams within the USA:",
        choices: ["True" , "False"],
        choicesAnswer: 1
    },
    {
        question: "When a player scores three goals in a single game it is called a:",
        choices: ["Three's Company" , "Grand Slam" , "Hat Trick" , "Triple Crown"],
        choicesAnswer: 2
    },
    {
        question: "The NHL Championship trophy is named after:",
        choices: ["Sir Dudley" , "Earl Aurthur" , "Duke Ferdinand" , "Lord Stanley"],
        choicesAnswer: 3
    },
    {
        question: "How many periods of play are there in a regulation game?",
        choices: [1 , 2 , 3 , 4],
        choicesAnswer: 2
    }];

// FUNCTIONS //

// Timer functions
function runTimer() {
   var increment = setInterval(decrement, 1000);
};

function decrement() {
    timeLeft--;
    $("#time-left").text("Time remaining: " + timeLeft + " seconds");
    if (timeLeft == 0) {
        stopTimer();
        userAnswer.length = 0;
        var userChoice = $("#responses input:radio[name=optionsRadios]:checked").val();
        userAnswer.push(userChoice);
        console.log(userAnswer);
        nextQuestion();
    };
};

function resetTimer() {
    timeLeft = 10;
    $("#time-left").text("TIme remaining: " + timeLeft + " seconds");
};

function stopTimer() {
    clearInterval(increment);
};

function displayTimer () {
    $("#time-left").text("Answer Review");
};

// Display start page
function displayStart() {
    $("#content").append("<button class='btn btn-light btn-lg' id='start-button'>" + "Faceoff" + "</button>");
    // Button starts the game
    $("#start-button").on("click", function(start) {
        start.preventDefault();
        firstQuestion();
        resetTimer();
    });
};

// Display the first question page
function firstQuestion() {
    var start = $("#content");
    start.empty();
    displayQuestion();
};

// Display the current question page
function displayQuestion() {
    clearQuestion();
    resetTimer();    
    // display question
    $(".questionX").html(questions[questionCounter].question);
    // call quiz form function
    createRadios();
    // create submit button
    $("#submit-div").append("<button type='submit' class='btn btn-light' id='submit'>" + "Shoot" + '</button');
    runTimer();
    submitAnswer();
};

// Clear quiz to prep for next part of game
function clearQuestion() {
    var questionDiv = $(".questionX");
    questionDiv.empty();

    var responseDiv = $("#responses");
    responseDiv.empty();

    var submitDiv = $("#submit-div");
    submitDiv.empty();

    var contentDiv = $("#content");
    contentDiv.empty();

    stopTimer();
};

// Display quiz form
function createRadios() {
    var responseOptions = $("#responses");
    // empty array from previous question
    responseOptions.empty();
    // create multiple choice input
    for (var i = 0; i < questions[questionCounter].choices.length; i++) {
        responseOptions.append("<input type='radio' name='optionRadios' value='" +[i] +"'><div class='options'>" + questions[questionCounter].choices[i] + "</div></input>" );
    };
};

// Submit user answers
function submitAnswer() {
    $("#submit").on("click" , function(submit) {
        submit.preventDefault();
        userAnswer.length = 0;

        // record the answer
        var userSelection = $("#responses input:radio[name=optionRadios]:checked").val();
        userAnswer.push(userSelection);
        console.log(userAnswer);
        nextQuestion;
    });
};

// Starts game on page load
displayStart();
});