var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var passport = require('./strategies/mongo.localstrategy');
var sessionConfig = require('./modules/session.config');

//DB Module
var db = require('./modules/db.config.js');

// Route includes
var indexRouter = require('./routes/index.router');
var userRouter = require('./routes/user.router');
var registerRouter = require('./routes/register.router');
var cardRouter = require('./routes/card.router');

var port = process.env.PORT || 5000;

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Serve back static files
app.use(express.static('./server/public'));

// Passport Session Configuration
app.use(sessionConfig);

// Start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/register', registerRouter);
app.use('/user', userRouter);
app.use('/card', cardRouter);

// Catch all bucket, must be last!
app.use('/', indexRouter);

//heroku db setup
// var mongoose = require('mongoose');

// var databaseURI = '';
// // process.env.MONGODB_URI will only be defined if you are running on Heroku
// if(process.env.MONGODB_URI != undefined) {
//     // use the string value of the environment variable
//     databaseURI = process.env.MONGODB_URI;
// } else {
//     // use the local database server
//     databaseURI = 'mongodb://localhost:27017/piratetime';
// } 

// mongoose.connect(databaseURI);

// Listen //
app.listen(port, function(){
   console.log('Listening on port:', port);
});
