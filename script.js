const numberGuess = document.getElementsByClassName('numbers');
const guessOne = document.getElementById('firstN');
const guessTwo = document.getElementById('secondN');
const guessThree = document.getElementById('thirdN');
const submit = document.getElementById('submit')
const resultOne = document.getElementById('firstResult');
const resultTwo = document.getElementById('secondResult');
const resultThree = document.getElementById('thirdResult');
const clueHere = document.getElementById('rowOneClue');



const numbers = [0,1,2,3,4,5,6,7,8,9];
const correctPlace = " correct and in the right spot. ";
const incorrectPlace = " correct but in the wrong spot.";
const wrong = "All incorrect!";
const winMessage = "Congrats! You've unlocked the code!"

resultOne.textContent = 6;
resultTwo.textContent = 0;
resultThree.textContent = 9;


let guessArray = [];

//loads page with lock code of 3 digits
let lockN = 3;
let lockArray = numbers.sort(() => 0.5 - Math.random());
let lockCode = lockArray.slice(0, lockN);

function resetLock() {
    lockArray = numbers.sort(() => 0.5 - Math.random());
    lockCode = lockArray.slice(0, lockN);
}

function getInputValue() {
    let one = guessOne.valueAsNumber;
    let two = guessTwo.valueAsNumber;
    let three = guessThree.valueAsNumber;
    guessArray = [];

    if (!isNaN(one) && !isNaN(two) && !isNaN(three)) {
        if (one > 9 || two > 9 || three > 9) {
            alert("ERROR: guesses must be single digits");
        } else {
            resultOne.textContent = one;
            resultTwo.textContent = two;
            resultThree.textContent = three;
            guessArray.push(one);
            guessArray.push(two);
            guessArray.push(three);
            console.log(guessArray);
        }
    } else {
        alert("Make sure to submit 3 numbers")
    }
};

function compareArrays() {
    let sumCorrectPlace = 0;
    let sumIncorrectPlace = 0;
    for (let i = 0; i < guessArray.length; i++){
        if (guessArray[i] === lockCode[i]) {
            sumCorrectPlace += 1;
        } else if (lockCode.includes(guessArray[i]) && guessArray[i] !== lockCode[i]) {
            sumIncorrectPlace += 1;
        } 
    };

    if (sumCorrectPlace === 3) {
        clueHere.textContent = winMessage;
    } else if (sumCorrectPlace > 0 && sumIncorrectPlace > 0) {
        clueHere.textContent = sumCorrectPlace + " correct and in the right spot. " + sumIncorrectPlace + " correct but in the wrong spot.";
    } else if (sumCorrectPlace > 0 && sumCorrectPlace === 0) {
        clueHere.textContent = sumCorrectPlace + " correct and in the right spot.";
    } else if (sumCorrectPlace === 0 && sumIncorrectPlace > 0) {
        clueHere.textContent = sumIncorrectPlace +  " correct but in the wrong spot.";
    } else if (sumCorrectPlace === 0 && sumCorrectPlace === 0) {
        clueHere.textContent = wrong;
    }
    console.log("sumCorrectPlace is " + sumCorrectPlace);
    console.log("sumIncorrectPlace is " + sumIncorrectPlace);

    //compare guessArray with lockCode
    //find equal values and their indexes
    //if equal values in the same index, return correctPlace
    //if equal values in different indexes, return incorrectPlace
    //if all values are equal to each other in the same index, return win message and reset lockCode
};


/* PSEUDOCODE
1. submit guess = user's guess
    - begin a timer and display it upon first successful submission
2. return error message for any duplicate numbers in guess
3. lock code is randomly generated by pulling 3 items out of number array, thus no duplicates
4. user guess is compared to lock code
    - for any guesses that are in the correct spot, return correctPlace message
    - for any guesses that are correct but in the wrong spot, return incorrectPlace message
    - for any guesses that are all incorrect, return wrong message
5. display hint message next to each of the results
6. if the complete code isn't guessed correctly, for the following guess, create a new row of results
    below the first row
7. If complete code is guessed correctly, return message of completion and display
    - number of lines it took to complete
    - time it took
8. Allow user to change number of digits to unlock between 2-10 digits
*/