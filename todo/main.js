
//array of todo items
// let todoList = [
  // {todo: "eat Grapes", checked: false, id: 111},
  // {todo: "go to school", checked: false, id: 222 },
  // {todo: "do work", checked: false, id: 333 } 
// ];
function getTodoList() {
  todoList = JSON.parse(window.localStorage.getItem("todoList"));
  console.log("starting to do list: ", todoList);
  return todoList;
}

function writeTodoList(todoList) {
  window.localStorage.setItem("todoList", JSON.stringify(todoList));
}

todoList = [];
todoList = getTodoList();
renderAll();

// add an event listening to the button
submitTodo = document.getElementById("submitTodo");
submitTodo.addEventListener('click', getNewTodo);

/*******************************************
 * Get new todo from input
 ******************************************/
function getNewTodo() {
  //get value inside input field
  newTodo = document.getElementById('js-todo-input');
  const text = newTodo.value.trim();
  
  // if value not blank, call addTodo. Reset input field to blank. 
  if (text !== '') {
    console.log("text extracted: ", text);
    addTodo(text);
    newTodo.value = '';
    newTodo.focus();
  }
};

/*************************************
 * Add new todo to the todoList array
 *************************************/
function addTodo(text) {
    const todo = {
      todo: text,
      checked: false,
      id: Date.now(), 
    };
     
    todoList.push(todo);
    writeTodoList(todoList);
    console.log("todoList in addTodo: ", todoList);
    //render the new item since existing ones are already displayed. 
    renderAll();
  }

  /***************************
   * Render the Todo List
  ****************************/
  function renderAll() {
    //clear current todo list
    document.getElementById("js-todo-list").innerHTML = "";
    console.log("todo list in render: ", todoList);
    //display each item. Need each item to be displayed with a hidden value as an ID. 
    if (todoList != null) {  
      todoList.forEach((item) => { 
        if (item.checked == true) {
          document.getElementById('js-todo-list').innerHTML += `
          <li class="js-todo-item checked" id="js-todo-item"> ${item.todo}
          <span class="delete-todo" id="delete-todo">\u00D7</span>
          <input type="hidden" id="todo_id" value="${item.id}">
          <input type="hidden" id="todo_name" value="${item.todo}">
          </li>`;
        } else {
          document.getElementById('js-todo-list').innerHTML += `
          <li class="js-todo-item" id="js-todo-item"> ${item.todo}
          <span class="delete-todo" id="delete-todo">\u00D7</span>
          <input type="hidden" id="todo_id" value="${item.id}">
          <input type="hidden" id="todo_name" value="${item.todo}">
          </li>`;
        }
          //console.log("Id in loop: ", item.id);
      }); 
    }
  }

  function renderCompleted() {
    getTodoList();
    document.getElementById("js-todo-list").innerHTML = "";
    todoList.forEach((item) => {
      if (item.checked == true) {

        document.getElementById('js-todo-list').innerHTML += `
        <li class="js-todo-item checked" id="js-todo-item"> ${item.todo}
        <span class="delete-todo" id="delete-todo">\u00D7</span>
        <input type="hidden" id="todo_id" value="${item.id}">
        <input type="hidden" id="todo_name" value="${item.todo}">
        </li>`;
      }
    });
  }
 

  // Select the form element
const form = document.querySelector('.js-form');
// Add a submit event listener
form.addEventListener('submit', event => {

  // prevent page refresh on form submission. code breaks without this line
  event.preventDefault();
});

/**********************************************
 * Function for any clickable action
 **********************************************/
listItem = document.getElementById("js-todo-list"); //select the whole UL

listItem.addEventListener('click', event => {

  console.log("original event id: ", event.target.id);
  /*If event id is the list item, add the checked class to it*/
  if (event.target.id === "js-todo-item") {
    event.target.classList.toggle('checked');
    todoName = event.target.children[2].value.toString();
    index = todoList.findIndex(todo => {
      return todo.todo === todoName;
    })
    console.log("here is todo name: ", todoName);
    console.log("here is index: ", index);

    console.log("Before: ", todoList[index].checked);
    if (todoList[index].checked === false)
    {
      todoList[index].checked = true;
    }
    else {
      todoList[index].checked = false;
    }

    writeTodoList(todoList); 
    console.log("After: ", todoList[index].checked);

  }
  /*If the event id is the delete span, then find the index and delete from array */
  else if (event.target.id === "delete-todo") { 

    //get hidden ID value and find it in the array. 
    idValue = parseInt(event.target.parentElement.children[1].value);
    index = todoList.findIndex(matchId);

    console.log("Id value in delete function: ", idValue);
    console.log("Index in delete function: ", index);
    //couldn't get this to work with an arrow function, not sure why. 
    function matchId(todo) {
      console.log("match function todoId: ", todo.id);
      console.log("match IdValue: ", idValue);
      return todo.id === idValue;
    } 

    todoList.splice(index, 1);
    renderAll();
  } 
  else {
    console.log("Selection failed");  
  }

})

displayCompleted = document.getElementById("displayCompleted");
displayCompleted.addEventListener('click', event => {
  renderCompleted();
});


displayAll = document.getElementById("displayAll");
displayAll.addEventListener('click', event => {
  renderAll();
});
 