$(document).ready(function () {
    var hpShow = document.getElementById("user-hp");
    var displayShow = document.getElementById("user-display");
    var checkedShow = document.getElementById("user-checked");
    var scoreShow = document.getElementById("user-score");
    var gottenShow = document.getElementById("user-gotten");
    var hintShow = document.getElementById("user-hint");
    var hp = Math.floor(6);
    var match = Math.floor(0); //how many letters of the words the player got right
    var score = Math.floor(0);
    var display = []; //the array to save the letters already gotten right
    var checked = []; // to save all geussed letters
    var answer = [];
    //var wordBank = ["HTML", "CSS", "JAVASCRIPT", "BOOTSTRAP", "ARRAYS", "OBJECT", "METHOD", "FUNCTION", "SCOPE", "CLASS", "SYNTAX"];
    var wordBank = [
        {word:"HTML", hint:"standard markup language for creating Web pages."},
        {word:"CSS", hint:"describes how HTML elements are to be displayed."},
        {word:"JAVASCRIPT", hint:"programming language of HTML and the Web."},
        {word:"BOOTSTRAP", hint:"popular open source toolkit for developin.g"},
        {word:"ARRAYS", hint:"special variable,can hold more than one value at a time."},
        {word:"OBJECT", hint:"collection of related  variables and functions."},
        {word:"METHOD", hint:"actions that can be performed on objects."},
        {word:"FUNCTION", hint:"block of code designed to perform a particular task."},
        {word:"SCOPE", hint:"region of a computer program where the binding is valid."},
        {word:"SYNTAX", hint:"specifies how symbols should be arranged to form correctly structured programs."},
    ]
    var wordsRight = [];
    var tempString = "";
    var active = false; //user input only valid when active
    var correctSound = document.getElementById("correctAudio");
    var errorSound = document.getElementById("errorAudio");
    //function newWord() {
    const newWord = _ => {
        if (wordBank.length != 0) {
            display = [];
            var rand = Math.floor(Math.random() * wordBank.length);
            answer = wordBank[rand].word.split("");
            hintShow.textContent = wordBank[rand].hint;
            wordBank.splice(rand, 1);
            match = answer.length;
            for (i = 0; i < answer.length; i++) {
                display.push("_");
            }
            displayShow.textContent = display;
            checked = [];
            checkedShow.textContent = checked;
            active = true;
        }
        else {
            setTimeout(_ => { location.reload(true); }, 2000);
            //setTimeout(function () { location.reload(true); }, 2000);
            document.write("YOU WIN");
            active = false;
        }
    }
    
    //initialize game
    newWord();
    hpShow.textContent = hp;

    //Main structure
    document.onkeydown = event => {
        //document.onkeydown = function (event) {
        var keyPressed = String.fromCharCode(event.keyCode);
        if (active) {
            if (event.keyCode < 91 && event.keyCode > 64) {
                //console.log(event.keyCode);
                //console.log(keyPressed);
                if (checked.indexOf(keyPressed) == -1) {
                    checked.push(keyPressed);
                    checkedShow.textContent = checked;
                   
                    if (answer.indexOf(keyPressed) != -1) {
                        
                        for (var i = 0; i < answer.length; i++) {
                            if (answer[i] == keyPressed) {
                                display[i] = keyPressed;
                                match--;
                            }
                            displayShow.textContent = display;
                        }
                        if (match == 0) {
                            score++;
                            scoreShow.textContent = score;
                            hp ++;
                            hpShow.textContent = hp;
                            correctSound.play();
                            wordsRight.push(answer.join(""));
                            var newGot = document.createElement("div");
                            newGot.innerHTML = wordsRight[wordsRight.length - 1];
                            gottenShow.appendChild(newGot)
                            //gottenShow.textContent = wordsRight;
                            active = false;
                            //setTimeout(function () { newWord(); }, 2000);
                            setTimeout(newWord, 1500);


                        }
                    }
                    else {
                        hp--;
                        errorSound.play();
                        hpShow.textContent = hp;
                        if (hp < 1) {
                            displayShow.textContent = answer;
                            active = false;
                            setTimeout(_ => { document.write("YOU LOSE. Final Score: " + score); }, 2000);
                            setTimeout(_ => { location.reload(true); }, 3500);
                        }
                    }
                }
            }
        }
    }
})