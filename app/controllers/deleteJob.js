var express = require('express'),
  router = express.Router(),
  JobDataStorage = require('../modules/JobDataStorage.js');

module.exports = function (app) {
  app.use('/', router);
};

router.post('/deleteJob/:id', function(req, res, next) {
  var id = req.params.id;

  JobDataStorage.removeJob(id, function() {
    res.send({ success: true });
  });
});
