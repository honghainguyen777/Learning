const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const keys = require('./config/keys');
require('./models/User');
require('./services/passport');

mongoose.connect(keys.mongoURI);

// setup configuration 
const app = express();

// body-parser is used to parse incomming request bodies in a middleware
// before your handlers available under the req.body property
app.use(bodyParser.json());

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
// authRoutes(app); so require(...) here returns a function 
// --> (app) will be used in the returned function (see routes for how app is used)
require('./routes/authRoutes')(app);
require('./routes/billingRoutes')(app);

// express behaviors in production environment
if (process.env.NODE_ENV === 'production') {
    // Express will serve up production assets
    // like our main.js file or main.css file
    // speakingly, if a request comes into express, express will look for some specific files
    // if it is matched, then the below will serve
    app.use(express.static('client/build'));
    // if not, it will continue down the chain

    // Express will serve up the index.html file
    // if it doesn't recognize the route / no routes matched with the comming request
    const path = require('path');
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    })
}

// environment varibale of PORT, if not, use port 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT);