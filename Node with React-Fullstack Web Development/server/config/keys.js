// figure out what set of credentials to return

if (process.env.NODE_ENV === 'production') {
    // return the production set of keys
    module.exports = require('./prod');
}
else {
    // return the dev keys
    module.exports = require('./dev');
}