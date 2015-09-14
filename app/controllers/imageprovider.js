var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  Image = require('../models/image.js');
    
module.exports = function (app) {
  app.use('/', router);
};

router.get('/imageprovider/:id', function(req, res, next) {
  var id = req.params.id;
  
  Image.findOne({ _id: id }, function(result) {
    var image = new Buffer(result.data, 'base64');
    
    res.send(image);
  });
});
