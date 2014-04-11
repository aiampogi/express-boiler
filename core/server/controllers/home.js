/**
 * GET /
 * Home page.
 */

exports.index = function(req, res) {
  res.render('emberHome', {
    title: 'Home'
  });
};
