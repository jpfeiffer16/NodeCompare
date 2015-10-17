var express = require('express'),
    router = express.Router(),
    SettingsProvider = require('../modules/SettingsProvider.js');

module.exports = function (app) {
  app.use('/', router);
};

router.post('/savesettings', function(req, res, next) {
  var settingsToSave = req.body;
  
  SettingsProvider.saveSettings(settingsToSave, function() {
    console.log('Settings saved');
  });
  res.send({
    status: 'Ok',
    message: 'Settings have been saved successfully.'
  });
});