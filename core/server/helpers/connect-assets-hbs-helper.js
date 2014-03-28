var hbs, safeImg;

hbs = require('express-hbs');


function register(app) {

  hbs.registerHelper('css', function(path) {
    return new hbs.handlebars.SafeString(app.locals.css(path));
  });

  hbs.registerHelper('js', function(path) {
    return new hbs.handlebars.SafeString(app.locals.js(path));
  });

  hbs.registerHelper('img', function(path) {
    return new hbs.handlebars.SafeString(app.locals.img(path));
  });
}


module.exports = register;