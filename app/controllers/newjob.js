var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose');
  
module.exports = function (app) {
  app.use('/', router);
};

router.post('/newjob', function(req, res, next) {
  var JobDataStorage = require('../modules/JobDataStorage');
  
  var jobToAdd = req.body;
  JobDataStorage.processJob(jobToAdd, function() {
    console.log('Job finished processing');
  });
  res.send({});
});
