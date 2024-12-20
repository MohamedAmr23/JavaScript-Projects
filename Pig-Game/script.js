'use strict';

// selecting Elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.querySelector('#current--0');
const current1El = document.querySelector('#current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const btnPlayComputer = document.querySelector('.btn--play-computer');

let score, currentScore, activePlayer, playing, isComputerMode;

// Starting conditions
const init = function () {
  score = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;
  isComputerMode = false;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  document.getElementById('name--1').textContent = 'Player 2';

  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};
init();

const switchPlayer = () => {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
  
  // If computer mode is on and it's computer's turn
  if (isComputerMode && activePlayer === 1) {
    computerPlay();
  }
};

const computerPlay = async () => {
  if (!playing) return;

  // Disable buttons during computer's turn
  btnRoll.disabled = true;
  btnHold.disabled = true;

  // Computer's strategy: keep rolling until reaching 20 points or getting a 1
  while (currentScore < 15  && playing && activePlayer === 1) {
    // Add delay to make computer's moves visible
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Roll dice
    const dice = Math.trunc(Math.random() * 6) + 1;
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    if (dice === 1) {
      switchPlayer();
      break;
    } else {
      currentScore += dice;
      current1El.textContent = currentScore;
      
      // If computer can win, hold
      if (score[1] + currentScore >= 100) {
        await new Promise(resolve => setTimeout(resolve, 500));
        handleHold();
        break;
      }
    }
  }

  // If computer hasn't lost or won, hold
  if (playing && activePlayer === 1 && currentScore > 0) {
    await new Promise(resolve => setTimeout(resolve, 500));
    handleHold();
  }

  // Re-enable buttons
  btnRoll.disabled = false;
  btnHold.disabled = false;
};

const handleHold = () => {
  if (playing) {
    score[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent = score[activePlayer];

    if (score[activePlayer] >= 100) {
      playing = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      switchPlayer();
    }
  }
};

btnRoll.addEventListener('click', () => {
  if (playing && (activePlayer === 0 || !isComputerMode)) {
    const dice = Math.trunc(Math.random() * 6) + 1;
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent = currentScore;
    } else {
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', () => {
  if (playing && (activePlayer === 0 || !isComputerMode)) {
    handleHold();
  }
});

btnNew.addEventListener('click', init);

btnPlayComputer.addEventListener('click', () => {
  init();
  isComputerMode = true;
  document.getElementById('name--1').textContent = 'Computer';
});