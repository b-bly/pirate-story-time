var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');
var SALT_WORK_FACTOR = 10;

// Mongoose Schema
var UserSchema = new Schema({
    type: { type: String, required: true, index: { unique: true } },
    
},
    {
        collection: 'users'
    }
);


// Used by login methods to compare login form password to DB password
UserSchema.methods.comparePassword = function (candidatePassword, callback) {
    // 'this' here refers to this instance of the User model
    bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
        if (err) {
            return callback(err);
        }

        callback(null, isMatch);
    });
};


module.exports = mongoose.model('User', UserSchema);
