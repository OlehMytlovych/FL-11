const rootNode = document.getElementById('root');

let id = 0
function generateId() {
  id++
  return +id
}

//the whole page is created using these four functions
createMainPage()
createAddItemPage()
createModifyPage()
createCustomAlert()

//the following functions are called only once
function createMainPage() {
  const mainPage = document.createElement('div')
  const headingWrapper = document.createElement('div');
  const header = document.createElement('h1');
  const addItemBtn = document.createElement('button');
  const listIsEmpty = document.createElement('p');
  let list = document.createElement('div');

  mainPage.classList.add('mainPage')

  headingWrapper.classList.add('headingWrapper')
  headingWrapper.appendChild(header);
  headingWrapper.appendChild(addItemBtn);
  headingWrapper.appendChild(listIsEmpty);

  header.innerHTML = 'Simple TODO application';

  addItemBtn.classList.add('addItemBtn')
  addItemBtn.innerHTML = 'Add new task';

  listIsEmpty.classList.add('emptyListText')
  listIsEmpty.innerHTML = 'TODO is empty';

  mainPage.appendChild(headingWrapper);

  list.classList.add('list')
  if (localStorage.length && localStorage.getItem(0)) {
    mainPage.appendChild(processLocalStorage(list))
    listIsEmpty.style.visibility = 'hidden'
  } else {
    mainPage.appendChild(list)
  }

  rootNode.appendChild(mainPage)
  location.hash = 'main_page'
}
function createAddItemPage() {
  const mainWpapper = document.createElement('div');
  const header = document.createElement('h2');
  const input = document.createElement('input');
  const cancelBtn = document.createElement('button');
  const SaveBtn = document.createElement('button');

  mainWpapper.classList.add('addItemPage');
  mainWpapper.style.display = 'none';

  header.innerHTML = 'Add task';
  header.style.textAlign = 'center';

  input.classList.add('addItemPage-input')
  input.style.width = '100%'

  cancelBtn.innerHTML = 'Cancel';
  cancelBtn.classList.add('addItemPage-cancelBtn')

  SaveBtn.innerHTML = 'Save changes';
  SaveBtn.style.float = 'right';
  SaveBtn.classList.add('addItemPage-saveBtn')

  mainWpapper.appendChild(header);
  mainWpapper.appendChild(input);
  mainWpapper.appendChild(cancelBtn);
  mainWpapper.appendChild(SaveBtn)
  rootNode.appendChild(mainWpapper)
}
function createModifyPage() {
  const mainWpapper = document.createElement('div');
  const header = document.createElement('h2');
  const input = document.createElement('input');
  const cancelBtn = document.createElement('button');
  const SaveBtn = document.createElement('button');
  
  mainWpapper.classList.add('modifyItemPage');
  mainWpapper.style.display = 'none';
  
  header.innerHTML = 'Modify item';
  header.style.textAlign = 'center';
  
  input.classList.add('modifyItemPage-input')
  input.style.width = '100%'
  
  cancelBtn.innerHTML = 'Cancel';
  cancelBtn.classList.add('modifyItemPage-cancelBtn')
  
  SaveBtn.innerHTML = 'Save changes';
  SaveBtn.style.float = 'right';
  SaveBtn.classList.add('modifyItemPage-saveBtn')
  
  mainWpapper.appendChild(header);
  mainWpapper.appendChild(input);
  mainWpapper.appendChild(cancelBtn);
  mainWpapper.appendChild(SaveBtn)
  rootNode.appendChild(mainWpapper)
}
function createCustomAlert() {
  const container = document.createElement('div');
  const header = document.createElement('h3');
  const alertText = document.createElement('p');
  
  alertText.classList.add('alertText');
  
  header.innerHTML = 'Error!';
  
  container.style.display = 'none';
  container.classList.add('customAlert');
  container.appendChild(header);
  container.appendChild(alertText);
  
  if (isChrome()) {
    container.style.left = '10px'
  } else {
    container.style.right = '10px'
  }

  rootNode.appendChild(container)
}
//this function is called once from the createMainPage function
function processLocalStorage(list) {
  const localStorageArr = Array.from(localStorage)
  for (let i = 0; i < localStorageArr.length && localStorageArr[i]; i++) {
    const parsedItem = JSON.parse(localStorage[i]);
    list.appendChild(createNewItem(parsedItem))
  }
  return list
}
//this function is called once from the customAlert function
function isChrome() {
  const isChromium = window.chrome;
  const winNav = window.navigator;
  const vendorName = winNav.vendor;
  const isOpera = typeof window.opr !== 'undefined';
  const itemDoesntExist = -1
  const isIEedge = winNav.userAgent.indexOf('Edge') > itemDoesntExist;
    
  if(
    isChromium !== null &&
    typeof isChromium !== 'undefined' &&
    vendorName === 'Google Inc.' &&
    isOpera === false &&
    isIEedge === false
    ) {
      return true
    } else { 
      return false
    }
}

//these two funstions are called when the page is being created and from event handlers
function createNewItem(inputValue) {
  const newItem = document.createElement('div');
  const checkBox = document.createElement('img');
  const text = document.createElement('p');
  const remover = document.createElement('img');

  newItem.classList.add('item');
  newItem.setAttribute('id', generateId())

  checkBox.setAttribute('src', './assets/img/todo-s.png');
  checkBox.classList.add('checkbox');

  text.innerHTML = inputValue;
  text.classList.add('item-text')

  remover.setAttribute('src', './assets/img/remove-s.jpg');
  remover.classList.add('remover')

  if (typeof inputValue === 'object') {
    if (inputValue.isDone){
      checkBox.setAttribute('src', './assets/img/done-s.png');
      newItem.style.backgroundColor = 'lightgrey'
    }
    text.innerHTML = inputValue.description;
  }

  newItem.appendChild(checkBox);
  newItem.appendChild(text);
  newItem.appendChild(remover);

  return newItem
}
function addItem(inputValue) {
  const list = document.querySelector('.list');
  const numberOfItems = Array.from(document.querySelectorAll('.item')).length;
  const checkedItemExists = document.querySelector('div > img[src="./assets/img/done-s.png"]');

  if ( numberOfItems === 0 || !checkedItemExists) {
    list.appendChild(createNewItem(inputValue))
  } else {
    const checkedItem = document.querySelector('div > img[src="./assets/img/done-s.png"]').parentElement;
    list.insertBefore(createNewItem(inputValue), checkedItem)
  }

  document.querySelector('.emptyListText').style.visibility = 'hidden'
}
//this function is called from the mouseleave handler
function editLocalStorage() {
  const listOfItems = Array.from(document.querySelectorAll('.item'));
  let itemValues = [];
  
  for (let i = 0; i < listOfItems.length; i++) {
    let checkBox = !!listOfItems[i].querySelector('img[src="./assets/img/done-s.png"]');
    let text = listOfItems[i].querySelector('p').innerHTML;
    itemValues.push({'isDone': checkBox, 'description': text})
  }
    
  localStorage.clear()
  for (let i = 0; i < itemValues.length; i++) {
    let currentObj = JSON.stringify(itemValues[i]);
    localStorage.setItem(i, currentObj)
  }
}


document.querySelector('.list').addEventListener('click', function(e) {
  if (e.target && e.target.matches('img.remover')) {
    const listItem = e.target.parentElement;
    document.querySelector('.list').removeChild(listItem);

    const numberOfItems = Array.from(document.querySelectorAll('.item')).length;
    if (numberOfItems === 0) {
      document.querySelector('.emptyListText').style.visibility = 'visible'
    }
  }

  if (e.target && e.target.matches('img.checkbox')) {
    if (e.target.getAttribute('src') === './assets/img/todo-s.png') {
      const checkBox = e.target;
      const currentItem = e.target.parentElement
      
      checkBox.setAttribute('src', './assets/img/done-s.png');
      currentItem.style.backgroundColor = 'lightgrey';
      document.querySelector('.list').appendChild(currentItem);
    } else {
      const checkedCheckBox = e.target;
      const currentItem = e.target.parentElement;
      const firstCheckedItem = document.querySelector('div > img[src="./assets/img/done-s.png"]').parentElement
      
      checkedCheckBox.setAttribute('src', './assets/img/todo-s.png');
      currentItem.style.backgroundColor = 'inherit';
      document.querySelector('.list').insertBefore(currentItem, firstCheckedItem)
    }
  }

  if (e.target && !e.target.matches('img.checkbox') && !e.target.matches('img.remover')) {
    const currentItem = e.target.parentElement === document.querySelector('.list') ? e.target : e.target.parentElement;
    const itemChecked = currentItem.querySelector('img[src="./assets/img/done-s.png"]');

    if (itemChecked) {
      document.querySelector('.alertText').innerHTML = `You can't edit already done item.`
      document.querySelector('.customAlert').style.display = 'block';
      const visibilityTime = 2000;
      setTimeout(() => {
        document.querySelector('.customAlert').style.display = 'none';
      }, visibilityTime)  
      console.log(currentItem)
    } else {
      let currentItemId = currentItem.getAttribute('id');
      location.hash = `modify_item_page/item:${currentItemId}`;
    }
    
  }
})
document.querySelector('.addItemBtn').addEventListener('click', function() {
  location.hash = 'add_new_item_page';
})

