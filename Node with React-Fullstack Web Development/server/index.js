const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');
require('./models/User');
require('./services/passport');

mongoose.connect(keys.mongoURI);

// setup configuration 
const app = express();

// make use of cookie inside of our application
app.use(
    // cookie session (that used here) stores date in the cookie
    // express session stores all the data in remote server side data store out side cookie 
    // with express session, we can store large amout of data
    // with cookie session, we can store around 4 kB
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: [keys.cookieKey]
    })
);
app.use(passport.initialize());
app.use(passport.session());

// short version of: const authRoutes = require('./routes/authRoutes');
// authRoutes(app);
require('./routes/authRoutes')(app);

// environment varibale of PORT, if not, use port 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT);