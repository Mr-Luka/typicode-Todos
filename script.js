// Function that will get toDos 

const apiURL = 'https://jsonplaceholder.typicode.com/todos';

const getTodos = ()=> {
    fetch(apiURL + '?_limit=5') // This will add on url, so it will limit in to just 5 to dos
    .then(res => res.json())
    .then(data=> {
        data.forEach((todo)=> addTodoToDOM(todo))
    });
}

const addTodoToDOM = (todo) => {
    const div = document.createElement('div');
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
        method: 'POST',
        body: JSON.stringify(newTodo),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(res=> res.json())
    .then(data=> addTodoToDOM(data))
}

const init = () => {
    document.addEventListener('DOMContentLoaded', getTodos);
    document.querySelector('#todo-form').addEventListener('submit', createTodo);

}

init();