'use strict';

// selecting Elements
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.querySelector('#current--0');
const current1El = document.querySelector('#current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

// starting conditions
score0El.textContent = 0;
score1El.textContent = 0;
let currentScore = 0;
diceEl.classList.add('hidden');

btnRoll.addEventListener('click', () => {
  // generate Rondom Number
  const dice = Math.trunc(Math.random() * 6) + 1;

  // display dice
  diceEl.classList.remove('hidden');
  diceEl.src = `dice-${dice}.png`;

  // check for 1
  if (dice !== 1) {
    currentScore += dice;
    current0El.textContent = currentScore;
  } else {
    currentScore = 0;
    current0El.textContent = currentScore;
  }
});
