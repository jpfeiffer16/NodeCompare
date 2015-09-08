var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  Job = require('../models/job.js');

module.exports = function (app) {
  app.use('/', router);
};

router.get('/details/:jobId', function (req, res, next) {
  var jobId = req.params.jobId;
  Job.findOne({_id: jobId})
    .populate('sourceImageId')
    .populate('targetImageId')
    .exec(function(err, result) {
      res.render('details', {
        title: 'Details',
        job: result
      });
    });
});