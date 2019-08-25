//in this HW were used standart XMLHttpRequest(), fetch() and async/await to practise sending requests

let fetchedUsers;

document.querySelector('#userGetterBtn').addEventListener('click', (e)=> {
  getUsers('https://jsonplaceholder.typicode.com/users');
  e.target.setAttribute('disabled', 'disabled');
})


//Requests
function getUsers(url) {
  openModal();
  fetch(url)
    .then(resp => resp.json())
    .then(usersArray => {
      createList(usersArray);
      closeModal();
    })
}

function getRandomCat(userId) {
  openModal();
  fetch('https://api.thecatapi.com/v1/images/search?format=json&size=small&mime_types=jpg,png')
    .then(resp => resp.json())
    .then(item => {
      createImage(item[0]['url'], userId);
      closeModal();
    })
}

function sendDeleteRequest(id) {
  openModal();
  const request = new XMLHttpRequest();

  request.open('DELETE', `https://jsonplaceholder.typicode.com/users/${id}`);
  request.send();
  request.onload = function () {
    if (request.status === 200) {
      closeModal();
      alert(`User has been deleted, response status: ${request.status}`);
    } else {
      alert(request.statusText);
    }
  }
  
}

async function sendPutRequest(id, data) {
  openModal();
  
  try {
    const resp = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
      method: 'PUT',
      body: data
    });
    closeModal();
    alert(`User has been edited, response status: ${resp.status}`);
  } catch (error) {
    closeModal();
    alert(`ERROR: ${error.stack}`);
  }
}

function getPosts(url ,id) {
  openModal();
  fetch(url)
    .then(resp => {
      return resp.json();
    })
    .then(json => {
      json = Array.from(json);
      return json.filter(userPosts => userPosts.userId == id);
    })
    .then(postsArray => {
      showPosts(postsArray);
      closeModal();
    })
}

function getComments(url) {
  openModal();
  fetch(url)
    .then(resp => resp.json())
    .then(json => {
      json = Array.from(json);
      return json;
    })
    .then(comments => {
      showComments(comments);
      closeModal();
    })
}


//functions to create and display content
function createList(users) {
  fetchedUsers = users;
  
  const list = document.querySelector('#userList');

  users.forEach(user => {
    const listItem = document.createElement('li');
    const userName = document.createElement('span');
    const postsPageLink = document.createElement('a');
    const editBtn = document.createElement('button');
    const deleteBtn = document.createElement('button');

    getRandomCat(user.id);
    
    postsPageLink.innerHTML = user.name;
    
    userName.appendChild(postsPageLink);

    editBtn.innerHTML = 'Edit';
    deleteBtn.innerHTML = 'Delete';
    deleteBtn.classList.add('deleteUserBtn');
    
    listItem.appendChild(userName);
    listItem.appendChild(editBtn);
    listItem.appendChild(deleteBtn);
    listItem.setAttribute('id', user.id);

    list.appendChild(listItem);
  })

  updateEventListeners();
}

function createImage(url, userId) {
  const img = document.createElement('img');
  img.setAttribute('src', url);

  const listItem =  document.getElementById(userId);
  const textElement = listItem.querySelector('span');

  listItem.insertBefore(img, textElement);
}

function createEditArea(id) {
  const editWrapper = document.createElement('div');
  const saveEditBtn = document.createElement('button');
  const currentUser = fetchedUsers.find(user => user.id == id);
  const keys = getDeepKeys(currentUser);
  const values = getDeepValues(currentUser);

  editWrapper.classList.add('editWrapper');
  editWrapper.style.display = 'flex';
  
  saveEditBtn.innerHTML = 'Save Changes';

  function getDeepKeys(obj) {
    let keys = [];
    for(let key in obj) {
      if(typeof obj[key] === "object") {
          let subKeys = getDeepKeys(obj[key]);
          keys = keys.concat(subKeys.map(subKey => key + "." + subKey));
      } else {
        keys.push(key);
      }
    }
    return keys;
  }
  function getDeepValues(obj) {
    let values = [];
    for(let key in obj) {
        
        if(typeof obj[key] === "object") {
            let subValues = getDeepValues(obj[key]);
            values = values.concat(subValues.map(subValue => subValue));
        } else {
          values.push(obj[key]);
        }
    }
    return values;
  }

  for (let i = 0; i < keys.length; i++) {
    const formGroup = document.createElement('div');
    const label = document.createElement('label');
    const input = document.createElement('input');

    label.innerHTML = keys[i];
    input.setAttribute('placeholder', values[i]);
    input.classList.add(`editInput${id}`);

    formGroup.appendChild(label);
    formGroup.appendChild(input);

    editWrapper.appendChild(formGroup);
  }

  editWrapper.appendChild(saveEditBtn);
  document.getElementById(id).appendChild(editWrapper);
}

