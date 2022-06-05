// alert("hey");

//step 2
var buttonColours=["red","blue","green","yellow"];
var gamePattern=[];
var userClickedPattern=[];

var level=0;
var started=0;

function nextSequence(){
    userClickedPattern=[]; //empty the array for the next level
    var randomNumber=Math.floor(Math.random()*4);
    var randomChosenColor=buttonColours[randomNumber];
    gamePattern.push(randomChosenColor);
    $("#"+randomChosenColor).fadeOut(100).fadeIn(100); //for blinking the button
    playSound(randomChosenColor); //sound corresponding to the button chosen
    level++;
    $("#level-title").text("Level "+level);
}
// nextSequence();

$(".btn").click(function(){
    var userChosenColor = $(this).attr("id"); //fetch the id of the button clicked by the user
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length-1);
}); 

function playSound(name)
{
    var audio = new Audio('sounds/'+name+'.mp3');
    audio.play(); 
}

function animatePress(currentColor)
{
    $("#"+currentColor).addClass("pressed");

    setTimeout(function(){
        $("#"+currentColor).removeClass("pressed");
    },100);
}

$(document).keypress(function(event){
    if(!started)
    {
        $("#level-title").text("Level "+level);
        nextSequence();
        started=true;
    }
});

function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel]===gamePattern[currentLevel] )
    {
        if(userClickedPattern.length==gamePattern.length){
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    }
    else
    {
        var audio = new Audio('sounds/wrong.mp3');
        audio.play();
        $("body").addClass("game-over");
        $("h1").text("Game Over!! Press any key to Restart.")
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        startOver();
    }
}

function startOver(){
    level=0;
    gamePattern=[];
    started=false;
}