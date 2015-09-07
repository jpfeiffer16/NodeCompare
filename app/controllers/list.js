var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  Job = mongoose.model('Job');

module.exports = function (app) {
  app.use('/', router);
};

router.get('/', function(req, res, next) {
  console.log('/ being called.');
  Job.find(function(err, jobs) {
    if (err) {
      return next(err);
    }
    res.render('list', {
      title: 'Job List',
      jobs: jobs
    });
  });
});

router.get('/index', function(req, res, next) {
  console.log('/ being called.');
  Job.find(function(err, jobs) {
    if (err) {
      return next(err);
    }
    res.render('list', {
      title: 'Job List',
      jobs: jobs
    });
  });
});