var express = require('express'),
  config = require('./config/config'),
  glob = require('glob'),
  mongoose = require('mongoose'),
  socket = require('socket.io');
  // Notifications = require('./app/modules/Notifications.js');

mongoose.connect(config.db);
var db = mongoose.connection;
db.on('error', function () {
  throw new Error('unable to connect to database at ' + config.db);
});

var models = glob.sync(config.root + '/app/models/*.js');
models.forEach(function (model) {
  require(model);
});
var app = express()

require('./config/express')(app, config);

//New Websockets initialization:
var server = require('http').Server(app);
// var io = socket(server);
server.listen(config.port);
// 
// io.on('connect', function(socket) {
//   console.log('Websockets Connected');
//   Notifications.addSocket(socket);
// });
// 
// io.on('disconnect', function(socket) {
//   Notifications.removeSocket(socket);
// });