const create = function(newPrototype, propertiesObject) {
  function F() {
    if (propertiesObject) {
      let newObj = {}

      for (let propName in propertiesObject) {

        if(Object.prototype.hasOwnProperty.call(propertiesObject, propName)) {
        
          for (let propValue in propertiesObject[propName]) {

            if(Object.prototype.hasOwnProperty.call(propertiesObject[propName], propValue)) {
            
              newObj[propName] = propertiesObject[propName][propValue]
            }
          }
        }
      }
      return newObj
    }
  }

  let newObj = new F();
  newObj.__proto__ = newPrototype;
  return newObj 
}


//1 check
/* const obj1 = { prop: 5 };
const obj2 = create(obj1);

console.log(Object.getPrototypeOf(obj2) === obj1); // => true
console.log(obj2.prop); // => 5 */

//2 check
/* const animal = {
  sayName() {
    return this.name;
  }
};

const cat = create(animal, {
  name: {
    value: 'Sam'
  },
  age: {
    value: '3 years'
  }
});

console.log(cat)
console.log(cat.sayName()) // logs "Sam"
console.log(Object.getPrototypeOf(cat) === animal)//true */
