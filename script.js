// Function that will get toDos 

const apiURL = 'https://jsonplaceholder.typicode.com/todos';

const getTodos = ()=> {
    fetch(apiURL + '?_limit=10') // This will add on url, so it will limit in to just 10 to dos
    .then(res => res.json())
    .then(data=> {
        data.forEach((todo)=> addTodoToDOM(todo))
    });
}

const addTodoToDOM = (todo) => {
    const div = document.createElement('div');
    div.classList.add('todo');
    div.appendChild(document.createTextNode(todo.title));
    div.setAttribute('data-id', todo.id); // with this I set each todo element ID, and its
// id='1', then 2....

    if(todo.completed) {
        div.classList.add('done');
    }
    document.querySelector('#todo-list').appendChild(div);
}

const createTodo = e => {
    e.preventDefault();
    // console.log(e.target.firstElementChild.value) shows what we entered in the input
    const newTodo = {
        title: e.target.firstElementChild.value,
        completed: false
    }

    fetch(apiURL,{
        method: 'POST', // we want the method to be POST
        body: JSON.stringify(newTodo), //the body we want to send it as a JSON string and then pass in the
// the new to-do object so that will get sent in the body
        headers: { // for headers we are gonna add an object of content, and the content we are sending is application
            'Content-Type': 'application/json'
        }
    })
    .then(res=> res.json())
    .then(data=> addTodoToDOM(data))
}

const toggleCompleted = e => {
    if(e.target.classList.contains('todo')){
        e.target.classList.toggle('done');
    }
}

const init = () => {
    document.addEventListener('DOMContentLoaded', getTodos);
    document.querySelector('#todo-form').addEventListener('submit', createTodo);
    document.querySelector('#todo-list').addEventListener('click', toggleCompleted);


}

init();