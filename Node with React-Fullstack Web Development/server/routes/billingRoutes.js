const keys = require('../config/keys');
// to access to the Stripe API from applications written in server-side JS
// use stripe package in npmjs.com
const stripe = require('stripe')(keys.stripeSecretKey);
const requireLogin = require('../middlewares/requireLogin');

module.exports = app => {
    app.post('/api/stripe', requireLogin, async (req, res) => {
        // this stripe.charges.create will return a promise
        const charge = await stripe.charges.create({
            amount: 500,
            currency: 'usd',
            description: '$5 for 5 credits',
            source: req.body.id
        });
        
        req.user.credits += 5;
        const user = await req.user.save();

        res.send(user);
    });
};