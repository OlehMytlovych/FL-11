const assign = function(initialObj) {
  // I used the old way here, also I could use the rest operator that comes with es6
  let rest = Array.from(arguments).slice(1) 
  
  for (let obj of rest) {
    for (let property in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, property)) {
        initialObj[property] = obj[property]
      }
    }
  }

  return initialObj
}
//1 check
/* const defaults = { a: 123, b: 777 };
const options = { a: 456 };
const configs = assign({}, defaults, options); // => {a: 456, b: 777}
console.log(configs) */

//2 check
/* const o1 = { a: 1, b: 1, c: 1 };
const o2 = { b: 2, c: 2 };
const o3 = { c: 3 };
const obj = assign({}, o1, o2, o3);
console.log(obj); // logs { a: 1, b: 2, c: 3 } */
