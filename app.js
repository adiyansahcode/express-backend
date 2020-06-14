'use strict';

var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var rfs = require('rotating-file-stream');

// * run express
var app = express();

// * setup etag
app.enable('etag');
app.set('etag', 'strong');

// * setup the logger
// create a rotating write stream
const pad = num => (num > 9 ? '' : '0') + num;
const generator = (time, index) => {
  if (!time) {
    time = new Date();
  }
  var month = time.getFullYear() + '' + pad(time.getMonth() + 1);
  var day = pad(time.getDate());
  return 'log-' + month + day + '.log';
};
var accessLogStream = rfs.createStream(generator, {
  compress: true,
  interval: '1d', // rotate daily
  path: path.join(__dirname, 'logs')
});
// * create log file
app.use(logger('common', { stream: accessLogStream }));
// * create log stdout
app.use(logger('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// * router
var routes = require('./routes');
app.use(routes);

// * 404 not found
app.use(function (req, res, next) {
  // response status code
  res.status(404);
  // response with json
  res.json({
    status: 'fail',
    errors: {
      code: 404,
      title: 'notFound',
      detail: 'url not found'
    }
  });
});

// * error handler
app.use(function (err, req, res, next) {
  // response status code
  res.status(err.status || 500);
  // response with json
  res.json({
    status: 'error',
    errors: {
      code: err.status,
      title: 'error',
      detail: err.stack
    }
  });
});

module.exports = app;
