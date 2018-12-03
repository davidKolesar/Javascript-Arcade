var rolls = [ ];                                                                //declares a variable (array) to store the amount of dice rolls
var cashAmount = document.getElementById("cashAmount");                         //declares variable "cashAmount" and refers to ElementId "cashAmount" to get value.


function reset () {                                                             //function is activated onclick "playAgain" to reset all the numbers to 0
scores.splice(0,scores.length);                                                 //resets all the values within the scores array
rolls.splice(0,rolls.length);                                                   //resets all the values in the rolls array
var rollTotal = 0;                                                              //assigns global variable rollTotal to 0
document.getElementById("rollOutput").innerHTML = rollTotal;                    //uses DOM property to reset value of document element rollOutput
execute ();                                                                     //activate execute
}

function init() {                                                           //function is called onclick "play" or after function reset

//Draw fields
//Plant mines
//Calculate distances
document.getElementById("results").style.visibility = "visible";                //makes results table visible
document.getElementById("play").style.visibility = "hidden";                    //hides play button
document.getElementById("playAgain").style.visibility = "visible";              //makes play again button visible
checkBet ();                                                                    //calls checkbet function
}
function checkBet () {                                                              
    document.getElementById("sBet").innerHTML = cashAmount.value;               //object id "sBet" prints the value of cashAmount
    scores.push (document.getElementById("high").innerHTML = cashAmount.value); //pushes current score to array "scores"
    (document.getElementById("rollOnWin").innerHTML = rolls.length +1);         //object id "rollOnWin" prints value of rolls.length +1 (since it starts at 0)
    rollTheDice();                                                              //calls rollTheDice
}
function rollTheDice () {                                                    //declares a function "rollTheDice" to be called onclick "Roll'em" button
    money = cashAmount.value;                                                //assigns variable money to DOM operator property "value" of element cashAmount
    if (money <= 0) {                                                        //declares if /else loop. If the value of money is less than or equal to 0
      alert("You blew all your money!");                                     //make losing screen pop-up 
      document.getElementById("rollOutput").innerHTML = rollTotal;           //uses DOM innerHTML property to output the value of rollTotal
      rollTotal = 0;                                                         //resets local variable rollTotal to 0. If this isn't done, it doesn't reset properly.
      return;                                                                //return statement stops execution of the function (and the game)
    } else {                                                                 //otherwise        
    var die1 = document.getElementById("die1");                              //declares variable "die1" and refers to ElementId "die1" to get value.
    var die2 = document.getElementById("die2");                              //declares variable "die2" and refers to ElementId "die2" to get value.
    var d1 = Math.floor(Math.random() * 6) + 1;                              //declares variable "d1" and assigns it to the value of Javascript method random 
    var d2 = Math.floor(Math.random() * 6) + 1;                              //declares variable "d2" and assigns it to the value of Javascript method random
    die1.innerHTML = d1;                                                     //calls HTML DOM inner HTML property to change the value of the number on d1 to the value of d1
    die2.innerHTML = d2;                                                     //calls HTML DOM inner HTML property to change the value of the number on d1 to the value of d2
    diceTotal = d1 + d2;                                                     //calls variable diceTotal and assigns it to the value of d1 + d2
    checkDice();                                                             //executes function "checkDice" with no arguments
    rollTheDice();                                                           //calls function rollTheDice
        }
                  }
function checkDice() {                                                       //declares the function "checkDice" with no arguments
    if (diceTotal == 7 ) {                                                     //declares if / else loop. If the value of diceTotal == 7
       money++, money++, money++, money++ ;                                    //variable money four unary increment operators (money + 4)
        rollTotal++;                                                           //variable rollTotal adds one unary increment operator (plus one roll)
        checkScore();                                                          //calls function checkScore
    } else {                                                                   //otherwise
      money--;                                                                 //variable money four unary decrement operators (money - 1)
     rollTotal++;                                                              //variable rollTotal adds one unary increment operator (plus one roll)
      }
    cashAmount.value = money;                                                  //the new cash value is assigned to the variable money so that the program can loop
    }
function checkScore () {
    scores.push(money);                                                         //pushes the value of money to array scores
    var lastScore = scores[scores.length - 1];                                  //assigns variable lastScore to scores[scores.length - 1]
    var printScore = document.getElementById("high").innerHTML                  //assigns variable printScore to value of document element id "high"
    document.getElementById("high").innerHTML = Math.max.apply(Math, scores);   //assigns document element id "high" to Math.max of scores (prints the highest score in the array)
    rolls.push (rollTotal);                                                     //adds the roll total the rolls array
    if (lastScore >  printScore ) {                                             //if the last score added is greater than the value of printScore (the number in element id "high")
    (document.getElementById("rollOnWin").innerHTML = rolls.length);            // print the current roll length instead
       }
} 