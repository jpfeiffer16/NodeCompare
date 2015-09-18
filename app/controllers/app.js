var express = require('express'),
  router = express.Router();

module.exports = function (app) {
  app.use('/', router);
};

var renderApp = function (res) {
  res.render('app', {
    title: 'App'
  });
}
//Mirror all the angular views so that we don't get any hanging urls
router.get('/app', function(req, res, next) {
  renderApp(res);
});

router.get('/', function(req, res, next) {
  renderApp(res);
});

router.get('/details/:id', function(req, res, next) {
  renderApp(res);
});

router.get('/new', function(req, res, next) {
  renderApp(res);
});