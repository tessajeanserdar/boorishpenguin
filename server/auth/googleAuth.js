var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var apikeys = require('../config/apikeys.js');

exports.ensureAuth = function (req, res, next){
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/auth/google');
};

exports.signup = function (profileObj, callback){
  var user = {};
  user.displayName = profileObj.profile.displayName;
  user.lastName = profileObj.profile.name.familyName;
  user.firstName = profileObj.profile.name.givenName;
  user.fullName = user.firstName+" "+user.lastName;
  user.email = profileObj.profile.emails[0].value;
  user.gender = profileObj.profile.gender;
  user.nickName = profileObj.profile._json.nickname;
  user.image = profileObj.profile._json.image.url;
  console.log(user);
  // save to database
  return callback(null, user);
};

exports.login = function (){
  //  if !user in database
  // redirect to signup
  return callback(null, user);
};

exports.serializeUser = function (){
  passport.serializeUser(function(user, done) {
    done(null, user);
  });

  passport.deserializeUser(function(obj, done) {
    done(null, obj);
  });
};

exports.oauth = function (){
  passport.use(new GoogleStrategy({
    clientID: apikeys.googleOauth.clientID,
    clientSecret: apikeys.googleOauth.clientSecret,
    callbackURL: "http://127.0.0.1:8001/auth/google/callback",
  },
    function(accessToken, refreshToken, profile, done) {
      // if signup
      exports.signup({profile: profile}, function (err, profile){
        return done(err, profile);
      });
      // if login 
      // exports.signup({profile: profile}, function (err, profile){
        // return done(err, profile)
      // });
    }
  ));
};