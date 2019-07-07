let a1 = parseFloat(prompt('Enter a1', '').replace(',', '.')), 
    a2 = parseFloat(prompt('Enter a2', '').replace(',', '.')),
    b1 = parseFloat(prompt('Enter b1', '').replace(',', '.')),
    b2 = parseFloat(prompt('Enter b2', '').replace(',', '.')),
    c1 = parseFloat(prompt('Enter c1', '').replace(',', '.')),
    c2 = parseFloat(prompt('Enter c2', '').replace(',', '.'));

if(isNaN(a1) || isNaN(a2) ||
   isNaN(b1) || isNaN(b2) ||
   isNaN(c1) || isNaN(c2)) {

    console.log('All values must be numbers');
    console.log(false);

} else if (a1 === a2 && a2 === b1 && b1 === b2 && b2 === c1 && c1 === c2) {
   console.log(false);
} else {
   console.log(b1 - c1 === c1 - a1 && b2 - c2 === c2 - a1); 
}

console.log(a1)
console.log(a2)
console.log(b1)
console.log(b2)
console.log(c1)
console.log(c2)