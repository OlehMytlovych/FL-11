import { giveRandomPicture } from './giveRandomPicture';

export const startRound = (round, userItem) => {
  const [computerChoice, enemyPic] = giveRandomPicture();
  const playerPic =  document.createElement('img');
  const enemyItem = document.getElementById('enemyItem');
  const playerItem = document.getElementById('playerItem');
  const questionMark = document.querySelectorAll('.questionMark');
  const resultBlock = document.querySelector('.results');
  const info = document.createElement('p');
  let roundResult;

  questionMark[0].style.display = 'none';
  questionMark[1].style.display = 'none';

  playerPic.setAttribute('src', `./img/${userItem}.png`);
  playerPic.classList.add('item')

  enemyItem.appendChild(enemyPic)
  playerItem.appendChild(playerPic)

  if (userItem === computerChoice) {
    roundResult = 'Tie';
  } else if (userItem === 'rock' && computerChoice === 'paper') {
    roundResult = 'Won';
  } else if (userItem === 'rock' && computerChoice === 'scissors') {
    roundResult = 'Lost';
  } else if (userItem === 'paper' && computerChoice === 'rock') {
    roundResult = 'Won';
  } else if (userItem === 'paper' && computerChoice === 'scissors') {
    roundResult = 'Lost';
  } else if (userItem === 'scissors' && computerChoice === 'paper') {
    roundResult = 'Won';
  } else if (userItem === 'scissors' && computerChoice === 'rock') {
    roundResult = 'Lost';
  }

  info.innerHTML = `Round ${round}, You Have ${roundResult}`;
  resultBlock.appendChild(info);
  return roundResult
}

