var express = require('express');
var router = express.Router();
var Card = require('../models/card.js');
var path = require('path');


router.post('/', function (req, res) {
    console.log('hit card post', req.body);
    //this will make sure that the user adding the item IS authenticated
    // if (req.isAuthenticated()) {
    //     console.log('authenticated user');
    //     var itemToSave = new Item(req.body);
    //     itemToSave.placer = req.user.username;
    //     itemToSave.save(function (err, data) { 
    //         if (err) {
    //             console.log('error saving item:', err);
    //             res.sendStatus(500);
    //         } else { //item successfull added to DB
    //             res.sendStatus(201);
    //         }
    //     });
    // } else { //user not authenticated
    //     res.sendStatus(403);
    // };
});