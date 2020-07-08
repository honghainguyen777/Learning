const passport = require('passport');

module.exports = app => {
    app.get(
        '/auth/google',
        passport.authenticate('google', {
            scope: ['profile', 'email']
        })
    );
    
    // get accesstoken responded from google auth and proceed it
    app.get(
        // after user comes back from google auth flow
        '/auth/google/callback',
        // authenticate the user in the server side
        passport.authenticate('google'),
        // pass the request to the next handler
        (req, res) => {
            // redirect to surveys route
            res.redirect('/surveys');
        }
    );

    app.get('/api/logout', (req, res) => {
        req.logout();
        res.redirect('/');
    });

    app.get('/api/current_user', (req, res) => {
        res.send(req.user);
    });
};