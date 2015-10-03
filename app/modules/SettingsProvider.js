/// <reference path="../../typings/mongoose/mongoose.d.ts" />
var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
  Settings = require('../../config/nodeCompareSettings.js'),
  DefaultSettings = require('../../config/nodeCompareDefaultSettings.js'),
  OS = require('os');
  


var schema = new Schema(Settings);
var settings = mongoose.model('settings', schema);
var machineName = OS.hostname();


module.exports = (function() {
  //Use constructor pattern
  
  var getSetting = function () {
    throw "Not Implemented";
  };
  
  var getSettings = function(callback) {
    settings.findOne({machineName: machineName}, function(err, result) {
      if (typeof(callback) == 'function') {
        if (result != null) {
          callback(err, result.settings);
        } else {
          //Generate a default
          // var defaultSettings = [];
          // for (var i = 0; i< Settings.settings.length; i++) {
          //   var defaultSetting = Settings.settings[i];
          //   defaultSetting.value = null;
          //   defaultSettings.push(defaultSetting);
          // }

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
  
  
  //Build the rest of this out here
  
  return {
    getSettings: getSettings,
    saveSettings: saveSettings
  }
  
})();