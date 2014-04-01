var express = require('express');
var flash = require('express-flash');
var path = require('path');
var secrets = require('../config/secrets');
var passport = require('passport');
var passportConf = require('../config/passport');
var MongoStore = require('connect-mongo')(express);
var connectAssets = require('connect-assets');
var expressValidator = require('express-validator');
var appRoot = path.resolve(__dirname, '../../../');

var hour = 3600000;
var day = (hour * 24);
var month = (day * 30);

function middleware(app){

	// initialize passport singleton
	passportConf();

	app.use(connectAssets({
		paths: [path.join(appRoot, 'public/css'),
				path.join(appRoot, 'public/js'),
				path.join(appRoot, 'bower_components')],
		helperContext: app.locals
	}));

	app.use(express.compress());
	app.use(express.favicon());
	app.use(express.logger('dev'));
	app.use(express.cookieParser());
	app.use(express.json());
	app.use(express.urlencoded());
	app.use(expressValidator());
	app.use(express.methodOverride());
	app.use(express.session({
		secret: secrets.sessionSecret,
		store: new MongoStore({
			url: secrets.db,
			auto_reconnect: true
		})
	}));
	app.use(express.csrf());
	app.use(passport.initialize());
	app.use(passport.session());
	// after passport auth store these to res.locals to be accessed when rendering the views
	app.use(function(req, res, next) {
		res.locals.user = req.user;
		res.locals.token = req.csrfToken();
		res.locals.secrets = secrets;
		next();
	});
	app.use(flash());
	app.use(express.static(path.join(appRoot, 'public'), { maxAge: month }));
	app.use(function(req, res, next) {
		  // Keep track of previous URL
		  if (req.method !== 'GET') return next();
		  var path = req.path.split('/')[1];
		  if (/(auth|login|logout|signup)$/.test(path)) return next();
		  req.session.returnTo = req.path;
		  next();
		});
	// middleware to get the requested URL and use it when rendering the views (for HBS helpers especially)
	app.use(function (req, res, next) {
		res.locals.currentUrl = req.url;
		next();
	});
	app.use(app.router);
	app.use(function(req, res) {
		res.status(404);
		res.render('404');
	});
	app.use(express.errorHandler());
}

module.exports = middleware;
module.exports.isAuthenticated = passportConf.isAuthenticated;
module.exports.isAuthorized = passportConf.isAuthorized;
