//created by Hans Gundlach for CS4

//current is either "heads" or "tails".
//current gives the side of the coin displayed on coinflip screen startup
var current = "heads";

//homeNum is number of home buttons in app
var homeNum = 6;

//---------------------------------------Screen Transitions--------------------------------------

//onEvent goes to coin flip screen
onEvent("flip_button", "click", function(event) {
    setScreen("Flip");
});
//onEvent goes to Group Number Picking screen
onEvent("number_order", "click", function(event) {
    setScreen("Number");
});
//onEvent goes to random number screen
onEvent("dice_button", "click", function(event) {
    setScreen("Rand_screen");
});
//onEvent goes to straw picking screen
onEvent("pick_straws", "click", function(event) {
    setScreen("Straws");
});
//onEvent goes to advice screen
onEvent("advice_button", "click", function(event) {
    setScreen("Advice");
});
//onEvent goes back to straw screen
onEvent("back_button", "click", function(event) {
    setScreen("Straws");
});

//--------------------------Home Buttons --------------------------------------------------------

//generates events for each home button in app
for (i = 0; i < homeNum; i++) {
    onEvent("home" + i, "click", function(event) {
        setScreen("Home");

    });
}
//---------------------------Choose Number Screen------------------------------------------------
//onEvent takes integer from input box and displays random permutation of
//numbers from 1 to n
onEvent("make_number", "click", function(event) {
    //cardin is the cardinality or size of the consecutive number array being randomized
    var cardin = getNumber("text_input_num");
    //check user inputs an integer <20
    if (cardin > 20) {
        setText("gen_text", "number is too large");
    } else if (cardin) {
        //randomly generates array  and displays that array on screen
        var order = randper(cardin);
        setText("gen_text", order.toString());
    } else {
        setText("gen_text", "please enter a integer");
    }
});

//generate array of consecutive integers from 1 to size
//assumes size is a integer >0
function array_gen(size) {
    var ints = [];
    for (j = 1; j < size + 1; j++) {
        ints.push(j);
    }
    return ints;
}


//returns a random permutation of an array of length x
// assumes  x is integer  >0
function randper(x) {
    //implementation of knuth algorithmn
    //swaps elements in array x randomly
    var array = array_gen(x);
    for (j = 0; j < (x - 2); j++) {
        var num = randomNumber(0, (x - j) - 1);
        var swap = array[j];
        array[j] = array[num + j];
        array[num + j] = swap;
    }
    return array;
}


//------------------------------------Dice Screen--------------------------------------------------------
//onEvent generates random number between 1 and user input
// and displays the number on screen
onEvent("make_rand", "click", function(event) {
    playSound("https://studio.code.org/blockly/media/example.mp3");
    var input = getNumber("dice_input")
        //check if input is not null and is larger than 20
    if (input) {
        var randin = randomNumber(1, input);
        setText("dice_text", randin);
    } else {
        setText("dice_text", "please enter an integer")
    }
});

//--------------------------------------------Straw Screen----------------------------------------

//onEvent builds straws and their coresponding events
onEvent("straw_button", "click", function(event) {
  //straw_Length is the width of each staw in the pick staw screen
  var strawLength = 65;
  //width of staw generated on straw screen
  var strawWidth = 50;
  //height of staw generated on  straw screen
  var strawHeight = 300;
    numStraw = getText("straw_drop");

    //delete previously generated straws
    for (r = 0; r < numStraw; r++) {
        deleteElement("straw" + r);
    }

    //number of shortest straw ie 0th ,1rst ,2nd third staw on screen
    var shortStraw = randomNumber(0, numStraw - 1);

    //generates numStaw number of straws on screen
    for (i = 0; i < numStraw; i++) {
        button("straw" + i, "");
        //300 is the y position of the staws on screen
        setPosition("straw" + i, (i * strawLength), 300,strawWidth,strawHeight);
        setProperty("straw" + i, "background-color", "yellow");
        //setSize("straw" + i, strawWidth, strawHeight);
    }

    //makes events for each staw generated including the shorte straw
    //regular staws are delted when touched
    //touching the short staw leads to another screen
    for (k = 0; k < numStraw; k++) {
        onEvent("straw" + k, "click", function(event) {
            if (event.srcElementId === ("straw" + shortStraw)) {
                setScreen("Short_straw");
            } else {
                deleteElement(event.srcElementId);
            }
        });
    }
});
//----------------------------------------Coin Screen ---------------------------------------------------------

//timeText changes coin image to heads or tails  based on random number
function coinFlip() {
    //prev stores the coin flip result from the last coin flip and is either "heads" or "tails"
    var prev = current;
    hideElement("coin_flip");
    setText("previous", "previous coin flip side: " + prev);
    //randNum determines whether the coin is heads or tails
    var randNum = Math.random();
    //flips to tails
    if (randNum > .5) {
        setImageURL("coin_image", "tailsQuarter.png");
        current = "tails";
    }
    //flips to heads
    else {
        setImageURL("coin_image", "coinQuarter.png");
        current = "heads";
    }

    showElement("coin_flip");
    setText("wait_text", "");
}


//onEvent triggers gif,sound, waits 1.5 seconds and flips the coin image using coinFlip()
onEvent("coin_flip", "click", function(event) {
    setImageURL("coin_image", "coin_flip.gif");
    playSound("https://studio.code.org/blockly/media/example.mp3");
    //disable the coin flip button while coin is still flipping
   // hideElement("coin_flip");
    setTimeout(function() {
        coinFlip()
    }, 1500);
    setText("wait_text", "wait");
});
