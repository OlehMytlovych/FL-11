(() => {
  document.querySelector('#btnConfirmPlay').addEventListener('click', (e) => {
    const startWindow = e.target.parentElement;
    const playWindow = document.querySelector('.game');

    startWindow.style.display = 'none';
    playWindow.style.display = 'block';
  })

  document.querySelector('#btnRejectPlay').addEventListener('click', (e) => {
    const startWindow = e.target.parentElement;
    const playWindow = document.querySelector('.byeBye');

    startWindow.style.display = 'none';
    playWindow.style.display = 'block'
  })
})()