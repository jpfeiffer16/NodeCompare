var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'),
    Image = require('../models/image.js');
    
module.exports = function (app) {
  app.use('/', router);
};

router.get('/imageproviderbase64/:id', function(req, res, next) {
  var id = req.params.id;
  
  Image.findOne({ _id: id }, function(err, result) {
    if (!err && result != null) {      
      res.send(result.data);
    } else {
      res.status(404).send();
    }
  });
});
