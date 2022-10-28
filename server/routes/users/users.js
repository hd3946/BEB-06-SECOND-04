var express = require('express');
var router = express.Router();

/* users router listing. */
router.post('/login', function(req, res, next) {
  res.send('here is users router');
});

router.post('/logout', function(req, res, next) {
  res.send('here is users router');
});

router.post('/signup', function(req, res, next) {
  res.send('here is users router');
});

//회원정보 수정
// router.post('/', function(req, res, next) {
//   res.send('here is users router');
// });

module.exports = router;
