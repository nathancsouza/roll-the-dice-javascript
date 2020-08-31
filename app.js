/**********************************************************************************************************
Game Parameters

- Create a dice game where a user plays against the computer. The user and the computer each
roll a pair of dice 3 times. After the third roll of the dice the player with highest score wins

- The scoring for the game works as follows:
o If any of the players two dice comes up as a 1 then the score for that round for the
player is 0

§ Example:
• Player rolls a 6 and a 1
o Player score = 0
o If the player rolls a pair of the same numbers then the players score is the total of the
two dice times 2

§ Example:
• Player rolls a pair of 5’s
o Player score is (5 + 5) * 2 = 20
o If the player rolls any other combination of dice other than the ones mentioned above
then the players score is the total value of the two dice

§ Example:
• Player rolls a 3 and a 2
o Player score is 3 + 2 = 5

- The game should provide a text or graphical output showing the following:
o The current rolled dice by the player and the computer
o The score for this round for the player and the computer
o The total score for the game

- The game should provide a button that will roll the dice for the player and the computer

- After three rolls of the dice the game should total up the scores and display a message
displaying who the winner was

- The game should provide a button that will reset the game and start a new game

**********************************************************************************************************/

// Get elements
const getElement = name => {
  return document.querySelector(name);
};

/**********************************
Variables
**********************************/

let scores, roundScore, activePlayer, gamePlaying, setNewValue, winningScore;
winningScore = 35;

// Creating history
const historyOfDice1 = [];
const historyOfDice2 = [];

const historyOfDice3 = [];
const historyOfDice4 = [];

//GRAB BUTTONS ELEMENTS
const btnRollDice = document.getElementById('btn-roll');
const btnNewGame = document.getElementById('btn-new');
const btnSetNewScore = document.getElementById('btn-setNewScore');

//GRAB PLAYERS
const playerName0 = document.getElementById('name-0');
const playerName1 = document.getElementById('name-1');

//GRAB SCORES

const player1Score = document.getElementById('score-0');
const player2Score = document.getElementById('score-1');

// GRAB HISTORY ELEMENTS
const historyFromPlayer1d1 = document.getElementById('history-0');
const historyFromPlayer1d2 = document.getElementById('history-1');
const historyFromPlayer2d1 = document.getElementById('history-2');
const historyFromPlayer2d2 = document.getElementById('history-3');

//GRAB FINAL SCORE ELEMENT
const finalScore = getElement('.winnerScore');

//grab dices
const diceImg = document.getElementById('dice-1');
const diceImg2 = document.getElementById('dice-2');

//grab buttons to change name
const btnName1 = document.getElementById('button-0');
const btnName2 = document.getElementById('button-1');

//Saving name if is changed
let newName1;
let newName2;



/**********************************
Properties when the game is started
***********************************/

const initGame = () => {
  // Set globally values
  scores = [0, 0];
  roundScore = 0;
  activePlayer = 0;
  gamePlaying = true;
  setNewValue = true;
  // Hide dice
  toggleDice1(true);  
  toggleDice2(true);
  // Reset active player
  toggleActivePlayer();
  // Reset UI
  document.querySelectorAll('.player-current-score').forEach(player => player.textContent = 0);
  document.querySelectorAll('.player-score').forEach(player => player.textContent = 0);

  getElement(`.player-0-panel`).classList.remove('winner');
  getElement(`.player-1-panel`).classList.remove('winner');
  
  //Reset player name if the name was not changed
  if(newName1 != null) {
    playerName0.textContent = newName1;
  } else {
    playerName0.textContent = `Player 1`;
  }

  if(newName2 != null) {
    playerName1.textContent = newName2;
  } else {
    playerName1.textContent = `Player 2`;
  } 

  //Displaying dices again
  btnRollDice.style.display = 'block';

  //Reset players history
  historyFromPlayer1d1.innerHTML = [];
  historyOfDice1.length = 0;
  historyFromPlayer1d2.innerHTML = [];
  historyOfDice2.length = 0;

  historyFromPlayer2d1.innerHTML = [];
  historyOfDice3.length = 0;
  historyFromPlayer2d2.innerHTML = [];
  historyOfDice4.length = 0;

  // Showing final score the players must reach to win
  finalScore.textContent = winningScore;
};

/**********************************
Init the game when the btn is clicked
***********************************/
btnNewGame.addEventListener('click', initGame);

/**********************************
Change players names
***********************************/
btnName1.addEventListener('click', () => {
  let playerName = document.getElementById('input-0').value;
  if(setNewValue) {    
    if(playerName.length <= 12 && playerName.length >= 3) {
      playerName0.innerHTML = playerName;
      newName1 = playerName;
    } else {
      alert('The length of player name must be between 3 and 12')
    }
  } else {
    alert('The game still running, wait this round finish.')
  }

  document.getElementById('input-0').value = "";
});

btnName2.addEventListener('click', () => {
  let playerName = document.getElementById('input-1').value;
  if(setNewValue) {
    if(playerName.length <= 12 && playerName.length >= 3) {
      playerName1.innerHTML = playerName; 
      newName2 = playerName;
    } else {
      alert('The length of player name must be between 3 and 12')
    }
  } else {
    alert('The game still running, wait this round finish.')
  }

  document.getElementById('input-1').value = "";
});

