var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('./models/user');
var JwtStratery = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var jwt = require('jsonwebtoken');

var config = require('./config');
const e = require('express');

// if we dont use passport-local-mongoose, we can add our own user authentication function inside LocalStratery(function here)
passport.use(new LocalStrategy(User.authenticate()));
// serialize users
passport.serializeUser(User.serializeUser());
// deserialize users
passport.deserializeUser(User.deserializeUser());

// in real app, expiresIn could be a few days (users have to authenticate again)
exports.getToken = function(user) {
    return jwt.sign(user, config.secretKey,
        {expiresIn: 3600});
};

var opts = {};
// Authentication header as bearer token
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = config.secretKey;

exports.jwtPassport = passport.use(new JwtStratery(opts,
    (jwt_payload, done) => {
        console.log("JWT payload: ", jwt_payload);
        User.findOne({_id: jwt_payload._id}, (err, user) => {
            if (err) {
                return done(err, false);
            }
            else if (user) {
                return done(null, user);
            }
            else {
                return done(null, false);
            }
        });
    }));

// verify incomming users
exports.verifyUser = passport.authenticate('jwt', {session: false});

// verify admin
exports.verifyAdmin = (req, res, next) => {
    if (req.user.admin) {
        return next();
    }
    else {
        var err = new Error("You are not authorized to perform this operation!");
        err.status = 403;
        return next(err);
    }
}
