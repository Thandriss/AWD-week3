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
        fetch("http://localhost:3000/user/" + nameSearch.value)
        .then(response => response.json())
        .then(data =>{
            messageText.innerText = data.name + " " + data.todos;
            if (data.name !== "User not found" && i == 0) {
                let delBut = document.createElement("button");
                delBut.id = "delete-user";
                delBut.innerText = "Delete";
                document.body.appendChild(delBut);
                i++;
            }
        })
    })

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
}