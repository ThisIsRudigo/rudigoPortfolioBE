const express = require('express');
var app = express();

//setup cors to accept requests from everywhere
const cors = require('cors');
app.use(cors());

var path = require('path');
app.use(express.static(path.join(__dirname, 'public')));

//log all requests to the console
const logger = require('morgan');
app.use(logger('dev'));

//parse all incoming parameters to req.body
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//consistent reply functions from all endpoints
var reply = require('./middlewares/reply');
app.use(reply.setupResponder);

var config = require('./config');
var mongoose = require('mongoose');

mongoose.connect(config.mongoUrl);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', () => console.log('connected to Rudigo Portfolio database'));

//routers
var account = require('./routers/account');
app.use('/account', account);

app.use(function(err, req, res, next){
	res.status(400).json(err);
});

module.exports = app;