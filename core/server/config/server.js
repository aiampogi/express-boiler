var path = require('path');
var hbs = require('express-hbs');
var helpers = require('../helpers')
var appRoot = path.resolve(__dirname, '../../../');

function setup (expressServer) {

	// TODO: delete this once HBS is complete
	expressServer.set('port', process.env.PORT || 3000);
	expressServer.set('views', path.join(appRoot, 'core/server/views'));
	expressServer.set('view engine', 'jade');

	// var hbsOptions = {};
	// expressServer.set('port', process.env.PORT || 3000);


	// hbsOptions = {
	//   partialsDir: [ path.join(appRoot, 'core/server/views/partials') ]
	// };
	// expressServer.set('main theme view engine', hbs.express3(hbsOptions));

	// expressServer.engine('hbs', expressServer.get('main theme view engine'));
	// expressServer.set('view engine', 'hbs');
	// expressServer.set('views', path.join(appRoot, 'core/server/views'));

	// helpers.loadCoreHelpers();
 //    // register connect-assets hbs helpers
 //    require('../helpers/connect-assets-hbs-helper')(expressServer);
}

module.exports = setup;