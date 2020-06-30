var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('./models/user');

// if we dont use passport-local-mongoose, we can add our own user authentication function inside LocalStratery(function here)
passport.use(new LocalStrategy(User.authenticate()));
// serialize users
passport.serializeUser(User.serializeUser());
// deserialize users
passport.deserializeUser(User.deserializeUser());