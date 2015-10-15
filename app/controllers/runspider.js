var express = require('express'),
    router = express.Router(),
    Spider = require('../modules/Spider.js');
  
module.exports = function (app) {
  app.use('/', router);
};


router.post('/runSpider', function(req, res, next) {
  var domain = req.body.domain;
  Spider.runspider(domain);
});