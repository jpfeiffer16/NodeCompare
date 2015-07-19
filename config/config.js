var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'nodecompare'
    },
    port: 3000,
    db: 'mongodb://admin:admin@ds031601.mongolab.com:31601/nodecompare'
  },

  test: {
    root: rootPath,
    app: {
      name: 'nodecompare'
    },
    port: 3000,
    db: 'mongodb://admin:admin@ds031601.mongolab.com:31601/nodecompare'
  },

  production: {
    root: rootPath,
    app: {
      name: 'nodecompare'
    },
    port: 3000,
    db: 'mongodb://admin:admin@ds031601.mongolab.com:31601/nodecompare'
  }
};

module.exports = config[env];
