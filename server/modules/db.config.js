var mongoose = require('mongoose');

// Mongo Connection //
var mongoURI = '';
// process.env.MONGODB_URI will only be defined if you are running on Heroku
if (process.env.MONGODB_URI != undefined) {
    // use the string value of the environment variable
    mongoURI = process.env.MONGODB_URI;
} else {
    // use the local database server
    mongoURI = 'mongodb://localhost:27017/solo';
}



//added this or I get a promise error
mongoose.Promise = global.Promise;
// var mongoURI = "mongodb://localhost:27017/passport";
//var mongoDB = mongoose.connect(mongoURI).connection;

//trying to get rid of DeprecationWarning: 'open()'
var mongoDB = mongoose.connection.openUri(mongoURI)
    .once('open', () => console.log('Good to go !'))
    .on('error', (error) => {
        console.warn('Warning', error);
    });

// mongoDB.on('error', function (err) {
//     if (err) {
//         console.log("MONGO ERROR: ", err);
//     }
//     res.sendStatus(500);
// });

// mongoDB.once('open', function () {
//     console.log("Connected to Mongo!");
// });

module.exports = mongoDB;
