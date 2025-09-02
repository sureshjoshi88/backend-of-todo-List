const http = require('http')

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
  }
]

const server = http.createServer((req, res) => {
  const id = parseInt(req.url.split('/')[2]);

  if (req.url === '/') {
    res.writeHead(200, { 'Content-Type': 'plain/text' })
    res.end("hello the main page is avaible")

  } else if (req.url === '/todos') {
    res.writeHead(200, { "Content-Type": 'application/json' })
    res.end(JSON.stringify(todo))
  } else if (req.url === '/addtodo' && req.method === "POST") {
    let body = ''
    req.on('data', chunk => {
      body += chunk.toString();
    })
    req.on('end', () => {
      try {
        const newTodo = JSON.parse(body)
        newTodo.id = todo.length + 1
        todo.push(newTodo)
        res.writeHead(200, { 'content-type': 'application/json' })
        res.end(JSON.stringify({ message: 'todo successfully added', todo: newTodo }))
      } catch (error) {
        res.writeHead(400, { 'content-type': 'application/json' })
        res.end(JSON.stringify({ error: "Invalid json data please try again" }))

      }
    })

  } else if (req.url === `/update/${id}` && req.method === "PUT") {
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

      const todoIndex = todo.findIndex((i)=>i.id===id)
      if(todoIndex!==-1){
        todo.splice(todoIndex,1);
        res.writeHead(200, { 'content-type': 'application/json' })
        res.end(JSON.stringify({ message: 'todo was successfull delete', todo :todo }))
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
})

server.listen(3002, () => {
  console.log(`the server is running http://localhost:3002`);

})


////////