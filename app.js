var express = require('express'),
  config = require('./config/config'),
  glob = require('glob'),
  mongoose = require('mongoose'),
  socket = require('socket.io')

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

var server = require('http').Server(app);
var io = socket(server);
server.listen(config.port);

io.on('connect', function(socket) {
  console.log('Connected');
});