var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'My todos' });
});

list = []


router.post("/todo", (req, res) => {
  let flag = false;
  for (let i = 0; i < list.length; i++) {
    if (req.body.name == list[i].name) {
      list[i].todos.push(req.body.todos)
      console.log(req.body.todos)
      flag = true;
      let resultM = {
        message: "Todo added"
      }; 
      res.send(resultM);
    }
  }
  if(flag === false) {
    let todo = []
    todo.push(req.body.todos)
    let result = {
      name: req.body.name,
      todos: todo
    };
    console.log(result);
    list.push(result);
    let resultM = {
      message: "User added"
    };
    res.send(resultM);
  }
})

router.get("/user/:id",(req, res) => {
  let flag = false;
  for (let i = 0; i < list.length; i++) {
    if (req.params.id == list[i].name) {
      flag = true;
      let resultM = {
        name: list[i].name,
        todos: list[i].todos
      }; 
      res.send(resultM);
    }
  }
  if(flag === false) {
    let resultM = {
      name: "User not found",
      todos: []
    }; 
    res.send(resultM);
  }
})


router.delete("/user/:id",(req, res) => {
  let flag = false;
  console.log("del");
  for (let i = 0; i < list.length; i++) {
    console.log(list);
    if (req.params.id == list[i].name) {
      flag = true;
      list.splice(i,1);
      console.log("Here");
      console.log(list);
      let resultM = {
        message: "User deleted"
      }; 
      res.send(resultM);
    }
  }
  if(flag === false) {
    console.log(list);
    let resultM = {
      message: "User not found"
    }; 
    res.send(resultM);
  }
})

router.put("/user",(req, res) => {
  let flag = false;
  console.log("put");
  for (let i = 0; i < list.length; i++) {
    console.log(list);
    if (req.body.name == list[i].name) {
      flag = true;
      list[i].todos.splice(req.body.todos,1);
      console.log("deleted task");
      console.log(list);
      let resultM = {
        message: "Task deleted"
      }; 
      res.send(resultM);
    }
  }
  if(flag === false) {
    let resultM = {
      message: "User not found"
    }; 
    res.send(resultM);
  }
})

module.exports = router;
