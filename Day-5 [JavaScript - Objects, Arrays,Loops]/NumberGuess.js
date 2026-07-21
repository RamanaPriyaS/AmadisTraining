let player = {
    name: "",
    attempts: 0
};
let secretNumber = Math.floor(Math.random() * 10) + 1;
function checkGuess() {
    if(player.name === ""){
        player.name = document.getElementById("playerName").value;
        if(player.name === ""){
            alert("Please enter your name.");
            return;
        }
    }
    let guess = Number(document.getElementById("guess").value);
    if (guess>10){
        alert("Enter a number between 1 to 10")
    }
    if(guess === secretNumber){
        player.attempts++;
        document.getElementById("message").innerHTML =
        " Correct Guess!";
        document.getElementById("summary").innerHTML =
        `
        Name : ${player.name} <br>
        Secret Number : ${secretNumber} <br>
        Attempts : ${player.attempts}
        `;
    }
    else if(guess < secretNumber){
        player.attempts++;
        document.getElementById("message").innerHTML =
        "Too Low! Try Again.";
    }
    else{
        player.attempts++;
        document.getElementById("message").innerHTML =
        "Too High! Try Again.";
    }
    document.getElementById("guess").value = "";
}
// restartGame() {
//     let player = {
//     name: "",
//     attempts: 0
// };
