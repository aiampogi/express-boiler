var path 			= require('path'),
    appRoot			= path.resolve(__dirname, '../../../');

function setup (app) {
	app.set('port', process.env.PORT || 3000);
	app.set('views', path.join(appRoot, 'core/server/views'));
	app.set('view engine', 'jade');
}

module.exports = setup;
