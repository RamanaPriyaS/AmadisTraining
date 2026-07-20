function rollDice() {
    let random = Math.floor(Math.random() * 6) + 1;
    document.getElementById("dice").src = "Images/dice" + random + ".png";
    alert("Dice Rolled");
    console.log("Number on Dice :",random)
}
