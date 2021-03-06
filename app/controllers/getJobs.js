/// <reference path="../../typings/tsd.d.ts" />
var express = require('express'),
    router = express.Router(),
    Job = require('../models/job.js');
  
module.exports = function (app) {
  app.use('/', router);
};

router.post('/getJobs', function(req, res, next) {
  var Notifications = require('../modules/Notifications.js');
  Notifications.broadcast('notification', 'getJobs has been called.')
  Job.find(function(err, results) {
    if (!err) {
      res.send(results);
    } else {
      res.status(500).send(err);
    }
  });
});