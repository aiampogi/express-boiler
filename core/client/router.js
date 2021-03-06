/*global Ember */

// ensure we don't share routes between all Router instances
var Router = Ember.Router.extend();

Router.reopen({
    location: 'auto', // use HTML5 History API instead of hash-tag based URLs
    rootURL: '/' // admin interface lives under sub-directory /ghost
});

Router.map(function () {
    this.route('about');
    // this.route('signin');
    // this.route('signup');
    // this.route('forgotten');
    // this.route('reset', { path: '/reset/:token' });
    // this.resource('posts', { path: '/' }, function () {
    //     this.route('post', { path: ':post_id' });
    // });
    // this.resource('editor', { path: '/editor/:post_id' });
    // this.route('new', { path: '/editor' });
    // this.resource('settings', function () {
    //     this.route('general');
    //     this.route('user');
    //     this.route('debug');
    //     this.route('apps');
    // });
});

export default Router;