var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  Job = mongoose.model('Job');

module.exports = function (app) {
  app.use('/', router);
};

//TODO Define the route

router.get('/list', function(req, res, next) {
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