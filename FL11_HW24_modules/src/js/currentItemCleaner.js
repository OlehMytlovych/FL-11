export const cleanCurrentItem = () => {
  const enemyBoard = document.getElementById('enemyItem');
  const enemyPictureChosen = enemyBoard.querySelector('img');

  if (enemyPictureChosen) {
    const playerBoard = document.getElementById('playerItem');
    const playerPictureChosen = playerBoard.querySelector('img');
    
    enemyBoard.removeChild(enemyPictureChosen);
    playerBoard.removeChild(playerPictureChosen);
  }
}