document.querySelector('.addItemPage-cancelBtn').addEventListener('click', function() {
  location.hash = 'main_page'
})
document.querySelector('.addItemPage-saveBtn').addEventListener('click', function() {
  const input = document.querySelector('.addItemPage-input').value;
  const arrayOfExistingTexts = Array.from(document.querySelectorAll('.item-text'));
  let itemIsUnique = true;
  
  for (let i = 0; i < arrayOfExistingTexts.length; i++) {
    if (arrayOfExistingTexts[i].innerHTML === input) {
      itemIsUnique = false;
      break 
    }
    
  }
  if (input && itemIsUnique) {
    addItem(input)
    location.hash = 'main_page'  
    console.log(arrayOfExistingTexts)
  } else if (input && itemIsUnique === false) {
    document.querySelector('.alertText').innerHTML = `You can't add already existing item.`
    document.querySelector('.customAlert').style.display = 'block';
    const visibilityTime = 2000;
    setTimeout(() => {
        document.querySelector('.customAlert').style.display = 'none';
    }, visibilityTime)

  }
})

document.querySelector('.modifyItemPage-cancelBtn').addEventListener('click', function() {
  location.hash = 'main_page'
})
document.querySelector('.modifyItemPage-saveBtn').addEventListener('click', function() {
  const input = document.querySelector('.modifyItemPage-input').value;
  let currentItemId = [];
    for (let i = 0; i < location.hash.length; i++) {
      let char = parseInt(location.hash[i]);
      if (!isNaN(char)) {
        currentItemId.push(char)  
      }
    }
  currentItemId = currentItemId.join('')

  const currentItem = document.getElementById(currentItemId);
  let currentItemText = currentItem.querySelector('p');
  let arrayOfExistingTexts = Array.from(document.querySelectorAll('.item-text'));
  let itemIsUnique = true;
  
    
  for (let i = 0; i < arrayOfExistingTexts.length; i++) {
    if (arrayOfExistingTexts[i].innerHTML === input) {
      itemIsUnique = false;
      break 
    }
    arrayOfExistingTexts = Array.from(document.querySelectorAll('.item-text'))
  }

  if (input && itemIsUnique) {
    currentItemText.innerHTML = input;
    location.hash = 'main_page'
  } else if (input && itemIsUnique === false) {
    document.querySelector('.alertText').innerHTML = `You can't add already existing item.`
    document.querySelector('.customAlert').style.display = 'block';
    const visibilityTime = 2000;
    
    setTimeout(() => {
        document.querySelector('.customAlert').style.display = 'none';
      }, visibilityTime)
    
  }
}) 

window.addEventListener('hashchange', function() {
  if (this.location.hash === '#add_new_item_page') {
    document.querySelector('.mainPage').style.display = 'none';
    document.querySelector('.addItemPage').style.display = 'block';
  }
  if (this.location.hash.indexOf('#modify_item_page') + 1) {
    document.querySelector('.mainPage').style.display = 'none';
    document.querySelector('.modifyItemPage').style.display = 'block';    
  }
  if (this.location.hash === '#main_page') {
    document.querySelector('.mainPage').style.display = 'block';
    document.querySelector('.addItemPage').style.display = 'none';
    document.querySelector('.modifyItemPage').style.display = 'none';
  }
})

document.querySelector('html').addEventListener('mouseleave', editLocalStorage)


