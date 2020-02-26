//Variables
var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickPattern = [];
var gameStarted = false;
var level = 0;

//Functions
function playSound(soundColor) {
  var audio = new Audio("./sounds/" + soundColor + ".mp3");
  audio.play();
}

function nextSequence() {
  //Set current level
  level += 1;
  $("h1").text("Level " + level);
  userClickPattern = [];

  //Random Color
  var randomNum = Math.floor(Math.random() * 4);
  var randomColor = buttonColors[randomNum];
  gamePattern.push(randomColor);
  $("." + randomColor).fadeOut(100).fadeIn(100);
  playSound(randomColor);
}

function animatePress(colorPressed) {
  $("." + colorPressed).addClass("pressed");
  setTimeout(() => {
    $("." + colorPressed).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickPattern[currentLevel]) {
    if (gamePattern.length === userClickPattern.length) {
      setTimeout(() => {
        nextSequence();
      }, 1000);
    }
  } else {
    if (level !== 0) {
      gameOver();
    }
  }
}

function gameOver() {
  $("body").addClass("game-over");
  setTimeout(() => {
    $("body").removeClass("game-over");
  }, 200);
  $("h1").text("Game over! You made it to level " + level +
    ". Press any key to restart.");
  var audio = new Audio("./sounds/wrong.mp3");
  audio.play();
  gameStarted = false;
  level = 0;
  gamePattern = [];
}

$(".btn").click(function() {
  userButton = this.id;
  userClickPattern.push(userButton);
  playSound(userButton);
  animatePress(userButton);
  checkAnswer(userClickPattern.length - 1);
})

$(document).keypress(function() {
  if (!gameStarted) {
    nextSequence();
    gameStarted = true;
  }
})
