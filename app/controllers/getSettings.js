var express = require('express'),
    router = express.Router(),
    SettingsProvider = require('../modules/SettingsProvider.js');

module.exports = function (app) {
  app.use('/', router);
};


router.post('/getsettings', function(req, res, next) {
  SettingsProvider.getSettings(function(err, result) {
    if (!err) {
      res.send(result);
    } else {
      res.status(500).send();
    }
  });
});