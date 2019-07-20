let rootNode = document.getElementById('root');
rootNode.style.margin = '0 5%';
document.body.style.color = '#41b5fe';
let createdList = createList();

function createList () {
  const header = document.createElement('h1');
  header.textContent = 'TODO Cat List';
  header.style.textAlign = 'center';

  rootNode.appendChild(header);

  const notification = document.createElement('p');
  notification.innerHTML = 'Maximum item per list are created';
  notification.style.textAlign = 'center';
  notification.style.visibility = 'hidden';

  rootNode.appendChild(notification);

  const adder = document.createElement('div');
  adder.style.display = 'flex';
  adder.style.alignItems = 'center';

  rootNode.appendChild(adder)

  const adderInput = document.createElement('input');
  adderInput.style.width = '85%';
  adderInput.style.padding = '15px';
  adderInput.style.borderRadius = '3px';
  adderInput.style.border = '1px solid #c8d0d8'
  adderInput.setAttribute('placeholder', 'Add new action');
  
  adder.appendChild(adderInput);

  const adderImage = document.createElement('i');
  adderImage.classList.add('material-icons');
  adderImage.innerHTML = 'add_box';
  adderImage.style.color = '#c8d0d8';
  adderImage.style.fontSize = '40px';
  adderImage.style.margin = '0 auto';
  adderImage.style.cursor = 'pointer';

  adder.appendChild(adderImage);

  const line = document.createElement('hr');
  line.style.border = '3px solid #e4f2fe';
  line.style.marginTop = '15px';
  line.style.marginBottom = '15px';

  rootNode.appendChild(line)

  const list = document.createElement('div');
  list.style.margin = 'auto 0';
  list.classList.add('list');

  rootNode.appendChild(list);

  return {
    notification: notification,
    adderInput: adderInput,
    adderImage: adderImage,
    list: list
  }
}

function createEditImage() {
  let editImage = document.createElement('i');
  editImage.classList.add('material-icons');
  editImage.classList.add('edit')
  editImage.innerHTML = 'create';
  editImage.style.color = '#89c4f4';
  editImage.style.fontSize = '35px';
  editImage.style.margin = '0 auto 0 0';
  editImage.style.cursor = 'pointer';

  return editImage
}

function createDeleteImage() {
  let deleteImage = document.createElement('i')
  deleteImage.classList.add('material-icons');
  deleteImage.classList.add('delete')
  deleteImage.innerHTML = 'delete';
  deleteImage.style.color = '#89c4f4';
  deleteImage.style.fontSize = '35px';
  deleteImage.style.margin = '0 0 0 auto';
  deleteImage.style.cursor = 'pointer';

  return deleteImage
}

function createSaveImage() {
  let changeSaver = document.createElement('i')
  changeSaver.classList.add('material-icons');
  changeSaver.classList.add('save');
  changeSaver.innerHTML = 'save';
  changeSaver.style.color = '#89c4f4';
  changeSaver.style.fontSize = '35px';
  changeSaver.style.margin = '0 0 0 10px';
  changeSaver.style.cursor = 'pointer';

  return changeSaver
}

function createNewItem(action) {
  let newItemWrapper = document.createElement('div');
  let newItem = document.createElement('div');
  let itemEditor = createItemEditor();
  let checkBox = document.createElement('input');
  let newAction = document.createElement('p');

  checkBox.setAttribute('type', 'checkbox');
  checkBox.style.width = '20px';
  checkBox.style.height = '20px';
  checkBox.style.border = '1px solid #aaaaaa';

  newAction.textContent = action;
  newAction.style.fontSize = '1.2em'
  newAction.style.margin = '0 10px'

  newItem.appendChild(checkBox)
  newItem.appendChild(newAction)
  newItem.appendChild(createEditImage())
  newItem.appendChild(createDeleteImage())

  newItem.style.display = 'flex';
  newItem.style.alignItems = 'center';

  newItemWrapper.appendChild(newItem);

  itemEditor.style.display = 'none';

  newItemWrapper.classList.add('draggable');
  newItemWrapper.setAttribute('draggable', 'true')
  newItemWrapper.appendChild(itemEditor);
  
  return newItemWrapper  
}
function createItemEditor() {
  let changer = document.createElement('div');
  let changerInput = document.createElement('input');
  
  changer.style.display = 'flex';
  changer.style.alignItems = 'center'

  changerInput.style.width = '40%';
  changerInput.style.padding = '10px';
  changerInput.style.borderRadius = '3px';
  changerInput.style.border = '1px solid #c8d0d8';
  changer.appendChild(changerInput)
   
  changer.appendChild(createSaveImage())

  return changer
}
function addItem() {
  let maxItems = 10;
  if (createdList.list.children.length < maxItems && !!createdList.adderInput.value.match(/.*\S.*/)) {
    let listOfItems = createdList.list;
    let inputValue = createdList.adderInput.value;
    listOfItems.appendChild(createNewItem(inputValue));
    refreshDnDListeners()
  } else if (createdList.adderInput.value.match(/.*\S.*/)) {
    let notification = createdList.notification;
    notification.style.visibility = 'visible'
  }   
}

createdList.adderImage.addEventListener('click', addItem)

document.querySelector('div.list').addEventListener('click', function(e) {
  if (e.target && e.target.matches('input[type=checkbox]')) {
    let checkBox = e.target;
    checkBox.disabled = 'true'
  }

  if (e.target && e.target.matches('i.delete')) {
    let item = e.target.parentElement.parentElement;
    let listOfItems = createdList.list;
    listOfItems.removeChild(item)
    createdList.notification.style.visibility = 'hidden'
  }
  
  if (e.target && e.target.matches('i.edit')) {
    let thisNewItem = e.target.parentElement;
    let thisNewItemEditor = thisNewItem.nextSibling;
    thisNewItemEditor.style.display = thisNewItemEditor.style.display === 'none' ? 'flex' : 'none'
  }

  if (e.target && e.target.matches('i.save')) {
    let thisItemEditor = e.target.parentElement;
    let newValue = thisItemEditor.querySelector('input').value;
    let thisItem = thisItemEditor.previousSibling;
    thisItem.querySelector('p').innerHTML = newValue;
  }
})

//drag and drop

let remove = document.querySelector('.draggable');
let dragSrcEl = null;

function dragStart(e) {
  dragSrcEl = this;
  e.dataTransfer.effectAllowed = 'move';
  e.dataTransfer.setData('text/html', this.innerHTML);
}

function dragOver(e) {
  e.preventDefault();
  e.dataTransfer.dropEffect = 'move';
  return false;
}

function dragDrop(e) {
  if (dragSrcEl !== this) {
    dragSrcEl.innerHTML = this.innerHTML;
    this.innerHTML = e.dataTransfer.getData('text/html');
  }
  let checkBoxes = document.querySelectorAll('input[type=checkbox]')
  for (let i = 0; i < checkBoxes.length - 1; i++) {
    if (checkBoxes[i].getAttribute('disabled') === '') {
      checkBoxes[i].setAttribute('checked', 'checked')
    }
  }
  
  return false;
}

function addEventsDragAndDrop(el) {
  el.addEventListener('dragstart', dragStart, false);
  el.addEventListener('dragover', dragOver, false);
  el.addEventListener('drop', dragDrop, false);
}

function refreshDnDListeners() {
  let listItens = document.querySelectorAll('.draggable');
  [].forEach.call(listItens, function(item) {
    addEventsDragAndDrop(item);
  });
}