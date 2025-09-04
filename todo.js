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
    text: 'hello my first todo'
  },{
    id:4,
    text:"this is a todo app"
  }
]

const app = express()
app.use(express.json())

app.get('/',(req,res)=>{
  res.status(200).send("the main page is todolist")
})
app.get("/todos",(req,res)=>{
  res.status(200).send(todo)
})

app.post('/addtodo',(req,res)=>{
  try {
    const newTodo = req.body;
    if(!newTodo.text){
      res.status(400).send({error:"text field is required"})
    }
    newTodo.id = todo.length+1;
    todo.push(newTodo)
    res.status(201).send({message:'todo successfully added',todo:newTodo})
  } catch (error) {
    res.status(400).send({ error: "Invalid JSON data please try again" })
  }
})

app.put('/update/:id',(req,res)=>{
const id = parseInt(req.body.id);
const updatetodo = req.body
const index = todo.findIndex((d)=>d.id===id)
if(index!==-1){
  todo[index].text = updatetodo.text  || todo[index].text
  res.status(200).send({
      message: "todo was successfully updated",
      todo: todo[index],
    });
}else{
      res.status(404).send({ error: "Todo not found" })

}

})
  else if (req.url === `/update/${id}` && req.method === "PUT") {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    })
    req.on('end', () => {
      try {
        const updatedata = JSON.parse(body)
        const index = todo.findIndex((i) => i.id === id)
        if (index !== -1) {
          todo[index].text = updatedata.text || todo[index].text
          res.writeHead(200, { 'content-type': 'application/json' })
          res.end(JSON.stringify({ message: 'todo was successfull update', todo: todo[index] }))
        } else {
          res.writeHead(404, { 'content-type': 'application/json' })
          res.end(JSON.stringify({ error: "Todo not found" }))
        }
      } catch (error) {
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "Invalid JSON data" }));
      }
    })
  } else if (req.url === `/delete/${id}` && req.method === 'DELETE') {
    try {
      const id = parseInt(req.url.split('/')[2]);
      const todoIndex = todo.findIndex((i) => i.id === id)
      if (todoIndex !== -1) {
        todo.splice(todoIndex, 1);
        res.writeHead(200, { 'content-type': 'application/json' })
        res.end(JSON.stringify({ message: 'todo was successfull delete', todo: todo }))
      }
    } catch (error) {
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "please try again" }));
    }
  }
  else {
    res.writeHead(404, { 'content-type': 'plain/text' })
    res.end(JSON.stringify({ error: "route not found" }))
  }

app.listen(3002, () => {
  console.log(`the server is running http://localhost:3002`);

})


