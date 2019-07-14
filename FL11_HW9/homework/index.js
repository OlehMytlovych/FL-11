//0
let getNumbers = string => {
  let numbers = [];

  for ( let i = 0; i < string.length; i++ ) {
    if (parseFloat(string[i]) !== ' ' && parseFloat(string[i])/parseFloat(string[i]) === 1) {
      numbers.push(parseFloat(string[i]));
    }
  }
  return numbers
}
console.log(getNumbers('string'));// []
console.log(getNumbers('n1um3ber95'));// [1, 3, 9, 5]

//1
let findTypes = (...args) => {
  let types = {},
      keys = [],
      values = [],
      display = '';

  for (let i = 0; i < args.length; i++) {
    if ( types[typeof args[i]] === undefined ) {
      types[typeof args[i]] = 1 
    } else {
      types[typeof args[i]] += 1    
    }
    
  }

  for (let property in types) {
    if (types.hasOwnProperty(property)) {
        keys.push(property)
      }
  }
  for (let property in types) {
    if (types.hasOwnProperty(property)) {
        values.push(types[property])
      }
  }
  for (let i = 0; i < keys.length; i++) {
    if ( i === 0 ){
        display += '{'
    }
    if ( i < keys.length-1) {
      display += `"${keys[i]}":${values[i]} ;`  
    } else if (i === keys.length-1) {
      display += `"${keys[i]}":${values[i]}}` 
    }
  }
  return display
}
let anotherNumberWrapper = 5;
console.log(findTypes(null, anotherNumberWrapper, 'hello'))
// returns {“object”:1, “number”:1, “string”:1}

//2
let executeforEach = (arr, func) => {
  let newArr = [];
  for ( let i = 0; i < arr.length; i++) {
    newArr.push(func(arr[i]))
  }
  return newArr
}
let executeforEachOne = 1,
executeforEachTwo = 2,
executeforEachThree = 3;
executeforEach([executeforEachOne, executeforEachTwo, executeforEachThree], function(el) { 
  console.log(el)
})// logs 1 2 3


//3
let mapArray = (arr, func) => {
  return executeforEach(arr, func)
}
let mapArrayOne = 2,
mapArrayTwo = 5,
mapArrayThree = 8,
adder = 3;
console.log(mapArray([mapArrayOne, mapArrayTwo, mapArrayThree], function(el) { 
  return el + adder
}))// [5, 8, 11]

//4
let filterArray = (arr, func) => {
  let booleans = executeforEach(arr, func);
  let filtered = []
  for ( let i = 0; i < arr.length; i++) {
    if (booleans[i]) {
      filtered.push(arr[i])
    }
  }
  return filtered
}
let filterArrayOne = 2,
filterArrayTwo = 5,
filterArrayThree = 8,
filterArrayCompareTo = 3;
console.log(filterArray([filterArrayOne, filterArrayTwo, filterArrayThree], function(el) {
  return el > filterArrayCompareTo
}))// [5, 8] 

//5
let showFormattedDate = date => {
    let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    return `Date: ${months[date.getMonth()]} ${date.getDate()} ${date.getFullYear()}`
}
console.log(showFormattedDate(new Date('2019-01-27T01:10:00')))// Date: Jan 27 2019

//6
let canConvertToDate = (date) => {
    date = new Date(date);
    date = '' + date;
    return date !== 'Invalid Date'
}
console.log(canConvertToDate('2016-13-18T00:00:00')); // false
console.log(canConvertToDate('2016-03-18T00:00:00')); // true

//7
let daysBetween = (firstDate, secondDate) => {
  firstDate = firstDate.getTime();
  secondDate = secondDate.getTime();
  let milliseconds = 1000;
  let seconds = 60;
  let minutes = 60;
  let hours = 24;
  return Math.round((secondDate-firstDate)/(milliseconds*seconds*minutes*hours))
}
console.log(daysBetween(new Date('2016-03-18T00:00:00'), new Date('2016-04-19T00:00:00')))//32

//8
let data = [
    {
      '_id': '5b5e3168c6bf40f2c1235cd6',
      'index': 0,
      ' birthday ': '2016-03-18T00:00:00',
      'eyeColor': 'green',
      'name': 'Stein',
      'favoriteFruit': 'apple'
    },
    {
      '_id': '5b5e3168e328c0d72e4f27d8',
      'index': 1,
      ' birthday ': '1991-02-11T00:00:00',
      'eyeColor': 'blue',
      'name': 'Cortez',
      'favoriteFruit': 'strawberry'
    },
    {
      '_id': '5b5e3168cc79132b631c666a',
      'index': 2,
      ' birthday ': '1984-04-17T00:00:00',
      'eyeColor': 'blue',
      'name': 'Suzette',
      'favoriteFruit': 'apple'
    },
    {
      '_id': '5b5e31682093adcc6cd0dde5',
      'index': 3,
      ' birthday ': '1994-04-17T00:00:00',
      'eyeColor': 'green',
      'name': 'George',
      'favoriteFruit': 'banana'
    }
  ]
  
let getAmountOfAdultPeople = (allPeople) => {
  let amount = 0;
  let adultYears = 18;
  let daysInYear = 365;
  
  
  for (let person = 0; person < allPeople.length; person++) {
    let personAge = Math.floor(daysBetween(new Date(allPeople[person][' birthday ']), new Date())/daysInYear)
    if ( personAge >= adultYears ) {
        amount += 1
    }
  }

  return amount
}
console.log(getAmountOfAdultPeople(data))// 3
 
//9
let keys = (obj) => {
  let keys = [];

  for (let property in obj) {
    if (obj.hasOwnProperty(property)) {
        keys.push(property)
      }
  }

  return keys
}
console.log(keys({keyOne: 1, keyTwo: 2, keyThree: 3}))// [“keyOne”, “keyTwo”, “keyThree”]

//10
let values = (obj) => {
    let values = [];

    for (let property in obj) {
      if (obj.hasOwnProperty(property)) {
          values.push(obj[property])
        }
    }
  
    return values  
}

console.log(values({keyOne: 1, keyTwo: 2, keyThree: 3}))// [1, 2, 3]