/// <reference path="../typings/mongoose/mongoose.d.ts" />
var mongoose = require('mongoose');
module.exports = {
  //Will be dynamicaly compiled into a mongoose schema
  //Necessary metadata:
  // _id: mongoose.Types.ObjectId,
  machineName: String,
  //Machine settings:
  settings: [
    {
      name: String,
      value: mongoose.Schema.Types.Mixed
    }
  ]
}