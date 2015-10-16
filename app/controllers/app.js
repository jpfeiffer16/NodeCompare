var express = require('express'),
  router = express.Router(),
  config = require('../../config/config'),
  fs = require('fs');

module.exports = function (app) {
  app.use('/', router);
};

var renderApp = function (res) {
  var directives = fs.readdirSync(config.root + '/public/js/directives');
  var services = fs.readdirSync(config.root + '/public/js/services');
  var controllers = fs.readdirSync(config.root + '/public/js/controllers');
  
  res.render('app', {
    title: 'App',
    directives: directives,
    services: services,
    controllers: controllers
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

router.get('/comparedetails/:id', function(req, res, next) {
  renderApp(res);
});

router.get('/new', function(req, res, next) {
  renderApp(res);
});

router.get('/about', function(req, res, next) {
  renderApp(res);
});

router.get('/settings', function(req, res, next) {
  renderApp(res);
});

router.get('/comparedetails/:compareid/:sourceid/:targetid', function(req, res, next) {
  renderApp(res);
});

router.get('/spiders', function(req, res, next) {
  renderApp(res);
});