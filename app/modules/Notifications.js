module.exports = {
  sockets: [],
  
  
  
  addSocket: function (socket) {
    this.sockets.push(socket);
  },
  
  broadcast: function(eventName, data) {
    console.log('Sockets: ', this.sockets.length);
    this.sockets.forEach(function(socket) {
      socket.emit(eventName, data);
    });
  },
  
  //TODO: need to figure out how we are going to get a unique Id for each socket and have access to it per session.
  send: function(socketId, eventName, data) {
    this.sockets.forEach(function(socket) {
      // if (socket.)      
    });
  }
}