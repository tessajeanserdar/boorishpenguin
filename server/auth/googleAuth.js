
var apikeys = require('../config/apikeys.js');
var controller = require('../controllers/userControllers.js');

exports.ensureAuth = function (req, res, next){
  // isAuthenticated is provided function that checks if the user is logged in to google
  if (req.isAuthenticated()) { return next(); }
  // if logged in continue loading page
  res.redirect('/#/signin');
  // Doesn't work ^
  // otherwise redirect to signin
};

exports.signup = function (profileObj, callback){
  var user = {};

  user.name_last  = profileObj.profile.name.familyName;
  user.name_first = profileObj.profile.name.givenName;
  user.name = user.name_first + " " + user.name_last;
  user.email = profileObj.profile.emails[0].value;
  user.username = user.email;
  user.picture = profileObj.profile._json.image.url;
  // Email set as username to make sure each username is unique.
  // Usernames are used to find to find specific user(s) in the database
  // Suggested Improvement: Make this a token or id saved in the database for each user.

  // Other Attributes Google Provides that you may want to utilize
  // user.displayName = profileObj.profile.displayName;
  // user.gender = profileObj.profile.gender;
  // user.nickName = profileObj.profile._json.nickname;

  controller.newUser(user);
  // saves the new user to the database
  return callback(null, user);
};

exports.login = function (profileObj, callback){
  return callback(null, profileObj);
};
