var express = require('express');
var router = express.Router();
var Card = require('../models/card.js');
var path = require('path');


router.post('/', function (req, res) {
    console.log('hit card post, req.body: ', req.body);
    //this will make sure that the user adding the item IS authenticated
    let card = new Card(req.body);
    if (req.isAuthenticated()) {
        //console.log('authenticated user');
        card.username = req.user.username;
        card.save(function (err, data) { 
            if (err) {
                console.log('error saving item:', err);
                res.sendStatus(500);
            } else { //item successfull added to DB
                res.sendStatus(201);
            }
        });
    } else { //user not authenticated
        res.sendStatus(403);
    };
});

router.get('/', function(req, res) {
    console.log('get /cards route');
    if(req.isAuthenticated()) {
        Card.find({}, function(err, data) {
            if (err) {
                console.log('card find error: ', err);
                res.sendStatus(500);
            } else {          
                res.send(data);
            }
        });
    } else {
      console.log('not logged in');
      res.sendStatus(403);
    }
  });

module.exports = router;