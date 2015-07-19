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
  console.log(req.body.name);
  console.log(req.body.description);
  console.log(req.body.sourceUrl);
  console.log(req.body.targetUrl);
});