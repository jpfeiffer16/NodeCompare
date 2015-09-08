var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose');
  
module.exports = function (app) {
  app.use('/', router);
};

router.post('/newjob', function(req, res, next) {
  var jobToAdd = req.body;
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
