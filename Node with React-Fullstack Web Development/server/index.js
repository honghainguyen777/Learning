const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('./config/keys');

// setup configuration 
const app = express();

// GoogleStratery creates an instance of google passport stratery
passport.use(
    new GoogleStrategy(
        {
            clientID: keys.googleClientID,
            clientSecret: keys.googleClientSecret,
            callbackURL: '/auth/google/callback'
        },
        (accessToken, refreshToken, profile, done) => {
            console.log('access token: ', accessToken);
            console.log('refresh token: ', refreshToken);
            console.log('profile: ', profile);
        }
    )
);

app.get('/auth/google', passport.authenticate('google', {
    scope: ['profile', 'email']
}));

// get accesstoken responded from google auth and proceed it
app.get('/auth/google/callback', passport.authenticate('google'));

// environment varibale of PORT, if not, use port 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT);