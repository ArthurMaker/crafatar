var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Crafatar', domain: req.protocol + "://" + req.headers.host });
});


module.exports = router;
