var express = require('express');
//creating express app
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var _ = require('underscore');

var PORT = process.env.PORT || 3000;
var middlewear = require('./middlewear');

var todos = [
  // {
  //   id: 1,
  //   description: 'Teach REST API',
  //   completed: false
  // },
  // {
  //   id: 2,
  //   description: 'Go eat health lunch',
  //   completed: true
  // }
]

var todoNextId = 1;

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
//refactoring the code with _.findWhere finds the first value  that matches all of the key-value pairs.
  var matchedTodo = _.findWhere(todos, {id: todoId})
  // var matchedTodo;
  // todos.forEach(function(todo){
  //   if(todoId === todo.id){
  //     matchedTodo = todo;
  //   }
  //})
  if(matchedTodo){
    res.json(matchedTodo)
  }else{
    res.status(404).send();
  }
})

app.post('/todos', function(req, res){
//refactoring with  _.pick
  var body = _.pick(req.body, 'description', 'completed');
  //var body = req.body;/////

  //_.isBoolean  &  _.isString are Object functions that allows us to validate
  //We have the body object through  body-parser.
  if(!_.isBoolean(body.completed) || !_.isString(body.description) ||
    body.description.trim().length === 0){
      return res.status(400).send();
    }
     body.description = body.description.trim();
  //add id field
  body.id = todoNextId;
  todoNextId++;
  //push the body into array
  //we just parsed
  todos.push(body)
  res.json(body)
})



app.delete('/todos/:id', function(req,res){
  var body =  parseInt(req.params.id);
  var matchedTodo = _.findWhere(todos, {id: todoId});
  //if reverse, not match todoId
  if(!matchedTodo){
    res.status(404).json({"error": "No Todo found."});
  }else{
    todos = _.without(todos, matchedTodo);
  }
  res.json(matchedTodo);
})


app.get('/about', middlewear.logger, function(req, res){
  res.send('<h1>Express About Page</h1>')
})

app.listen(PORT,function(){
  console.log('listening on PORT ' + PORT);
})
