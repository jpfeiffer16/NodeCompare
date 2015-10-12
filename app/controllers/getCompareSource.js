/// <reference path="../../typings/tsd.d.ts" />
var express = require('express'),
  router = express.Router(),
  Source = require('../models/source.js');
  
module.exports = function (app) {
  app.use('/', router);
};

router.post('/getcomparesource', function(req, res, next) {
  var sourceId = req.body.sourceId;
  var targetId = req.body.targetId
  
  Source.findOne({ _id: sourceId }, function (err, result) {
    if (!err) {
      var sourceSource = result.data;
      Source.findOne({ _id: targetId }, function(err, result) {
        if (!err) {
          var targetSource = result.data;
          res.send({
            source: sourceSource,
            target: targetSource
          });
        } else {
          res.status(404).send();
        }
      });
    } else {
      res.status(404).send();
    }
  });
});