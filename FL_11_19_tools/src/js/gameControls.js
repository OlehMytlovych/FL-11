import { startRound } from './roundStarter';
import { cleanCurrentItem } from './currentItemCleaner';

(()=>{
  let round = 0;
  let roundResult;
  let playerWon = 0;
  let computerWon = 0;

  document.querySelector('.items').addEventListener('click', (e) => {
    if (e.target.classList.contains('item')) {
      round++;

      cleanCurrentItem();//cleans the battle board from items

      if (round <= 3) {
        roundResult = startRound(round, e.target.getAttribute('id'));

        if (roundResult === 'Won') {
          playerWon++;
        } else if (roundResult === 'Lost') {
          computerWon++;
        } else {
          --round;
        }
      }

      if (round === 3) {
        const questionMarks = document.querySelectorAll('.questionMark');
        const finalResult = document.createElement('p');

        cleanCurrentItem();
        
        questionMarks[0].style.display = 'inline-block';
        questionMarks[1].style.display = 'inline-block';

        finalResult.innerHTML = (playerWon > computerWon) ? 'Congrats! You Are The Winner':'This Time Jigsaw Has Won';
        document.querySelector('.results').appendChild(finalResult);
      }
    }
  })

  document.querySelector('.controlButtons').addEventListener('click', (e) => {
    if (e.target.getAttribute('id') === 'btnReset') {
      const resultsBlock = document.querySelector('.results');
      let child = resultsBlock.lastElementChild;
      const questionMarks = document.querySelectorAll('.questionMark');

      round = 0;
      playerWon = 0;
      computerWon = 0;
      
      while (child) { 
        resultsBlock.removeChild(child); 
        child = resultsBlock.lastElementChild; 
      }
      cleanCurrentItem()
      questionMarks[0].style.display = 'inline-block';
      questionMarks[1].style.display = 'inline-block';
    }
  
    if (e.target.getAttribute('id') === 'btnLeave') {
      round = 0;
    
      document.querySelector('.game').style.display = 'none';
      document.querySelector('.byeBye').style.display = 'block';
    }
  })
})()