/**********************************
Set the new winner score before the game is started
***********************************/

btnSetNewScore.addEventListener('click', () => {
  newScore = prompt('Enter the new final score');
  parse = parseInt(newScore, 10);
  
  // changing new winning score if prompt is a number
  if(setNewValue) {
    if (isNaN(parse) || parse < 1) {
      alert('You must insert only numbers')
    } else {
      winningScore = parse;
      finalScore.textContent = winningScore;
    }
  } else {
    alert('Finish your game before set new winner score')
  }
    
});

/**********************************
Roll dice when the btn is clicked
***********************************/

btnRollDice.addEventListener('click', () => {
  if (!gamePlaying) return;
  setNewValue = false;

  const currentPlayerScore = getElement(`#score-${activePlayer}`);  
  const currentScore = getElement(`#current-${activePlayer}`);
  
  // Make Dice
  let dice1 = Math.floor(Math.random() * 6) + 1;
  let dice2 = Math.floor(Math.random() * 6) + 1;
  // Show dice
  toggleDice1(false, dice1);
  toggleDice2(false, dice2);

  // Saving history of dices
  if(activePlayer === 0) {
    historyOfDice1.push(dice1);
    historyFromPlayer1d1.innerHTML = historyOfDice1;
    historyOfDice2.push(dice2);
    historyFromPlayer1d2.innerHTML = historyOfDice2;
  } else {
    historyOfDice3.push(dice1);
    historyFromPlayer2d1.innerHTML = historyOfDice3;
    historyOfDice4.push(dice2);
    historyFromPlayer2d2.innerHTML = historyOfDice4;
  }
  // Set dice's value to content
  if (dice1 !== 1 && dice2 !== 1) {
    if(dice1 == dice2) {
      currentScore.textContent = + currentScore.textContent + ((dice1 + dice2) * 2);
      // Set round score
      roundScore = +currentScore.textContent;
      holdAndPass();
    } else {
      currentScore.textContent = + currentScore.textContent + (dice1 + dice2);
      // Set round score
      roundScore = +currentScore.textContent;
      holdAndPass();
    }
    
  } else {
    // Current score receive 0 
    //change player
    // and toggle active player
    currentScore.textContent = 0;
    activePlayer = activePlayer ? 0 : 1;
    toggleActivePlayer();
  }

  //setting winner after the third round
  if(historyOfDice1.length >= 3 && historyOfDice3.length >= 3 ) {
      let winnerPlayer1 = Number(player1Score.textContent);
      let winnerPlayer2 = Number(player2Score.textContent);
      if(winnerPlayer1 > winnerPlayer2) {
        setPlayerWin(0);
      } else if(winnerPlayer1 < winnerPlayer2) {
        setPlayerWin(1);
      } else {
        getElement(`#name-0`).textContent = 'DRAW!';
        getElement(`#name-1`).textContent = 'DRAW!';
        document.querySelector(`.player-0-panel`).classList.add('active');
        document.querySelector(`.player-1-panel`).classList.add('active');        
        // Stop game
        gamePlaying = false;
      }
  }
});

/**********************************
Hold your points and pass your turn
***********************************/

const holdAndPass = () => {
  if (!gamePlaying) return;

const currentPlayerScore = getElement(`#score-${activePlayer}`);
const currentScore = getElement(`#current-${activePlayer}`);
// Save score
scores[activePlayer] += roundScore;
// Update UI Set score
currentPlayerScore.textContent = scores[activePlayer];
// If Win
if (scores[activePlayer] >= winningScore) {
  // Set Winner
  setPlayerWin(activePlayer);
  return;
}
// Change player
activePlayer = activePlayer ? 0 : 1;
// Clean current score
currentScore.textContent = 0;
// Change active panel
toggleActivePlayer();
// Reset round score
roundScore = 0;

};

/**********************************
Change the active panel
***********************************/

const toggleActivePlayer = () => {  
  document.querySelector(`.player-0-panel`).classList.remove('active');
  document.querySelector(`.player-1-panel`).classList.remove('active');
  document.querySelector(`.player-${activePlayer}-panel`).classList.toggle('active');
};

/**********************************
Change the dice on screen 1-6
***********************************/

const toggleDice1 = (hide, number = 1) => {  
  // Change image src
  diceImg.src = `dice-${number}.png`;
  // Block or hide dice
  diceImg.style.display = hide ? 'none' : 'block';
};

const toggleDice2 = (hide, number = 1) => {  
  // Change image src
  diceImg2.src = `dice-${number}.png`;
  // Block or hide dice
  diceImg2.style.display = hide ? 'none' : 'block';
};

/**********************************
Set the winner player
***********************************/

const setPlayerWin = current => {
  getElement(`#name-${current}`).textContent = 'Winner!';
  getElement(`.player-${current}-panel`).classList.add('winner');
  // Stop game
  gamePlaying = false;
  setNewValue = true;
  hideRollDice();
};

//HIDE THE DICE WHEN THE GAME IS OVER
const hideRollDice = () => {
  if (gamePlaying) return;  
  btnRollDice.style.display = 'none';
};

/**********************************
Restart the game
***********************************/

initGame();