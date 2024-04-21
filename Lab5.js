import express from 'express';

const todos = [
  { id: 0, title: "Task 1", completed: false },
  { id: 1, title: "Task 1", completed: false },
  { id: 2, title: "Task 2", completed: true },
  { id: 3, title: "Task 3", completed: false },
  { id: 4, title: "Task 4", completed: true },
];

const assignment = {
  id: 1,
  title: "NodeJS Assignment",
  description: "Create a NodeJS server with ExpressJS",
  due: "2021-10-10",
  completed: false,
  score: 0,
};

const moduleObj = {
  id: 'mod1',
  name: 'Web Development',
  description: 'Learn to create websites with HTML, CSS, and JavaScript',
  course: 'CS50'
};


const Lab5 = (app) => {
  app.post("/a5/todos", (req, res) => {
    const newTodo = {
      ...req.body,
      id: new Date().getTime(),
    };
    todos.push(newTodo);
    res.json(newTodo);
  });
  app.get("/a5/todos/create", (req, res) => {
    const newTodo = {
      id: new Date().getTime(),
      title: "New Task", completed: false,
    };
    todos.push(newTodo);
    res.json(todos);
  });

  app.get("/a5/todos", (req, res) => {
    const { completed } = req.query;
    if (completed !== undefined) {
      const completedBool = completed === "true";
      const completedTodos = todos.filter(
        (t) => t.completed === completedBool);
      res.json(completedTodos);
      return;
    }
    res.json(todos);
  });

  app.get("/a5/todos/:id/title/:title", (req, res) => {
    const { id, title } = req.params;
    const todo = todos.find((t) => t.id === parseInt(id));
    todo.title = title;
    res.json(todos);
  });

  app.delete("/a5/todos/:id", (req, res) => {
    const { id } = req.params;
    console.log(todos);
    const todo = todos.find((t) => t.id === parseInt(id));
  
    if (!todo) {
      res.status(404)
        .json({ message: `Unable to delete Todo with ID ${id}` });
      return;
    }

    todos.splice(todos.indexOf(todo), 1);
    res.sendStatus(200);
  });
  
  app.get("/a5/todos/:id/delete", (req, res) => {
    const { id } = req.params;
    const todo = todos.find((t) => t.id === parseInt(id));
    todos.splice(todos.indexOf(todo), 1);
    res.json(todos);
  });

  app.put("/a5/todos/:id", (req, res) => {
    const { id } = req.params;
    const todo = todos.find((t) => t.id === parseInt(id));
    if (!todo) {
      res.status(404)
        .json({ message: `Unable to update Todo with ID ${id}` });
      return;
    }

    todo.title = req.body.title;
    todo.description = req.body.description;
    todo.due = req.body.due;
    todo.completed = req.body.completed;
    res.sendStatus(200);
  });

  app.patch("/a5/todos/:id/completed/:completed", (req, res) => {
    const { id, completed } = req.params;
    const todo = todos.find(t => t.id === parseInt(id));
    if (todo) {
      todo.completed = completed === 'true';
    }
    res.json(todos);
  });

  app.patch("/a5/todos/:id/description", (req, res) => {
    const { id } = req.params;
    const { description } = req.body; // Using body to pass description
    const todo = todos.find(t => t.id === parseInt(id));
    if (todo) {
      todo.description = description;
    }
    res.json(todos);
  });


  app.get("/a5/todos/:id/delete", (req, res) => {
    const { id } = req.params;
    const todo = todos.find((t) => t.id === parseInt(id));
    const todoIndex = todos.indexOf(todo);
    if (todoIndex !== -1) {
      todos.splice(todoIndex, 1);
    }
    res.json(todos);
  });

  app.get("/a5/todos/create", (req, res) => {
    const newTodo = {
      id: new Date().getTime(),
      title: "New Task",
      completed: false,
    };
    todos.push(newTodo);
    res.json(todos);
  });
  app.get

  app.get("/a5/todos/:id", (req, res) => {
    const { id } = req.params;
    const todo = todos.find((t) => t.id === parseInt(id));
    res.json(todo);
  });




  app.get("/a5/assignment", (req, res) => {
    res.json(assignment);
  });

  app.get("/a5/assignment/title", (req, res) => {
    res.send(assignment.title);
  });

  app.post("/a5/assignment/title/:newTitle", (req, res) => {
    assignment.title = req.params.newTitle;
    res.json(assignment);
  });

  app.get("/a5/module", (req, res) => {
    res.json(moduleObj);
  });

  app.get("/a5/module/name", (req, res) => {
    res.send(moduleObj.name);
  });

  app.post("/a5/module/name/:newName", (req, res) => {
    moduleObj.name = req.params.newName;
    res.json(moduleObj);
  });

  // Existing calculator operations
  app.get("/a5/welcome", (req, res) => {
    res.send("Welcome to Assignment 5");
  });
  app.get("/a5/add/:a/:b", (req, res) => {
    const { a, b } = req.params;
    const sum = parseInt(a) + parseInt(b);
    res.send(sum.toString());
  });
  app.get("/a5/subtract/:a/:b", (req, res) => {
    const { a, b } = req.params;
    const sum = parseInt(a) - parseInt(b);
    res.send(sum.toString());
  });
  app.get("/a5/multiply/:a/:b", (req, res) => {
    const { a, b } = req.params;
    const product = parseInt(a) * parseInt(b);
    res.send(product.toString());
  });

  app.get("/a5/divide/:a/:b", (req, res) => {
    const { a, b } = req.params;
    const quotient = parseInt(b) !== 0 ? parseInt(a) / parseInt(b) : 'Division by zero';
    res.send(quotient.toString());
  });

  app.get("/a5/calculator", (req, res) => {
    const { a, b, operation } = req.query;
    let result = 0;
    switch (operation) {
      case "add":
        result = parseInt(a) + parseInt(b);
        break;
      case "subtract":
        result = parseInt(a) - parseInt(b);
        break;
      case "multiply":
        result = parseInt(a) * parseInt(b);
        break;
      case "divide":
        result = parseInt(b) !== 0 ? parseInt(a) / parseInt(b) : 'Division by zero';
        break;
      default:
        result = "Invalid operation";
    }
    res.send(result.toString());
  });
  app.post("/a5/todos", (req, res) => {
    const newTodo = {
      ...req.body,
      id: new Date().getTime(),
    };
    todos.push(newTodo);
    res.json(newTodo);
  });
  app.get("/a5/todos/create", (req, res) => {
    const newTodo = {
      id: new Date().getTime(),
      title: "New Task", completed: false,
    };
    todos.push(newTodo);
    res.json(todos);
  });


  app.use((req, res, next) => {
    res.status(404).send('Endpoint not found');
  });

  app.delete("/a5/todos/:id", (req, res) => {
    const { id } = req.params;
    const todo = todos.find((t) => t.id === parseInt(id));
    if (!todo) {
      res.status(404)
        .json({ message: `Unable to delete Todo with ID ${id}` });
      return;
    }
    todos.splice(todos.indexOf(todo), 1);
    res.sendStatus(200);
  });

  app.get("/a5/todos/:id/delete", (req, res) => {
    const { id } = req.params;
    const todo = todos.find((t) => t.id === parseInt(id));
    todos.splice(todos.indexOf(todo), 1);
    res.json(todos);
  });

  app.put("/a5/todos/:id", (req, res) => {
    const { id } = req.params;
    const todo = todos.find((t) => t.id === parseInt(id));
    if (!todo) {
      res.status(404)
        .json({ message: `Unable to delete Todo with ID ${id}` });
      return;
    }
    todo.title = req.body.title;
    todo.description = req.body.description;
    todo.due = req.body.due;
    todo.completed = req.body.completed;
    res.sendStatus(200);
  });


};
export default Lab5;







