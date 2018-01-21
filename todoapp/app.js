var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index.js');
var users = require('./routes/users.js');
var api = require('./routes/api.route');

var bluebird = require('bluebird')


var app = express();

var mongoose = require('mongoose')
mongoose.Promise = bluebird
var url = "mongodb://blackhole:th3W33knd@cluster0-shard-00-00-vq6ed.mongodb.net:27017,cluster0-shard-00-01-vq6ed.mongodb.net:27017,cluster0-shard-00-02-vq6ed.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin"
mongoose.connect(url, { useMongoClient: true})
.then(()=> { console.log(`Succesfully Connected to the Mongodb Database`)})
.catch(()=> { console.log(`Error Connecting to the Mongodb Database`)})


app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);
app.use('/api', api);

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

module.exports = app;