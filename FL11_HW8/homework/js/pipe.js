function addOne(x){
  return x + 1
}

function pipe() {
  let sum = arguments[0];

  for (let func = 1; func < arguments.length; func++) {
    sum = arguments[func](sum)
  }

  return sum
}

console.log(pipe(1, addOne, addOne))