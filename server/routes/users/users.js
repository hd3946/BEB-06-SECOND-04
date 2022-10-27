var express = require('express');
var router = express.Router();

/* GET users router listing. */
router.get('/', function(req, res, next) {
  res.send('here is users router');
});

router.post('/', function(req, res, next) {
  res.send('here is users router');
});

router.put('/', function(req, res, next) {
  res.send('here is users router');
});

router.delete('/', function(req, res, next) {
  res.send('here is users router');
});

module.exports = router;
