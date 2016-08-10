var express = require('express');
//creating express app
var app = express();
var path = require('path');
var PORT = 3000;


//Custom Middlewear
var middlewear = {
  requireAuthentication: function(req, res, next){
    console.log('Request Auth Ran.');
    next();
  },
  logger: function(req, res, next){
    console.log(req.method + req.originalUrl + new Date().toString());
    next();
  }

}
//this middlewear is now for the whole app!
app.use(middlewear.requireAuthentication);

app.get('/', function(req, res){
  res.send('<h1>Express Todo API</h1>')
})

app.get('/about', middlewear.logger, function(req, res){
  res.send('<h1>Express About Page</h1>')
})

app.listen(PORT,function(){
  console.log('listening on PORT' )
})
