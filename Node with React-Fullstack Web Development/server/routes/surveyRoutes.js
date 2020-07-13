const _ = require('lodash');
const { Path } = require('path-parser');
const { URL } = require('url');
const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate')

const Survey = mongoose.model('surveys');

module.exports = app => {
    app.get('/api/surveys/thanks', (req, res) => {
        res.send('Thanks for voting!');
    });

    app.post('/api/surveys/webhooks', (req, res) => {
        const p = Path.createPath('/api/surveys/:surveyId/:choice');

        _.chain(req.body)
            .map(({ email, url }) => {
                const match = p.test(new URL(url).pathname);
                if (match) {
                    return { email, surveyId: match.surveyId, choice: match.choice };
                }
            })
            .compact()
            .uniqBy('email', 'surveyId')
            .each(({ surveyId, email, choice }) => {
                Survey.updateOne({
                    // find the survey with given ID
                    _id: surveyId,
                    // in the surveym, find an element that has the same email as given. The recipient should not response before
                    recipients: {
                        $elemMatch: { email: email, responded: false }
                    }
                }, {
                    // if the above conditions matched, increase the choice (yes, no) by 1
                    $inc: { [choice]: 1},
                    // and set the responded to be true, $ here means the element that match (line up with $eleMatch)
                    $set: { 'recipients.$.responded': true}
                }).exec(); // execute the query
            })
            .value();
        
        // already written in chain of lodash (chain of map, compact, uniBy)
        // remove all elements that are undefined
        // const compactEvents = _.compact(events);
        // remove all duplicated in both email and surveyId
        // const uniqueEvents = _.uniqBy(compactEvents, 'email', 'surveyId');
        res.send({});
    });

    app.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {
        const { title, subject, body, recipients } = req.body;

        const survey = new Survey({
            title,
            subject,
            body,
            recipients: recipients.split(',').map(email => ({ email: email.trim() })),
            _user: req.user.id,
            dateSent: Date.now()
        });

        // Place to send an email!
        const mailer = new Mailer(survey, surveyTemplate(survey));

        try {
            await mailer.send();
            await survey.save();

            // get 1 credit from the user
            req.user.credits -= 1;
            const user = await req.user.save();
            res.send(user);
        } catch (err) {
            res.status(422).send(err);
        }
        
    });
};