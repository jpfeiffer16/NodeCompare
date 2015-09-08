var express = require('express'),
  router = express.Router(),
  JobDataStorage = require('../modules/JobDataStorage.js');
  
module.exports = function (app) {
  app.use('/', router);
};

router.post('/deletejob', function(req, res, next) {
  var id = req.body.id;
  
  JobDataStorage.removeJob(id, function() {
    res.send({});
  });
});