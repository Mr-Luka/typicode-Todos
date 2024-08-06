// Function that will get toDos 

const apiURL = 'https://jsonplaceholder.typicode.com/todos';

const getTodos = ()=> {
    fetch(apiURL + '?_limit=5') // This will add on url, so it will limit in to just 5 to dos
    .then(res => res.json())
    .then(data=> {
        data.forEach((todo)=> {
            const div = document.createElement('div');
            div.appendChild(document.createTextNode(todo.title));

            if(todo.completed) {
                div.classList.add('done');
            }

            document.querySelector('#todo-list').appendChild(div);
        })
    });
}

getTodos();