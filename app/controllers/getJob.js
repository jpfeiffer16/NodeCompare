/// <reference path="../../typings/tsd.d.ts" />
var express = require('express'),
  router = express.Router(),
  Job = require('../models/job.js');
  
module.exports = function (app) {
  app.use('/', router);
};

router.post('/getJob/:id', function(req, res, next) {
  var id = req.params.id;
    Job.findOne({_id: id})
    .exec(function(err, result) {
      if (!err) {
        res.send(result);
      } else {
        res.status(500).send(err);
      }
    });
});