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

coreHelpers.is_active = function (currentUrl, commaSeparatedUrls, className) {
    var urlList = commaSeparatedUrls.split(',');
    var isActive = false;
    _.forEach(urlList, function(url){
        if(url === currentUrl){
            isActive = true;
            return false;
        }
    });

    if(isActive) {
        return new hbs.SafeString(className);
    }
    else {
        return undefined;
    }
};

coreHelpers.get_name = function (user) {
    return user.profile.name || user.email || user.id;
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


registerHelpers = function (expressApp) {
    // Register helpers
    registerThemeHelper('is_female', coreHelpers.is_female);
    registerThemeHelper('is_male', coreHelpers.is_male);
    registerThemeHelper('gravatar', coreHelpers.gravatar);
    registerThemeHelper('is_active', coreHelpers.is_active);
    registerThemeHelper('get_name', coreHelpers.get_name);
};

module.exports = coreHelpers;
module.exports.registerHelpers = registerHelpers;
