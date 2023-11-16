if(document.readyState !== "loading") {
    console.log("loaded");
    initializeCode();
} else {
    document.addEventListener("DOMContentLoaded", function() {
        console.log("not loaded");
        initializeCode()
    })
}

function initializeCode() {
    const addTextButton = document.getElementById("submit-data");
    let i = 0;

    addTextButton.addEventListener("click", function() {
        const nameInput = document.getElementById("input-name");
        const todoInput = document.getElementById("input-task");
        const messageText = document.getElementById("message");
        fetch("http://localhost:3000/todo", {
            method: "post",
            headers: {
                "Content-type": "application/json"
            },
            body: '{ "name": "' + nameInput.value +'",'  + '"todos"' + ': "' + todoInput.value + '"}'
        })
        .then(response => response.json())
        .then(data =>{
            messageText.innerText = data.message;
        })
    })

    const findUserButton = document.getElementById("search");

    findUserButton.addEventListener("click", function() {
        console.log("Hi")
        const nameSearch = document.getElementById("search-name");
        const messageText = document.getElementById("message");
        if(i == 0) {
            let divSave = document.createElement("div");
            divSave.id = "reload";
            document.body.appendChild(divSave);
        }
        fetch("http://localhost:3000/user/" + nameSearch.value)
        .then(response => response.json())
        .then(data =>{
            messageText.innerText = data.name + " " + data.todos;
            let divSave = document.getElementById("reload");
            if (data.name !== "User not found") {
                if (i == 0) {
                    let delBut = document.createElement("button");
                    delBut.id = "delete-user";
                    delBut.innerText = "Delete User";
                    document.body.appendChild(delBut);
                } else {
                    const divSave = document.getElementById("delete-user");
                }
                divSave.innerHTML ="";
                i++;
                for (const element in data.todos) {
                    console.log(element);
                    let todoText = document.createElement("p");
                    todoText.innerText = data.todos[element];
                    let todoBut = document.createElement("button");
                    todoBut.className = "delete-task";
                    todoBut.innerText = "Delete" +" " + data.todos[element];
                    divSave.appendChild(todoText);
                    divSave.appendChild(todoBut);
                    todoBut.addEventListener("click", function() {
                        console.log("Clicked" + element);
                        fetch("http://localhost:3000/user", {
                            method: "put",
                            headers: {
                                "Content-type": "application/json"
                            },
                            body: '{ "name": "' + nameSearch.value +'",'  + '"todos"' + ': "' + element + '"}'
                        })
                        .then(response => response.json())
                        .then(data =>{
                            messageText.innerText = data.message;
                        })
                    })
                }

                // const delTask = document.getElementsByClassName("delete-task");
                const delButton = document.getElementById("delete-user");

                delButton.addEventListener("click", function() {
                    console.log("Hi")
                    const nameSearch = document.getElementById("search-name");
                    const messageText = document.getElementById("message");
                    fetch("http://localhost:3000/user/" + nameSearch.value, {
                        method: "delete",
                        headers: {
                            "Content-type": "application/json"
                        }
                    })
                    .then(response => response.json())
                    .then(data =>{
                        messageText.innerText = data.message;
                    })
                })
                // console.log("");
            }
        })

    })
}