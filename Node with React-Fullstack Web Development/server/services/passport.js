const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('users');

// serialize mongo model instance - user into user.id (use in cookie)
passport.serializeUser((user, done) => {
    done(null, user.id);
});

// deserialize user.id (inside cookie) into mongo model instance - user
passport.deserializeUser((id, done) => {
    User.findById(id)
    .then(user => {
        done(null, user);
    })
});

// GoogleStratery creates an instance of google passport stratery
passport.use(
    new GoogleStrategy(
        {
            clientID: keys.googleClientID,
            clientSecret: keys.googleClientSecret,
            callbackURL: '/auth/google/callback',
            proxy: true
        },
        async (accessToken, refreshToken, profile, done) => {
            const existingUser = await User.findOne({ googleId: profile.id });
            if (!existingUser) {
                const user = await new User({ googleId: profile.id }).save();
                done(null, user);
            }
            done(null, existingUser);
        }
    )
);