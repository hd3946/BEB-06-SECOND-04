var express = require('express');
var app = express();
var path = require('path');
var cors = require('cors');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var dotenv = require('dotenv');
dotenv.config();
var { sequelize } = require('./models');

var app = express();
app.set('port', process.env.PORT || 3005);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

sequelize
  .sync({ force: false }) // force:true 일경우 테이블 전부 지우고 새로 설정~!
  .then(() => {
    console.log('데이터베이스 연결 성공');
  })
  .catch(err => {
    console.error(err);
  });

var postRouter = require('./routes/post/post');
var exchangeRouter = require('./routes/exchange/exchange');
var usersRouter = require('./routes/users'); 

// router
app.use('/users', usersRouter);
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
