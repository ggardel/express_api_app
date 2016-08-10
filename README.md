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
