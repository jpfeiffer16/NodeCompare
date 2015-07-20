var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  Article = mongoose.model('Article');

module.exports = function (app) {
  app.use('/', router);
};

//TODO Define the route

router.get('/new', function(req, res, next) {
  res.render('new', {
    title: 'New Job'
  });
});

router.post('/new', function(req, res, next) {
  // var webshot = require('webshot');
  var name = req.body.name,
  description = req.body.description,
  sourceUrl = req.body.sourceUrl,
  targetUrl = req.body.targetUrl,
  JobDataStorage = require('../modules/JobDataStorage.js');
  
  console.log(name);
  console.log(description);
  console.log(sourceUrl);
  console.log(targetUrl);
  //Save to db:
  JobDataStorage.processJob(sourceUrl, targetUrl, name, description);
});