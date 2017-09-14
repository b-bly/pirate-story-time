var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');
var SALT_WORK_FACTOR = 10;
var random = require('./mongoose-simple-random');

// Mongoose Schema
//match regexp //https://stackoverflow.com/questions/3809401/what-is-a-good-regular-expression-to-match-a-url
var CardSchema = new Schema({
    type: { type: String, required: true },
    description: { type: String, required: true },
    url: { type: String, required: false },
    savetopirateverse: { type: Boolean, required: true },
    username: { type: String, required: true}
},
    {
        collection: 'cards'
    }
);

//plugin from https://github.com/larryprice/mongoose-simple-random
CardSchema.plugin(random);

module.exports = mongoose.model('cards', CardSchema);
