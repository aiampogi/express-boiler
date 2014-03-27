 var secrets = require('../../config/secrets');
 var mongoose = require('mongoose');

 function init() {
	mongoose.connect(secrets.db);
	mongoose.connection.on('error', function() {
		console.error('✗ MongoDB Connection Error. Please make sure MongoDB is running.');
	});
 }

 module.exports.init = init;