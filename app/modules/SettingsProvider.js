/// <reference path="../../typings/mongoose/mongoose.d.ts" />
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    Settings = require('../../config/nodeCompareSettings.js'),
    DefaultSettings = require('../../config/nodeCompareDefaultSettings.js'),
    OS = require('os'),
    schema = new Schema(Settings),
    settings = mongoose.model('settings', schema),
    machineName = OS.hostname();

function cleanSettings(settings) {
  var newSettings = [];
  function checkSettings(defaultSetting) {
    for (var j = 0; j < settings.length; j++) {
      if (settings[j].name == defaultSetting.name)
      {
        //Setting exists and should be persisted
        newSettings.push(settings[j]);
        return;
      }
    }
    //Setting does not exist and should be added with the default value
    newSettings.push(defaultSetting);
  }
  for (var i = 0; i < DefaultSettings.length; i++) {
    checkSettings(DefaultSettings[i]);
  }
  return newSettings;
}

module.exports = (function() {
  var getSettings = function(callback) {
    settings.findOne({machineName: machineName}, function(err, result) {
      if (typeof(callback) == 'function') {
        if (result != null) {
          var cleanedSettings = cleanSettings(result.settings);
          callback(err, cleanedSettings);
        } else {
          callback(null, DefaultSettings);
        }
      }
    });
  };
  
  var saveSettings = function(settingsToSave, callback) {
    settings.findOne({machineName: machineName}, function(err, result) {
      if(!err && result != null) {
        result.update({settings: settingsToSave}, function() {
          if (typeof(callback) == 'function') {
            callback();
          }
        });
      } else {
        var newSettings = new settings({
          machineName: machineName,
          settings: settingsToSave
        });
        newSettings.save(function() {
          if (typeof(callback) == 'function') {
            callback();
          }
        });
      }
    });
  };
  
  var getSetting = function(settingName, callback) {
    getSettings(function (err, settings) {
      if (!err) {
        var settingValue = null;
        for (var i = 0; i < settings.length; i++) {
          if (settings[i].name == settingName) {
            settingValue = settings[i].value;
            break;
          }
        }
        if (typeof(callback) == 'function') {
          callback(settingValue);
        }
      }
    });
  }
  return {
    getSettings: getSettings,
    getSetting: getSetting,
    saveSettings: saveSettings
  }
})();