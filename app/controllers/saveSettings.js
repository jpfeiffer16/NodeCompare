var express = require('express'),
  router = express.Router(),
  SettingsProvider = require('../modules/SettingsProvider.js');

module.exports = function (app) {
  app.use('/', router);
};

router.post('/savesettings', function(req, res, next) {
  var settingsToSave = req.body;
  console.log(settingsToSave);
  // console.log(t);
  //Find document based on machine name and updtate the settings property with the data, created it if it does not exist
  res.send({});
});