var _ = require('lodash');
var hbs = require('express-hbs');
var coreHelpers = {};
var registerHelpers;

coreHelpers.is_female = function (profile) {
    return profile.gender=='female';
};

coreHelpers.is_male = function (profile) {
    return profile.gender=='male';
};

coreHelpers.gravatar = function (user, options) {
    return user.gravatar(options.hash['size'], options.hash['defaults']);
};

// Register an async handlebars helper for a given handlebars instance
function registerAsyncHelper(hbs, name, fn) {
    hbs.registerAsyncHelper(name, function (options, cb) {
        // Wrap the function passed in with a when.resolve so it can
        // return either a promise or a value
        when.resolve(fn.call(this, options)).then(function (result) {
            cb(result);
        }).otherwise(function (err) {
            errors.logAndThrowError(err, "registerAsyncThemeHelper: " + name);
        });
    });
}

// Register a handlebars helper for themes
function registerThemeHelper(name, fn) {
    hbs.registerHelper(name, fn);
}

// Register an async handlebars helper for themes
function registerAsyncThemeHelper(name, fn) {
    registerAsyncHelper(hbs, name, fn);
}


registerHelpers = function () {
    // Register helpers
    registerThemeHelper('is_female', coreHelpers.is_female);
    registerThemeHelper('is_male', coreHelpers.is_male);
};

module.exports = coreHelpers;
module.exports.loadCoreHelpers = registerHelpers;
