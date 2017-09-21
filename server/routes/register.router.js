var express = require('express');
var router = express.Router();
var Users = require('../models/user.js');
var path = require('path');


// Handles request for HTML file
router.get('/', function (req, res, next) {
  console.log('get /register route');
  res.sendFile(path.resolve(__dirname, '../public/views/templates/register.html'));
});

// Handles POST request with new user data
router.post('/', function (req, res, next) {
  console.log('post /register route');
  /*
  username: {type: String, required: true, index: {unique: true}},
  password: {type: String, required: true},
  recipes: {type: Array}
  */
  var userToSave = {
    username: req.body.username,
    password: req.body.password,
    getstoryfrom: 'pirateverse'
  };
  
    Users.create(userToSave, function (err, post) {
      console.log('post /register -- User.create');
      if (err) {
        console.log('post /register -- User.create -- failure');
        res.sendStatus(500);
      } else {
        console.log('post /register -- User.create -- success');
        res.sendStatus(201);
      }
    });
  });

router.put('/getstoryfrom', function (req, res) {
  console.log('getstoryfrom post, req.body: ', req.body);
  //this will make sure that the user adding the item IS authenticated

  if (req.isAuthenticated()) {
    //console.log('authenticated user');
    let id = req.user._id;
    Users.findByIdAndUpdate(
      { _id: id },
      { $set: { getstoryfrom: req.body.getstoryfrom } },
      function (err, data) {
        if (err) {
          console.log('put error: ', err);
          res.sendStatus(500);
        } else {
          res.sendStatus(200);
        }
      }
    );
  } else { //user not authenticated
    res.sendStatus(403);
  };
});

router.put('/mydeck/:id', function (req, res) {
  console.log('user router put id: ');
  console.log(req.params.id);
  let cardId = req.params.id;
  if (req.isAuthenticated()) {
    let userId = req.user.id;
    console.log('userId');
    console.log(userId);

    Users.findByIdAndUpdate(
      { _id: userId },
      { $push: { mycards: cardId } },
      function (err, data) {
        if (err) {
          console.log('put error: ', err);
          res.sendStatus(500);
        } else {
          res.sendStatus(200);
        }
      }
    );
  } else {
    console.log('not logged in');
    res.sendStatus(403);
  }
});

router.put('/remove/:id', function (req, res) {
  console.log('user router put id: ');
  console.log(req.params.id);
  let cardId = req.params.id;
  if (req.isAuthenticated()) {
    let userId = req.user.id;
    console.log('userId');
    console.log(userId);

    Users.findByIdAndUpdate(
      { _id: userId },
      { $pull: { mycards: cardId } },
      function (err, data) {
        if (err) {
          console.log('put error: ', err);
          res.sendStatus(500);
        } else {
          res.sendStatus(200);
        }
      }
    );
  } else {
    console.log('not logged in');
    res.sendStatus(403);
  }
});

module.exports = router;
