function reverseNumber(num) {
  let reversed = 0;
  let number = Math.sqrt(num * num);

  while (number) { 
    reversed = reversed * 10;
    reversed = reversed + number % 10;
    number = Math.floor(number / 10);
  }

  if (num < 0){
    reversed = reversed - reversed*2
  }
  return reversed;
}

console.log(reverseNumber(-123))