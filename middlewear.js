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

module.exports = middlewear;
