const numberGuess = document.getElementsByClassName('numbers');
const guessOne = document.getElementById('firstN');
const guessTwo = document.getElementById('secondN');
const guessThree = document.getElementById('thirdN');
const submit = document.getElementById('submit')
const resultOne = document.getElementById('firstResult');
const resultTwo = document.getElementById('secondResult');
const resultThree = document.getElementById('thirdResult');
const clueHere = document.getElementById('rowOneClue');
const resultsRow = document.querySelector('.guessResults');
const lineScore = document.getElementById('lineScore');
const avgLines = document.getElementById('avgLines');
const rowOneResults = document.getElementsByClassName('rowOneResults');
const clueContainer = document.getElementsByClassName('clueContainer');
const locksOpen = document.getElementById('locksOpen');
const minText = document.getElementById('min');
const secText = document.getElementById('sec');
// const msecText = document.getElementById('count');
const avgMin = document.getElementById('avgMin');
const avgSec = document.getElementById('avgSec');


const numbers = [0,1,2,3,4,5,6,7,8,9];
const wrong = "All incorrect!";
const winMessage = "Congrats! You've unlocked the code!"

//user's submitted guess goes here
let guessArray = [];

//loads page with lock code of 3 digits
let lockArray = numbers.sort(() => 0.5 - Math.random());
let lockCode = lockArray.slice(0, 3);

//for timer
var minute = 00;
var second = 00;
var msec = 00;
var timer = false;
var startTime = Date.now();

function startTimer() {
    timer = true;
    startTime = Date.now();
    stopWatch();
}

function stopWatch() {
    if (timer) {
        var elapsedTime = Date.now() - startTime;
        var minute = Math.floor(elapsedTime / (60 * 1000) % 60).toString().padStart(2, '0');
        var second = Math.floor(elapsedTime / 1000 % 60).toString().padStart(2, '0');
        // var msec = Math.floor(elapsedTime % 1000).toString().padStart(2, '0');

        document.getElementById('min').textContent = minute;
        document.getElementById('sec').textContent = second;
        // document.getElementById('count').textContent = msec;
        setTimeout(stopWatch,10);
    }
}

var timeArray = [];

function pauseTimer() {
    timer = false;
    var minNum = parseInt(minText.textContent);
    var secNum = parseInt(secText.textContent);
    // var msecNum = parseInt(msecText.textContent);
    var sumTime = parseFloat(minNum * 60 + secNum);
    timeArray.push(sumTime);
}

function resetTimer() {
    timer = false;
    minute = 0;
    second = 0;
    count = 0;
    minText.textContent = "00";
    secText.textContent = "00";
    // msecText.textContent = "00";
}

function getAvgTime() {
    let sum = 0;
    for (let i = 0; i < timeArray.length; i++) {
        sum += timeArray[i];
    }

    let avg = sum / timeArray.length;
    let roundAvg = Math.round(avg * 100)/100;
    let roundMin = parseInt(roundAvg / 60);
    let secRemain = parseFloat(roundAvg % 60)
    let roundSec = Math.round(secRemain);

    if (avg > 0) {
        if (roundMin < 10) {
            avgMin.textContent = '0' + roundMin + ' : ';
        } else {
            avgMin.textContent = roundMin + ' : ';
        };

        if (roundSec < 10) {
            avgSec.textContent = '0' + roundSec;
        } else {
        avgSec.textContent = roundSec;
        }
    } 
}

let correctResult = 0;
let incorrectResult = 0;


function getInputV2() {
    let one = guessOne.valueAsNumber;
    let two = guessTwo.valueAsNumber;
    let three = guessThree.valueAsNumber;
    guessArray = [];

    if (!isNaN(one) && !isNaN(two) && !isNaN(three)) {
        if (one > 9 || two > 9 || three > 9) {
            alert("ERROR: guesses must be less than 10!");
        } else if (guessOne.value.length > 1 || guessTwo.value.length > 1 || guessThree.value.length > 1) {
            alert("ERROR: only integers from 0-9!")
        } else if (correctResult ===3) {
            resetLock();
            resetTimer();
        } else {
            guessArray.push(one);
            guessArray.push(two);
            guessArray.push(three);
            console.log(guessArray);
            compareArraysV2();
            createRowV2();
        }
    } else {
        alert("Make sure to submit 3 numbers")
    }

    if (scoreArray.length > 0) {
        getAvgScore();
        getAvgTime();
        locksOpen.textContent = scoreArray.length;
    }
};