function showPosts(posts) {
  const postsBlock = document.getElementById('postBlock');
  const backBtn = document.createElement('button');
  backBtn.innerHTML = 'Go Back';

  postsBlock.appendChild(backBtn);

  backBtn.addEventListener('click', () => {
    postsBlock.style.display = 'none';
    document.getElementById('listBlock').style.display = 'block';
    postsBlock.innerHTML = '';//clean the block, so every time we click "name" we see new posts
  })

  for (let i = 0; i < posts.length; i++) {
    const post = document.createElement('section');
    const postSection = document.createElement('div');
    const title = document.createElement('h3');
    const text = document.createElement('p');

    post.classList.add('post');

    title.innerHTML = posts[i]['title'];
    text.innerHTML = posts[i]['body'];

    post.appendChild(title);
    post.appendChild(text);

    postSection.classList.add('postSection');
    postSection.setAttribute('id', posts[i]['id']);
    
    postSection.appendChild(post);
    postsBlock.appendChild(postSection);

  }
}

function showComments(allComments) {
  const postSections = Array.from(document.querySelectorAll('.postSection'));
  
  for (let i = 0; i < postSections.length; i++) {
    const currentPost = postSections[i];
    const currentCommentSection = document.createElement('div');
    const currentPostId = currentPost.getAttribute('id');
    const commetsWithId = allComments.filter(comment => {
      return comment['postId'] == currentPostId;
    })

    for (let i = 0; i < commetsWithId.length; i++) {
      const currentComment = document.createElement('div');
      const name = document.createElement('h5');
      const text = document.createElement('p');

      name.innerHTML = commetsWithId[i]['name'];
      text.innerHTML = commetsWithId[i]['body'];
      
      currentComment.appendChild(name);
      currentComment.appendChild(text);
      currentCommentSection.appendChild(currentComment);
    }

    currentCommentSection.classList.add('commentSection');
    currentPost.appendChild(currentCommentSection);
  }
}



function updateEventListeners() {
  document.querySelector('ul').addEventListener('click', function (e) {

    const target = e.target;
    if (target.innerHTML === 'Edit') {
      const currentEditor = target.parentElement.querySelector('.editWrapper') || null;
      if (currentEditor && currentEditor.style.display === 'flex'){
        currentEditor.style.display = 'none';
      } else if (currentEditor) {
        currentEditor.style.display = 'flex';
      } else {
        const userId = target.parentElement.getAttribute('id');
        createEditArea(userId);
      }
    }

    if (target.innerHTML === 'Delete') {
      const userId = target.parentElement.getAttribute('id');
      const currentListItem = document.getElementById(userId);
      
      document.querySelector('#userList').removeChild(currentListItem);

      if (document.querySelector('#userList').children.length == 0) {
        document.getElementById('userGetterBtn').removeAttribute('disabled');
      }
      
      sendDeleteRequest(userId);
    }

    if (target.localName === 'a') {
      if (document.getElementById('postBlock').children.length === 0){
        document.getElementById('listBlock').style.display = 'none';
        document.getElementById('postBlock').style.display = 'block';

        const userId = target.parentElement.parentElement.getAttribute('id');

        getPosts('https://jsonplaceholder.typicode.com/posts', userId);
        getComments('https://jsonplaceholder.typicode.com/comments', userId)
      }
    }

    if (target.innerHTML === 'Save Changes') {
      const currentEditor = target.parentElement.parentElement.querySelector('.editWrapper');
      currentEditor.style.display = 'none';
      
      const currentId = currentEditor.parentElement.getAttribute('id');
      
      let inputs = document.querySelectorAll(`.editInput${currentId}`);
      inputs = Array.from(inputs);
      
      const newData = [];

      for (let i = 0; i < inputs.length; i++) {
        if (inputs[i].value) {
          const prop = inputs[i].previousElementSibling.innerHTML;
          const value = inputs[i].value;
          
          newData.push({[prop] : value});
        }
      }

      if (newData.length > 0) {
        sendPutRequest(currentId, newData);
      }
    }
  })
}


//the spinner
function openModal() {
  document.getElementById('modal').style.display = 'block';
}
function closeModal() {
  document.getElementById('modal').style.display = 'none';
}