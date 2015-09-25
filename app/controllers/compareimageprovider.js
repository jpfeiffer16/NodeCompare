var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  ImageCompare = require('../models/imagecompare.js');

module.exports = function (app) {
  app.use('/', router);
};

router.get('/compareimageprovider/:id', function(req, res, next) {
  var id = req.params.id;

  console.log('id:', id);
  ImageCompare.findOne({ _id: id }, function(err, result) {
    if (!err && result != null) {
      var image = new Buffer(result.data, 'base64');

      res.contentType('image/png');
      res.send(image);
    } else {
      res.status(404).send();
    }
  });
});
