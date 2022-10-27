var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var usersRouter = require('./routes/users/users');
var transferRouter = require('./routes/users/users_transfer');
var postRouter = require('./routes/post/post');
var exchangeRouter = require('./routes/exchange/exchange');

var app = express();
app.set('port', 3005);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// router
app.use('/users', usersRouter);
app.use('/users/transfer', transferRouter);
app.use('/post', postRouter);
app.use('/exchange', exchangeRouter);



// error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(400).send('Something broke!');
});

app.use((req, res, next) => {
  res.status(404).send("invailed path");
});

app.listen(app.get('port'), () => {
	console.log(`✅ Server running on http://localhost:${app.get('port')}`);
});

module.exports = app;
