var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');
var SALT_WORK_FACTOR = 10;

// Mongoose Schema
//match regexp //https://stackoverflow.com/questions/3809401/what-is-a-good-regular-expression-to-match-a-url
var CardSchema = new Schema({
    type: { type: String, required: true },
    description: { type: String, required: true },
    url: { type: String, required: false } 
},
    {
        collection: 'cards'
    }
);


module.exports = mongoose.model('cards', CardSchema);
