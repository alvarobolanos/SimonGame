// Game started flag
var started = false;

// Game level counter
level = 0;

// Array to hold the game's pattern
gamePattern = [];

// Array to hold the user's pattern
userClickedPattern = [];

// Array to hold the button colours
buttonColours = ["red", "blue", "green", "yellow"];

// Function to generate a number to drive the random colour selection and flashes the random selected colour
function nextSequence() {
	userClickedPattern=[];
	var randomNumber = Math.floor(Math.random() * 4);
	// Pulls a color from the buttonColours array based on a random number 
	var randomChosenColour =  buttonColours[randomNumber];
	// Pushes the randomChosenColour into the gamePattern array
	gamePattern.push(randomChosenColour);
	console.log("Game: " +gamePattern.toString());
	flash(randomChosenColour);
	playAudio(randomChosenColour);
	level++;
	$("#level-title").text("Level " + level);
}

// Flashes the given colour button
function flash(colour) {
	$('#' + colour).fadeIn(100).fadeOut(100).fadeIn(100);
}

// Plays the given argument sound
function playAudio(x) {
	var audio = new Audio('sounds/' + x + ".mp3");
	audio.play();
};

// Animates press of userChosenColour
function animatePress(colour) {
	$("#" + colour).addClass("pressed");

	setTimeout(function() {
		$("#" + colour).removeClass("pressed");
	}, 100);
}

// Collects id of clicked button and stores in userClickedPattern array
$('.btn').click(function() {
	var userChosenColour = $(this).attr('id');
	userClickedPattern.push(userChosenColour);
	flash(userChosenColour);
	playAudio(userChosenColour);
	animatePress(userChosenColour);
	console.log("User: " +userClickedPattern.toString());
	checkAnswer(level);
});

// Start the game
$(document).keypress(function() {
	if (!started) {
		$("#level-title").text("Level " + level);
		nextSequence();
		started = true;
	}
});

function startOver() {
	gamePattern = [];
	level = 0;
	started = false;
}

// Check the answer
function checkAnswer(currentLevel) {

	if (userClickedPattern.length == gamePattern.length) {
		for (var i=0; i<=currentLevel; i++) {
			if (userClickedPattern[i] != gamePattern[i]) {
				$("#level-title").text("Wrong");
				$('body').addClass('game-over');
				setTimeout(function() {
					$('body').removeClass('game-over')
				},200)
				playAudio('wrong');
				$('#level-title').text("Game Over, Press Any Key to Restart");
				startOver();
			} else {
				if (i == currentLevel) {
					userClickedPattern = [];
					setTimeout(function() {
						nextSequence()}
						, 1000);
				} 
			}
		}	
	}
};