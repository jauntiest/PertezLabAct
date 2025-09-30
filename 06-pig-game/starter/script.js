'use strict';

// Game state variables
let scores, currentScore, activePlayer, playing;

// Element selections
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnRoll = document.querySelector('.btn--roll');

// Enhanced init function for complete game reset
const init = function () {
  // Reset game state
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  // Reset all displays
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  // Hide dice
  diceEl.classList.add('hidden');

  // Reset player styling
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};

// Initialize the game
init();

// Create our switchPlayer function
const switchPlayer = function () {
  // Reset current score for the active player
  document.getElementById(`current--${activePlayer}`).textContent = 0;

  // Reset currentScore variable
  currentScore = 0;

  // Switch to the other player
  activePlayer = activePlayer === 0 ? 1 : 0;

  // Toggle the active class on both players
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

// Updated roll dice functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    const dice = Math.trunc(Math.random() * 6) + 1;
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // Use our new switchPlayer function
      switchPlayer();
    }
  }
});

// Select the hold button
const btnHold = document.querySelector('.btn--hold');

// Enhanced hold functionality with win condition and validation
btnHold.addEventListener('click', function () {
  if (playing && currentScore > 0) {
    // Add current score to active player's score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // Check for win condition
    if (scores[activePlayer] >= 100) {
      // Player wins!
      playing = false;
      diceEl.classList.add('hidden');

      // Add winner styling
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');

      // Remove active class from winner
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      // Switch to next player
      switchPlayer();
    }
  }
});