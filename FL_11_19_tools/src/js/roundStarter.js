import { giveRandomPicture } from './giveRandomPicture';

export const startRound = (round, userItem) => {
  const [computerChoice, enemyPic] = giveRandomPicture();
  const playerPic =  document.createElement('img');
  const enemyItem = document.getElementById('enemyItem');
  const playerItem = document.getElementById('playerItem');
  const questionMark = document.querySelectorAll('.questionMark');
  const resultBlock = document.querySelector('.results');
  const info = document.createElement('p');
  let winner;

  questionMark[0].style.display = 'none';
  questionMark[1].style.display = 'none';

  playerPic.setAttribute('src', `./img/${userItem}.png`);
  playerPic.classList.add('item')

  enemyItem.appendChild(enemyPic)
  playerItem.appendChild(playerPic)

  if (userItem === computerChoice) {
    winner = 'Tie';
  } else if (userItem === 'rock' && computerChoice === 'paper') {
    winner = 'Won';
  } else if (userItem === 'rock' && computerChoice === 'scissors') {
    winner = 'Lost';
  } else if (userItem === 'paper' && computerChoice === 'rock') {
    winner = 'Won';
  } else if (userItem === 'paper' && computerChoice === 'scissors') {
    winner = 'Lost';
  } else if (userItem === 'scissors' && computerChoice === 'paper') {
    winner = 'Won';
  } else if (userItem === 'scissors' && computerChoice === 'rock') {
    winner = 'Lost';
  }

  info.innerHTML = `Round ${round}, You Have ${winner}`;
  resultBlock.appendChild(info);
  return winner
}

