let a = parseFloat(prompt('enter a side', '').replace(',', '.')),
    b = parseFloat(prompt('enter b side', '').replace(',', '.')),
    c = parseFloat(prompt('enter c side', '').replace(',', '.'));

if (isNaN(a) ||
    isNaN(b) ||
    isNaN(c)){
  console.log('All values must be number');
} else if (a + b <= c ||
           b + c <= a ||
           c + a <= b) {
  console.log('Triangle doesn’t exist');
} else if (a === b && b === c && c === a) {
  console.log('Equivalent triangle');
} else if (a === b || b === c || a === c) {
  console.log('Isosceles triangle');
} else {
  console.log('Normal triangle');
}
