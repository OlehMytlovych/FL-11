//the function us envoked here because it's used only once when the game is being created
(() => {
  document.querySelector('#btnGoBack').addEventListener('click', (e) => {
    const endWindow = e.target.parentElement;
    const playWindow = document.querySelector('.game');

    endWindow.style.display = 'none';
    playWindow.style.display = 'block'
  })
})()