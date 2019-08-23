//1. find max element in an array
const findMaxElement = arr => {
  return Math.max(...arr);
}

/* console.log(findMaxElement([1,0,-200,-40,50])); */


//2. Copy an array
const copyArray = arr => {
  return [...arr];
}

const arrayToCopy = [1,2,3];
const copiedArray = copyArray(arrayToCopy);
/* console.log(arrayToCopy, copiedArray);
console.log(copiedArray === arrayToCopy); */


//3. enhance element with unique id
const serveEnhancedObj = obj => {
  const newObj = {...obj};
  newObj.uniqueId = Symbol()
  return newObj
}

const objToBeEnhanced = {name:'whiskas'};
const enhancedObj = serveEnhancedObj(objToBeEnhanced);
/* console.log(objToBeEnhanced);
console.log(enhancedObj); */


//4. Write a function which regroups object properties
const regroupObject = obj => {
  const {name, ...rest} = obj;
  const {id, age, university} = rest.details;
  return {university: university, user: {age: age, firstName: name, id: id}};
}

const objToRegroup = {name: 'Someone', details: {id: 1, age: 11, university: 'UNI'}};
/* console.log(regroupObject(objToRegroup)); */


//5. Create a function which finds unique elements in array
const findUniqueElements = arr => {
  const uniqueValues = new Set();

  arr.forEach(element => {
    uniqueValues.add(element);
  });

  return Array.from(uniqueValues);
}

const repeatedValuesArr = [1, 1, 7, 12, 0, 12, 8, 9, 9, 9, 9];
/* console.log(findUniqueElements(repeatedValuesArr)); */


//6. Create a function which masks phone number, leaves only last 4 digits
const hideNumber = number => {
  return number.slice(6).padStart(10, '*');
}

const phoneNumber = '0123456789';
/* console.log(hideNumber(phoneNumber)); */


//7. Create function which has all parameters always required. If they are not - throw error.
const add = (a, b = new Error('Missing property')) => {
  if (isNaN(b)) {
    throw b
  } else {
    return a + b
  }
}

/* console.log(add(1,3));
console.log(add(1)) */

//8. Create a function which calls some API and logs array of ‘name’ fields in alphabetical order.
const getMyReposProm = (url) => {
  fetch(url)
    .then(response => response.json())
    .then(myInfo => {
      const myRepos = myInfo.map(item => item.name);
      console.log(myRepos);
    });
}

/* getMyReposProm(`https://api.github.com/users/OlehMytlovych/repos`); */


//9. Rewrite previous task using async/await instead of promises.
const getMyReposAs = async (url) => {
  try {
    const request = await fetch(url);
    const myInfo = await request.json();
    const myRepos = await myInfo.map(item => item.name)
    console.log(myRepos);
  }
  catch (error) {
    console.log(`ERROR: ${error.stack}`);
  }
}

/* getMyReposAs(`https://api.github.com/users/OlehMytlovych/repos`); */