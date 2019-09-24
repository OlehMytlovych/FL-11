$(document).ready(function() {
(function( $ ) {
 
  $.fn.todoList = function( action ){
    function editStorage(action, text) {
      let todolistStorage = JSON.parse(localStorage.getItem('todolist'));
      let itemIndex = todolistStorage.map(e => e.text).indexOf(text);

      localStorage.removeItem('todolist');
      todolistStorage = todolistStorage.filter((elem, index) => index !== itemIndex);

      if (action === 'remark') {
        todolistStorage = todolistStorage.concat({text, done: true});
      }

      localStorage.setItem('todolist', JSON.stringify(todolistStorage));
    }
      switch (action) {
        case 'handleRemove':
          this.on('click', function(e){
            editStorage('remove', e.target.parentElement.querySelector('span').innerHTML)
            e.target.parentElement.remove();
          });
          return this;
        case 'handleDone':
          this.on('click', function(e) {
            editStorage('remark', e.target.parentElement.querySelector('span').innerHTML)
            e.target.style.fontStyle = 'italic';
            e.target.style.textDecoration = 'line-through';
          });
          return this;
        default:
          return this;
      }; 

  };
  }( jQuery ));

  const getTodos = (function() {
    const todos = [
      {
        text: "Buy milk",
        done: false
      },
      {
        text: "Play with dog",
        done: true
      }
    ];

    function createTodos(filtered) {
      const todolistStorage = filtered || JSON.parse(localStorage.getItem('todolist'));
      
      if (todolistStorage) {
        return todolistStorage.map((element) => {
          return generateTodo(element.text, element.done);
        })
      } else {
        return todos.map((element) => {
          return generateTodo(element.text, element.done);
      })
      }
      
    }

    function checkIfUnique(newText) {
      const todolistStorage = JSON.parse(localStorage.getItem('todolist'));
      
      let unique = todolistStorage.map(e => e.text).indexOf(newText) === -1;
      return unique
    }

    function toLocalStorage(newText, done) {
      const todolistStorage = localStorage.getItem('todolist');
      if (todolistStorage) {
        let todolist = JSON.parse(todolistStorage);
        if (checkIfUnique(newText)) {
          todolist = todolist.concat({text : newText, done});
        }
        localStorage.setItem('todolist', JSON.stringify(todolist));
      } else {
        localStorage['todolist'] = JSON.stringify([{text : newText, done}]);
      }
    }

    function generateTodo(newText, done) {
      const text = $("<span></span>").addClass("item-text").text(newText).todoList('handleDone');
      const button = $("<button></button>").addClass("item-remove").text("Remove").todoList('handleRemove');
      const todo = $("<li></li>").addClass("item").append(button);

      if(done) {
        text.addClass('done')
      }
      toLocalStorage(newText, done)
      return todo.prepend(text);
    }  

    function search(value) {
      const $list = $(".list").empty();
      const newListTodisplay = JSON.parse(localStorage.getItem('todolist')).filter(e => e.text.toLowerCase().includes(value.toLowerCase()));
      $list.append(getTodos.createTodos(newListTodisplay));
    }

    return {
      createTodos,
      generateTodo,
      checkIfUnique,
      search
    }
  })()



  const init = (function(){
    const $list = $(".list");
    const $input = $("#add-input");
    const $searchInput = $("#search-input");
    const $add = $("#add-submit");
    let newTodoText;

    $searchInput.on('input', function(e) {
      getTodos.search(e.target.value);
    })

    $add.on("click", function(e) {
      e.preventDefault();
      newTodoText = $input.val();
      if (getTodos.checkIfUnique(newTodoText)) {
        $list.append(getTodos.generateTodo(newTodoText, false));
      }
    });
    $list.append(getTodos.createTodos());
  })();
})




