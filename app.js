var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
// var acl = require('acl');
var swaggerJSDoc = require('swagger-jsdoc');
var index = require('./routes/index');
var users = require('./routes/users');
// var swagger = require('./routes/swagger');
var app = express();

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//setup cors to accept requests from everywhere
var cors = require('cors');
app.use(cors());

var spec = swaggerJSDoc({
  swaggerDefinition: {
    info: { 
      description: 'This API is responsible for managing the information \
      \ about students as well as businesses and admin along with their authentication, \
      \ authorization. It includes the basic CRUD operations for users, registration, login and password reset.',  
      title: 'Rudigo Portfolio',
      contact: {
        name: ' Okpara Franklin',
        email: 'frankmaclin361@gmail.com'
      },
      version: '1.0.0',
        
    },
    // host: '18.220.175.109',
    host: 'localhost:3000',
    basePath: '/',
  
    produces: ['application/json'],
    consumes: ['application/json'],
    // securityDefinition: {
    //   ApiKeyAuth: {
    //     type: 'apiKey',
    //     name: 'x-access-token',
    //     in: 'header'
    //   }
    // },
    // security: [
    //   { ApiKeyAuth: []}
    // ]
  },
  
 
  // path to the API docs
  apis: [
    './controllers/account/*.js'
  ]
  
});
// var options = {
//   // import swaggerDefinitions
//   swaggerDefinition:swaggerDefinition,}

// //  initialize swagger-jsdoc
// var swaggerspec = swaggerJSDoc();

// serve swagger
app.get('/swagger.json', function(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.send(spec);
});

var config  = require('./config');

//consistent reply functions from all endpoints
var reply = require('./middlewares/reply');
app.use(reply.setupResponder);

mongoose.connect(config.mongoUrl);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', ()=> console.log('connected to rudigo_portfolio'));

// var acl = require('acl');
// acl = new acl(new acl.mongodbBackend(mongoose.connection.db,'_acl'));
// acl.middleware();
//routers
var account = require('./routers/account');
app.use('/account',account);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');



app.use('/', index);
app.use('/users', users);
// app.use('/swagger',swagger);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// // error handler
// app.use(function(err, req, res, next) {
//   if (typeof(err) != object){
//     res.status(500).send("we don't ");
//     return;
//   }

//   if (!err.message || !err.status){
//     res.status(500).send("we don't ");
//     return;
//   }
  
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

module.exports = app;
