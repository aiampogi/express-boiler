var apiController = require('../controllers/api');
var middleware = require('../middleware');
var passport = require('passport');


function api (app) {
   // any API routes should be done here.
   // for now, a page is displayed

	app.get('/api', apiController.getApi);
}

module.exports = api;