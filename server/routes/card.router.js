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

router.get('/userscards', function (req, res) {
    console.log('get /cards route');
    if (req.isAuthenticated()) {
        let username = req.user.username;
        Card.find({username: username}, function (err, data) {
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
        url: req.body.url,
        savetopirateverse: req.body.savetopirateverse
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

//would like to wrap this up in a function because the '/pirateverse' request is nearly identical 
//it just lacks the username parameter in the mongoose find.
router.get('/story', function (req, res) {
    //console.log('get /cards route');
    let types = ['Villain', 'Environment', 'Item', 'Creature', 'Goal'];
    let cards = [];
    if (req.isAuthenticated()) {
        //criteria.username = req.user.username
        let username = req.user.username;
        types.forEach((type, i) => {           
           // console.log('type: ', type);
            Card.findRandom({username: username, type: type }, {}, {}, function (err, data) {
                if (err) {
                    res.sendStatus(500);
                } else {
                    console.log('findOneRandomCard data loop #', i);
                    console.log(data);
                    if (data) cards.push(data[0]);
                    if (cards.length == 5) {
                        res.send(cards);
                    }
                }
            });
        });

    } else {
        console.log('not logged in');
        res.sendStatus(403);
    }
});

router.get('/storypirateverse', function (req, res) {
    console.log('get /cards route');
    let types = ['Villain', 'Environment', 'Item', 'Creature', 'Goal'];
    let cards = [];
    if (req.isAuthenticated()) {
        types.forEach((type, i) => {
            console.log('type: ', type);
            Card.findRandom({ type: type }, {}, {}, function (err, data) {
                if (err) {
                    res.sendStatus(500);
                } else {
                    console.log('findOneRandomCard data loop #', i);
                    console.log(data);
                    cards.push(data[0]);
                    if (cards.length == 5) {
                        res.send(cards);
                    }
                }
            });
        });

    } else {
        console.log('not logged in');
        res.sendStatus(403);
    }
});

//OLD GET USERCARDS FUNCTION
// router.get('/userscards', function (req, res) {
//     console.log('get /cards route');
//     let types = ['Villain', 'Environment', 'Item', 'Creature', 'Goal'];
//     let criteria = {
//         type: ''
//     };
//     if (req.isAuthenticated()) {
//         //criteria.username = req.user.username
//         let userInfo = {
//             username: req.user.username
//         };

//     findOneRandomCard(userInfo, function (err, data) {
//         if (err) {
//             res.sendStatus(500);
//         } else {
//             console.log('findOneRandomCard data');
//             console.log(data);
//             res.send(data);
//         }
//     });
// } else {
//         console.log('not logged in');
//         res.sendStatus(403);
//     }
// });

//this works searching based on type and username
// let types = ['Villain', 'Environment', 'Item', 'Creature', 'Goal'];
// let criteria = {
//     type: 'Environment'
// };
// let cards = { list: [] };
// if (req.isAuthenticated()) {
//     //criteria.username = req.user.username
//     criteria.username = req.user.username;

//     Card.findOne(criteria, function (err, data) {
//         if (err) {
//             console.log('card find error: ', err);
//             res.sendStatus(500);
//         } else {
//             console.log('USERCARDS data: ', data);

//             res.send(data);
//         }
//     });

// started getting promise error when using findOneRandomCard function
//(node:17920) DeprecationWarning: Mongoose: mpromise (mongoose's default promise library) is deprecated, plug in your own promise library instead: http://mongoosejs.com/docs/promises.html
// function findOneRandomCard(userInfo, callback) {
//     Card.count(userInfo, function (err, count) {
//         if (err) {
//             return callback(err);
//         } else {
//             var random = Math.floor(Math.random() * count);
//             //skip to a random card
//             Card.findOne(userInfo).skip(random).exec(callback);
//         }
//     });
// }
module.exports = router;