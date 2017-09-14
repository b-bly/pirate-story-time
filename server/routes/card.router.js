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

router.get('/', function (req, res) {
    console.log('get /cards route');
    if (req.isAuthenticated()) {
        Card.find({}, function (err, data) {
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

router.delete('/:id', function (req, res) {
    let id = req.params.id;
    if (req.isAuthenticated()) {
        Card.findByIdAndRemove(
            { _id: id },
            function (err, data) {
                if (err) {
                    console.log('delete error: ', err);
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

router.put('/:id', function (req, res) {
    let card = {
        type: req.body.type,
        description: req.body.description,
        url: req.body.url
    };
    let id = req.params.id;

    if (req.isAuthenticated()) {

        Card.findByIdAndUpdate(
            { _id: id },
            { $set: card },
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

router.get('/userscards', function (req, res) {
    console.log('get /cards route');
    if (req.isAuthenticated()) {
        var userInfo = {
            username: req.user.username
        };
        Card.find(userInfo, function (err, data) {
            
            if (err) {
                console.log('card find error: ', err);
                res.sendStatus(500);
            } else {
                console.log('usercards data');
                console.log(data);
                
                
                res.send(data);
            }
        });
    } else {
        console.log('not logged in');
        res.sendStatus(403);
    }
});

module.exports = router;