const express = require('express');
const cors = require('cors');
const app = express();

const whitelist = ['http://localhost:3000', 'https://localhost:3443','http://localhost:3001', 'http://localhost:3006'];
var corsOptionsDelegate = (req, callback) => {
    var corsOptions;

    // !== -1 = not in the whitelist
    if (whitelist.indexOf(req.header('Origin')) !== -1) {
        corsOptions = { origin: true };
    }
    else {
        corsOptions = { origin: false };
    }
    callback(null, corsOptions);
};

// standard cors (no defined options)
exports.cors = cors();
// if we need to apply a particular route with sepecific options, we use the below
exports.corsWithOptions = cors(corsOptionsDelegate);