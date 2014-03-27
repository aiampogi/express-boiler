var homeController = require('../../controllers/home');
var userController = require('../../controllers/user');
var contactController = require('../../controllers/contact');
var middleware = require('../middleware');

function application (app)
{
 app.get('/', homeController.index);
 app.get('/login', userController.getLogin);
 app.post('/login', userController.postLogin);
 app.get('/logout', userController.logout);
 app.get('/forgot', userController.getForgot);
 app.post('/forgot', userController.postForgot);
 app.get('/reset/:token', userController.getReset);
 app.post('/reset/:token', userController.postReset);
 app.get('/signup', userController.getSignup);
 app.post('/signup', userController.postSignup);
 app.get('/contact', contactController.getContact);
 app.post('/contact', contactController.postContact);
 app.get('/account', middleware.isAuthenticated, userController.getAccount);
 app.post('/account/profile', middleware.isAuthenticated, userController.postUpdateProfile);
 app.post('/account/password', middleware.isAuthenticated, userController.postUpdatePassword);
 app.post('/account/delete', middleware.isAuthenticated, userController.postDeleteAccount);
 app.get('/account/unlink/:provider', middleware.isAuthenticated, userController.getOauthUnlink);
}

module.exports = application;