function resetLock() {
    lockArray = numbers.sort(() => 0.5 - Math.random());
    lockCode = lockArray.slice(0, 3);
    guessOne.value = null;
    guessTwo.value = null;
    guessThree.value = null;
    correctResult = 0;
    currentTries = 0;
    lineScore.textContent = 0;
    document.querySelectorAll(".rowOne").forEach(el => el.remove());
    document.querySelectorAll(".clueContainer").forEach(el => el.remove());
    submit.value = 'Submit';
}


let resultContainer = document.createElement("div");
resultContainer.classList.add('rowOne');
let resultBox = document.createElement("div");
resultBox.classList.add('rowOneResults');
let hintBox = document.createElement("div");
hintBox.classList.add('clueContainer');

let currentTries = 0;
let scoreArray = [];
let avg = 0;

function getAvgScore () {
    let sum = 0;
    for (let i = 0; i < scoreArray.length; i++) {
        sum += scoreArray[i];
    }

    console.log("sum is equal to " + sum);
    let avg = sum / scoreArray.length;
    let roundAvg = Math.round(avg * 100)/100;

    if (roundAvg > 0) {
        avgLines.textContent = roundAvg;
    } else {
        avgLines.textContent = '';
    }
}


function createRowV2() {
    let resultContainer = document.createElement("div");
    resultContainer.classList.add('rowOne');
    resultsRow.prepend(resultContainer);

    for (let i = 0; i <= 2; i++) {
        let resultBox = document.createElement("div");
        resultBox.classList.add('rowOneResults');
        resultBox.textContent = guessArray[i];
        resultContainer.appendChild(resultBox);
    };

    let hintBox = document.createElement("div");
    hintBox.classList.add('clueContainer');

    if (currentTries == 0){
        startTimer();
    }

    currentTries += 1;
    lineScore.textContent = currentTries;

    if (correctResult === 3) {
        hintBox.textContent = winMessage;
        scoreArray.push(currentTries);
        pauseTimer();
        submit.value = "Reset";
    } else if (correctResult > 0 && incorrectResult > 0) {
        hintBox.textContent = correctResult + " correct and in the right spot. " + incorrectResult + " correct but in the wrong spot.";
    } else if (correctResult > 0 && incorrectResult === 0) {
        hintBox.textContent = correctResult + " correct and in the right spot.";
    } else if (correctResult === 0 && incorrectResult > 0) {
        hintBox.textContent = incorrectResult +  " correct but in the wrong spot.";
    } else if (correctResult === 0 && incorrectResult === 0) {
        hintBox.textContent = wrong;
    }

    resultContainer.appendChild(hintBox);
}

function compareArraysV2() {
    let sumCorrectPlace = 0;
    let sumIncorrectPlace = 0;
    for (let i = 0; i < guessArray.length; i++){
        if (guessArray[i] === lockCode[i]) {
            sumCorrectPlace += 1;
        } else if (lockCode.includes(guessArray[i]) && guessArray[i] !== lockCode[i]) {
            sumIncorrectPlace += 1;
        } 
    };

    console.log("sumCorrectPlace is " + sumCorrectPlace);
    console.log("sumIncorrectPlace is " + sumIncorrectPlace);

    correctResult = sumCorrectPlace;
    incorrectResult = sumIncorrectPlace;
};




/* PSEUDOCODE
1. submit guess = user's guess
    - begin a timer and display it upon first successful submission
2. return error message for any duplicate numbers in guess
3. lock code is randomly generated by pulling 3 items out of number array, thus no duplicates - DONE
4. user guess is compared to lock code - DONE
    - for any guesses that are in the correct spot, return correctPlace message - DONE
    - for any guesses that are correct but in the wrong spot, return incorrectPlace message - DONE
    - for any guesses that are all incorrect, return wrong message - DONE
5. display hint message next to each of the results - DONE
6. if the complete code isn't guessed correctly, for the following guess, create a new row of results
    below the first row - DONE
7. If complete code is guessed correctly, return message of completion and display 
    - number of lines it took to complete - DONE
    - time it took
8. Allow user to change number of digits to unlock between 2-10 digits

BUGS/TO-DO
- for some reason, results aren't consistently displayed correctly and often returns "All incorrect!" despite 
    there being correct answers submitted - FIXED
- figure out how to populate new rows with additional submissions and clues - DONE
    -might need to erase first result row and let each new row populate with each submission button - DONE
- Write out rules for playing game - DONE
- Add display for timer
    - begin timer with the first submission, end timer when the code is unlocked
- Add display for number of lines - DONE
- Keep track of codes cracked within a page refresh and calculate average number of tries to unlock code - DONE
- keyboard support - ability to use 'Enter' to submit
- only integers 0-9 - DONE
*/




