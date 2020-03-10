var express = require('express');
var router = express.Router();

router.use('/user',require('./user'));
//router.use('/blogs',require('./blogs'));

module.exports = router;
