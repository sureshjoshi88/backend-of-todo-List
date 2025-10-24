const express = require('express')

const todo = [
  {
    id: 1,
    text: 'jai shree ram'
  },
  {
    id: 2,
    text: 'jai shree hanuman ji'
  },
  {
    id: 3,
    text: 'hello good morning everyone'
  }

]

const app = express()
app.use(express.json())

app.get('/', (req, res) => {
  res.status(200).send("the main page is todolist")
})
app.get("/todos", (req, res) => {
  res.status(200).send(todo)
})

app.post('/addtodo', (req, res) => {
  try {
    const newTodo = req.body;
    if (!newTodo.text) {
      return res.status(400).send({ error: "text field is required" })
    }
    newTodo.id = todo.length + 1;
    todo.push(newTodo)
    res.status(201).send({ message: 'todo successfully added', todo: newTodo })
  } catch (error) {
    res.status(400).send({ error: "Invalid JSON data please try again" })
  }
})

app.put('/update/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const updatetodo = req.body
  const index = todo.findIndex((d) => d.id === id)
  if (index !== -1) {
    todo[index].text = updatetodo.text || todo[index].text
    res.status(200).send({
      message: "todo was successfully updated",
      todo: todo[index],
    });
  } else {
    res.status(404).send({ error: "Todo not found" })

  }

})

app.delete('/delete/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const todoindex = todo.findIndex((v) => v.id === id)
  if (todoindex !== -1) {
    todo.splice(todoindex, 1);
    res.status(200).send({ message: "todo was successfully deleted", todo });
  } else {
    res.status(404).send({ error: "Todo not found" })
  }
})
app.use((req, res) => {
  res.status(404).send({ error: "route not found" })
})

app.listen(3002, () => {
  console.log(`the server is running http://localhost:3002`);
})


