#Express-App-APT_TODO
####REST API

//Write your own notes here


//was created a middlewear where the app.use will be used in all app and to connect the module that we want to use when we want to use.
```
app.get('/about', middlewear.logger, function(req, res){
  res.send('<h1>Express About Page</h1>')
})
```
//this was a custom middlewear called after the root route and before the function ...


//moving the middlewear to his own file .js after make sure it was working. now we have to module.exports the middlewear and also require it at the server.js (best practice)
