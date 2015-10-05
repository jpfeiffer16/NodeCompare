/// <reference path="../../typings/mongoose/mongoose.d.ts" />
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    Settings = require('../../config/nodeCompareSettings.js'),
    DefaultSettings = require('../../config/nodeCompareDefaultSettings.js'),
    OS = require('os'),
    schema = new Schema(Settings),
    settings = mongoose.model('settings', schema),
    machineName = OS.hostname();

module.exports = (function() {
  var getSettings = function(callback) {
    settings.findOne({machineName: machineName}, function(err, result) {
      if (typeof(callback) == 'function') {
        if (result != null) {
          callback(err, result.settings);
        } else {
          //TODO: Make this more robust
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