var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser')
const fileUpload = require('express-fileupload');

var indexRouter = require('./routes/index');
var apiRouter = require('./routes/api');
var clientRouter = require('./routes/client');
var depositRouter = require('./routes/deposit');
var accountRouter = require('./routes/account');
var loanRouter = require('./routes/loan');
var savingsRouter = require('./routes/savings');


var cors = require('cors')
var app = express();

app.use(cors());
// routes.initialize(app);

app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: '/tmp/',
  limits: { fileSize: 2097152 },
}));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(bodyParser.json({ type: 'application/*+json', limit: '800mb' }))
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// app.use(bodyParser.raw());


app.use('/', indexRouter);
app.use('/api', apiRouter);
app.use('/api/client', clientRouter);
app.use('/api/deposit', depositRouter);
app.use('/api/accounting', accountRouter);
app.use('/api/loan', loanRouter);
app.use('/api/savings', savingsRouter);

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  res.status(404).json({ status: false, message: 'URL Not Found ' })
  // next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
