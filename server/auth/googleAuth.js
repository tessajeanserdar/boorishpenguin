
var apikeys = require('../config/apikeys.js');
var controller = require('../controllers/userControllers.js');

exports.ensureAuth = function (req, res, next){
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/auth/google');
};

exports.signup = function (profileObj, callback){
  var user = {};
  // user.displayName = profileObj.profile.displayName;
  user.name_last  = profileObj.profile.name.familyName;
  user.name_first = profileObj.profile.name.givenName;
  user.name = user.firstName+" "+user.lastName;
  user.email = profileObj.profile.emails[0].value;
  user.username = user.email;
  // user.gender = profileObj.profile.gender;
  // user.nickName = profileObj.profile._json.nickname;
  user.picture = profileObj.profile._json.image.url;
  controller.newUser(user);
  // save to database
  // res.redirect('auth/party');
  // username = email 
  // email = email
  // image = image
  // name = fullName
  return callback(null, user);
};

exports.login = function (profileObj, callback){
  return callback(null, user);
};

// exports.serializeUser = function (){

// };

// exports.oauth = function (){

// };