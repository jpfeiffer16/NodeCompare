var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  Notifications = require('../modules/Notifications.js');
  
module.exports = function (app) {
  app.use('/', router);
};

router.post('/newjob', function(req, res, next) {
  var JobDataStorage = require('../modules/JobDataStorage'),
      jobToAdd = req.body;
  
  JobDataStorage.processJob(jobToAdd, function() {
    console.log('Job finished processing');
  });
  res.send({});
  Notifications.broadcast('notification', 'New job has been created');
});