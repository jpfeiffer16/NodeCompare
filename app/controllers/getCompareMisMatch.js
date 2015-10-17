/// <reference path="../../typings/tsd.d.ts" />
var express = require('express'),
    router = express.Router(),
    ImageCompare = require('../models/imagecompare.js');
  
module.exports = function (app) {
  app.use('/', router);
};
  
router.post('/getcomparemismatch/:id', function(req, res, next) {
  var id = req.params.id;
  ImageCompare.findOne({ _id: id }, function(err, result) {
    if (!err) {
      res.send(result.misMatchPercentage.toString());
    } else {
      res.status(404).send();
    }
  });
});