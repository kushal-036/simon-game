
var userClickedPattern=[];
var gamePattern =[];
var level=0;
var startGame = 0;

var buttonColours = ["red", "blue", "green", "yellow"];

$(document).keypress(function(){
    startGame=startGame+1;
    if(startGame === 1){
        nextSequence();
    }
});

function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){
        if(currentLevel === gamePattern.length - 1){
            setTimeout(function (){
                nextSequence();
            },1000);
        }
    }
    else{
        playSound("sounds/wrong.mp3");
        $("body").addClass("game-over");
        setTimeout(function (){
            $("body").removeClass("game-over");
        },200);
        $("h1").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}

function nextSequence(){
    userClickedPattern = [];
    level++;
    $("h1").text("Level " + level);
    var randomNumber=Math.random();
    randomNumber=randomNumber*4;
    randomNumber=Math.floor(randomNumber);

    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#"+randomChosenColour).fadeOut(100).fadeIn(100);

    var name = "sounds/"+randomChosenColour+".mp3";
    playSound(name);

}


$(".btn").click(function () {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    var name = "sounds/"+userChosenColour+".mp3";
    playSound(name);
    animatePress(userChosenColour);
    var lastIndex= userClickedPattern.length - 1;
    checkAnswer(lastIndex);
});

function playSound(name){
    var audio = new Audio(name);
    audio.play();
}

function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");
    setTimeout(function  (){
        $("#"+currentColour).removeClass("pressed");
    },100)
}

function startOver(){
    gamePattern=[];
    startGame=0;
    level=0;
}
