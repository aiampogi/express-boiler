var express = require('express');
var server = require('./server');


// Create express server upon require
var app = express();


function startApp(){
	server(app);
	// Start express server
	app.listen(app.get('port'), function() {
	console.log("✔ Express server listening on port %d in %s mode", app.get('port'), app.settings.env);
	});
}

module.exports = startApp;
module.exports.expressApp = app;