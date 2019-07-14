function formatTime(number) {
  let days = Math.floor(number/(60*24));
  let hours = Math.floor((number/60) % 24);
  let minutes = Math.floor(number % 60);
  return `${days} day(s) ${hours} hour(s) ${minutes} minute(s).`
}

console.log(formatTime(3601))