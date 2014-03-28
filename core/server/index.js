/**
* Module dependencies.
*/

var path = require('path');
var middleware = require('./middleware');
var routes = require('./routes');
var db = require('./database');
var serverConfig = require('./config/server');


function init(app) {
  // Mongoose configuration.
  db.init();

  // Express configuration.
  serverConfig(app);

  // Hook middlewares
  middleware(app);

  // Application routes.
  routes.application(app);
  routes.api(app);
}

module.exports = init;
