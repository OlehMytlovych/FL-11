let start = confirm('Do you want to play a game?');
let firstNumber = 0;
const lastNumberDefault = 8;
let lastNumber;
const increment = 4;
let random;
const attemptsLeft1 = 25;
const attemptsLeft2 = 50;
const attemptsLeft3 = 100;
const attemptsPrizeDefault = [attemptsLeft1, attemptsLeft2, attemptsLeft3];
let attemptsPrize;
const prizeMultiplier = 2;
let totalPrize = 0;

if ( start ) {
  while ( start ) {

    if ( totalPrize === 0 ){
      lastNumber = lastNumberDefault;
      attemptsPrize = attemptsPrizeDefault;
    } else {
      lastNumber += increment;
      attemptsPrize = attemptsPrize.map((prize) => { 
        return prize * prizeMultiplier;
      });
    }
  
    random = Math.floor(Math.random() * (lastNumber - firstNumber + 1)) + firstNumber;

    let attemptsLeft = 3;
    for ( attemptsLeft; attemptsLeft >= 0; attemptsLeft-- ) {
      if ( attemptsLeft === 0 ) {
        totalPrize = 0;
        alert(`Thank you for your participation. Your prize is: ${totalPrize}$`);
        start = confirm('Would you like to play again?');
        break
      }

      let guess = +prompt(`Choose a roulette pocket number from ${firstNumber} to ${lastNumber}
Attempts left: ${attemptsLeft}
Total prize: ${totalPrize}$
Possible prize on current attempt:${attemptsPrize[attemptsLeft-1]}$`,'')

      if ( guess === random ) {
        totalPrize += attemptsPrize[attemptsLeft-1];
        start = confirm(`Congratulation, you won! Your prize is: ${totalPrize}$. Do you want to continue?`);
      }
      if ( guess === random && start ) {
        break
      } else if ( guess === random && !start ) {
        alert(`Thank you for your participation. Your prize is: ${totalPrize}$`);
        start = confirm('Would you like to play again?');
        break
      }
    }
  }
} else {
  alert('You did not become a billionaire, but can')
}

