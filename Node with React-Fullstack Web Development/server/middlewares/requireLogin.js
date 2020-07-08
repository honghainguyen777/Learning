// next is a function to pass the request to another middleware in chain
module.exports = (req, res, next) => {
    if (!req.user) {
        return res.status(401).send({ error: 'You must log in!'});
    }
    // if user is logged in, go to another middleware
    next();
};