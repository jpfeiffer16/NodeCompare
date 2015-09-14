var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose');
  
module.exports = function (app) {
  app.use('/', router);
};

router.post('/newjob', function(req, res, next) {
  var JobDataStorage = require('../modules/JobDataStorage');
  
  var jobToAdd = req.body;
  
  
  //TODO: update this architecture
  JobDataStorage.processJob(jobToAdd.sourceUrl, jobToAdd.targetUrl,jobToAdd.name, jobToAdd.description);
  
  res.send({});
  
  // E.G.: 
  // {
  //   name: '',
  //   description: '',
  //   urls: [
  //     {
  //       targetUrl: '',
  //       sourceUrl: ''
  //     }
  //   ]
  // }
});
