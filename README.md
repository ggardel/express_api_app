#Express-App-API
####REST API


//was created a middlewear where the app.use will be used in all app and to connect the module that we want to use when we want to use.


//this was a custom middlewear called after the root route and before the function ...

```
app.get('/about', middlewear.logger, function(req, res){
  res.send('<h1>Express About Page</h1>')
})
```


//moving the middlewear to his own file .js after make sure it was working. now we have to module.exports the middlewear and also require it at the server.js (best practice)


//'npm install body-parser' and is being required at the top of my server.js for the whole app

//creted 1st GET /todos & tested it with POSTMAN by creating key/value with get REST. (collection->Enviroment->Route)



//this is the route to find the data by the id, and the parseInt make sure it will be a integer only and once todoId is defined as ID will run the for each from the array todos and if is a match will show on the view if not will show a error 404.

```
app.get('/todos/:id', function(req, res){
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
```

//Created POST // todos
First, had to initialize id
`var todoNextId = 1`
And then we first had to require body and add plus one so would get the right id and them push so we can add to the body the new data.

```
app.post('/todos', function(req, res){
  var body = req.body;
  //add id field
  body.id = todoNextId;
  todoNextId++;
  //push the body into array
  //we just parsed
  todos.push(body)
  res.json(body)
})
```


//Refactor using UnderScore.js
//Get TODOS/:id
``var matchedTodo = _.findWhere(todos, {id: todoId})``
//refactoring the code with `_.findWhere` finds the first value that matches all of the key-value pairs.


//Javascript
  `` var matchedTodo;
     todos.forEach(function(todo){
     if(todoId === todo.id){
      matchedTodo = todo;
       }
    })
```

//POST

//Javascript
//var body = req.body;//

```app.post('/todos', function(req, res){
//refactoring with  _.pick
  var body = _.pick(req.body, 'description', 'completed');
  //var body = req.body;/////

  //_.isBoolean  &  _.isString are Object functions that allows us to validate
  //We have the body object through  body-parser.
  ```

  //with `_.undescore`
  ```
  if(!_.isBoolean(body.completed) || !_.isString(body.description) ||
    body.description.trim().length === 0){
      return res.status(400).send();
    }
     body.description = body.description.trim();
  body.id = todoNextId;
  todoNextId++;
  todos.push(body)
  res.json(body)
})
```

//Created delete /todos/:id

//finding the the object by Id with `_.findWhere` and deleting with the `_.without` the array todos with the values from matchedTodo
```
_.without(array, *values)
Returns a copy of the array with all instances of the values removed.

_.without([1, 2, 1, 0, 3, 1, 4], 0, 1);
=> [2, 3, 4]
```
//applied

```
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
```
