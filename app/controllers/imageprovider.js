var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  Image = require('../models/image.js');
    
module.exports = function (app) {
  app.use('/', router);
};

router.get('/imageprovider/:id', function(req, res, next) {
  var id = req.params.id;
  
  Image.findOne({ _id: id }, function(err, result) {
    if (!err && result != null) {
      var image = new Buffer(result.data, 'base64');
      
      res.send(image);
    } else {
      res.status(404).send();
    }
  });
});
