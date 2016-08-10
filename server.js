var express = require('express');
//creating express app
var app = express();
var path = require('path');
var bodyParser = require('body-parser');

var PORT = process.env.PORT || 3000;
var middlewear = require('./middlewear');

var todos = [
  {
    id: 1,
    description: 'Teach REST API',
    completed: false
  },
  {
    id: 2,
    description: 'Go eat health lunch',
    completed: true
  }
]

//this middlewear is now for the whole app!
app.use(middlewear.requireAuthentication);
//this is using the module body-parser in whole app
app.use(bodyParser());

app.get('/', function(req, res){
  res.send('<h1>Express Todo API</h1>')
})

app.get('/todos', function(req,res){
  res.json(todos);
})

app.get('/todos/:id', function(req, res){
  //creating a variable that will hold id from params object as integer
  var todoId = parseInt(req.params.id);
  var matchedTodo;
  todos.forEach(function(todo){
    if(todoId === todo.id){
      matchedTodo = todo;
    }
  })
  if(matchedTodo){
    res.json(matchedTodo)
  }else{
    res.status(404).send();
  }
})


app.get('/about', middlewear.logger, function(req, res){
  res.send('<h1>Express About Page</h1>')
})

app.listen(PORT,function(){
  console.log('listening on PORT ' + PORT);
})
