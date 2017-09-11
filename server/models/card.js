var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');
var SALT_WORK_FACTOR = 10;

// Mongoose Schema
var CardSchema = new Schema({
    type: { type: String, required: true, index: { unique: true } },
    
},
    {
        collection: 'cards'
    }
);


module.exports = mongoose.model('cards', CardSchema);
