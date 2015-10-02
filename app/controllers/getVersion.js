/// <reference path="../../typings/tsd.d.ts" />
var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  Image = require('../models/image.js');
    
module.exports = function (app) {
  app.use('/', router);
};

router.post('/getversion', function(req, res, next) {
  var fs = require('fs'),
      path = require('path'),
      appDir = path.dirname(require.main.filename);
  fs.readFile(appDir + '/package.json', function (err, data) {
    var packageJson = data.toString('UTF-8');
    res.send(JSON.parse(packageJson).version);
  });

});