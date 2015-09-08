var express = require('express'),
  router = express.Router();

module.exports = function (app) {
  app.use('/', router);
};

router.get('/app', function(req, res, next) {
  res.render('app', {
    title: 'App'
  });
});