exports.createSession = function (req, res, user)  {
  return req.session.regenerate(function() {
    req.session.user = user;
    res.redirect('/');
  });
};

exports.checkUser = function (req, res, next) {
  if (req.session && req.session.user) {
    next();
  } else {
    res.redirect('/signin'); //figure out angular page
  }
};
