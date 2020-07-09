const mongoose = require('mongoose');
const { Schema } = mongoose;


const recipientSchema = new Schema({
    email: String,
    responsed: {type: Boolean, default: false}
});

// we dont need to push this Schema on mongoose models
module.exports = recipientSchema;