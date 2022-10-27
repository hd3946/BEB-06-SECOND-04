var express = require('express');
var router = express.Router();

/* post router listing. */
router.get('/', function(req, res, next) {
  res.send('here is post router');
});

router.post('/', function(req, res, next) {
  res.send('here is post router');
});

router.put('/', function(req, res, next) {
  res.send('here is post router');
});

router.delete('/', function(req, res, next) {
  res.send('here is post router');
});

module.exports = router;
