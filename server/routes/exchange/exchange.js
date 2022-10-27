var express = require('express');
var router = express.Router();

/* exchange router listing. */

router.put('/', function(req, res, next) {
  res.send('here is exchange router');
});

module.exports = router;
