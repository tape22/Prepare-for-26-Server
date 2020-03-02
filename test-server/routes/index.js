var express = require('express');
var router = express.Router();

// localhost:3000/blog
// router.use('/blog', require('./blog'))

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
