function getMin() {
  let smallest = arguments[0];

  for (let i = 1; i < arguments.length; i++) {
    if (arguments[i] < smallest) {
      smallest = arguments[i]
    }
  }
  
  return smallest
}

console.log(getMin(0, 2, -3))