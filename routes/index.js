'use strict';

var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
  res.status(200);
  res.json({
    status: 'success',
    data: null
  });
});

router.get('/test-error', function (req, res, next) {
  throw new Error('testing error');
});

router.use('/type', require('../controllers/type-controller'));

module.exports = router;
