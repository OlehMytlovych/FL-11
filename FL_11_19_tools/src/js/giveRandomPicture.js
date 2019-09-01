export const giveRandomPicture = () => {
  const items = ['paper', 'rock', 'scissors'];
  const randomNum = Math.floor(Math.random() * Math.floor(3));
  const name = items[randomNum];

  const pic = document.createElement('img');
  pic.setAttribute('src', `./img/${name}.png`);
  pic.classList.add('item');
  return [name, pic];
};