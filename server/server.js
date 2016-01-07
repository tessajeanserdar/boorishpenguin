var express = require('express');
var bodyParser = require('body-parser');
var googleAuth = require('./auth/googleAuth.js')
var passport = require('passport')
var cookieParser = require('cookie-parser');
var session = require('express-session');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

var app = express();
var port = process.env.PORT || 8001;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/../client'));
app.use(cookieParser());
app.use(session({ secret: 'hi' , resave: true, saveUninitialized: false}));
app.use(passport.initialize());
app.use(passport.session());
require('./config/routes.js')(app, express, googleAuth.ensureAuth);

app.listen(port);
module.exports = app;

googleAuth.serializeUser();
googleAuth.oauth();

