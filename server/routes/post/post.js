var express = require('express');
var router = express.Router();

/* post router listing. */
router.post('/', function(req, res, next) {
  res.send('here is post router');
});

router.post('/', function(req, res, next) {
  res.send('here is post router');
});

router.post('/', function(req, res, next) {
  res.send('here is post router');
});

router.post('/', function(req, res, next) {
  res.send('here is post router');
});

module.exports = router;
