import words from './words.js';
import buttons from "./buttons.js";

let randomWord = [];
let wordArray = [];
let guesses = 6;

window.onload = function() {
    window.scrollTo(0, document.body.scrollHeight);
    buttons.forEach(button => {
        button.addEventListener("click", function newOnClick() {
            button.className = "disabled";
            button.outerHTML = button.outerHTML;
            if(randomWord.includes(button.id)) {
                for(let i = 0; i < randomWord.length; i++) {
                    if(randomWord[i] === button.id) {
                        wordArray[i] = button.id;
                    }
                }
                reloadView();
            }else guesses--; showGuesses();
        });
    })
    newWord();
    showGuesses();
}

window.onresize = function() {
    location.reload();
}

function newWord() {
    randomWord = words[Math.floor(Math.random() * words.length)].toLowerCase();

    for(let i = 0; i < randomWord.length; i++) {
        if(randomWord[i] === " ") wordArray[i] = "-"; else wordArray.push("_");
    }
    console.log(randomWord);
    reloadView();
}

function reloadView() {
    document.getElementById("showWord").innerHTML = wordArray.join(' ');
}

function checkForWin() {
    if (wordArray.includes("_")) return false;
    else {
        buttons.forEach(button => {
            button.outerHTML = button.outerHTML;
        });
        document.getElementById("showWord").innerHTML = 'Du hast gewonnen!';
        document.getElementById("show-guesses").innerHTML = 'Neues Spiel?';
        document.ontouchstart = function() {location.reload();}
    }
}

function showGuesses() {
    document.getElementById("show-guesses").innerHTML = 'Übrige Versuche: ' + guesses;
    if (guesses === 0) location.reload();
    checkForWin()
}

document.onkeydown = function(e) {
    if (e.key === "Enter") location.reload();

    try {
        let key = document.getElementById(e.key.toLowerCase());
        key.click();
    } catch (error){}
}