//jshint esversion:6
// Initialisation of values.
const buttonColors = ['red', 'blue', 'green', 'yellow'];
let gamePattern = [];
let userClickPattern = [];
let level = 0;
let started = false;

// To start the game on keypress.
$(document).on("keypress", function () {
    if (!started){
        $('#level-title').text("Level " + level);
        nextSequence();
        started = true;

    }
});

// For Actions on each mouse click on a colot
$(".btn").click(function () {
    // Get the color and add to to an array to store the pattern of the user
    const userChosenColor = this.id;
     userClickPattern.push(userChosenColor);

    // For sounds and animation on click
    playSound(userChosenColor);
    animatePress(userChosenColor);

    // To check if pattern is right
    checkAnswer(userClickPattern.length-1);

})

//Function to get the next sequence or level.
function nextSequence(){
    userClickPattern = [];

    // Increase level
    level++;
    $('#level-title').text("Level " + level);

    // To select the next color for the oattern randomly and store it in the gamePattern Array,
    let randomNumber = Math.floor((Math.random() * 3));
    let randomChosenColor =  buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    $(`#${randomChosenColor}`).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);

}

// Function to play sounds
function playSound(name){
    var audio = new Audio(`sounds/${name}.mp3`);
    audio.play();
}

//Function to animate mouse clicks.
function animatePress(chosenColor){
    button = $(`#${chosenColor}`)
    button.addClass("pressed");
    setTimeout(function(){
        button.removeClass("pressed");
    }, 100);
}

//Function to check answer
function checkAnswer(currentLevel){
    // If level completed successfully
    if (gamePattern[currentLevel] === userClickPattern[currentLevel]){
        if (userClickPattern.length === gamePattern.length){
            // For 1000 ms delay between levels.
            setTimeout(function () {
              nextSequence();
            }, 1000);
        }
    }
    // For failure to complete level.
    else {
        playSound("wrong");
        $("body").addClass("game-over")
        setTimeout(function () {
            $("body").removeClass("game-over")
          }, 200);
        $("#level-title").text("Game Over. Press any key to restart")
        startover();
    }
}

// Function to reset the game!
function startover() {
    gamePattern = [];
    started = false
    level = 0
 }
