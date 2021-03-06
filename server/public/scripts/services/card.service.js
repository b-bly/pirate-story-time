myApp.service('CardService', ['$http', '$location', '$timeout', function ($http, $location, $timeout) {
    let self = this;
    self.types = ['Villain', 'Environment', 'Item', 'Creature', 'Goal'];
    self.cards = { list: [] };
    self.usersCards = { list: [] };
    self.storyCards = { list: [] };
    self.showMyCardsActions = true;
    self.url = { url: '' };
    self.class = { class: '' };
    let removeCancel = false;

    self.addACard = function (type, description, url, saveToPirateverse) {
        saveToPirateverse = saveToPirateverse ? saveToPirateverse : false;
        let card = new Card(type, description, url, saveToPirateverse);
        // console.log('card', card);

        console.log('addACard card services');
        console.log(card);

        $http.post('/card', card).then(function (response) {
            if (response.data) {
                // console.log('card service -- post -- success: ', response.data);
                // location works with SPA (ng-route)
                swal(
                    'That card is aboard now!',
                    'OK',
                    'success'
                )
                $location.path('/edit'); // http://localhost:5000/#/user

            } else {
                console.log('card service addACard error', response);
                self.message = "Error adding card!!";
            }
        });
    }

    //gets current user's cards
    self.getUsersCards = function () {
        //edit.html button ng-class variables
        self.myCards = true;

        self.showMyCardsActions = true;
        self.showPirateverseActions = false;
        self.showMyFavoritesActions = false;
        console.log('getUsersCards called');
        // getRequest('/card/userscards')
        $http.get('/card/userscards').then(function (response) {
            if (response.data) {
                //card(s) returned
                self.cards.list = response.data;
                self.cards.list.forEach(function (obj, i) {
                    self.cards.list[i].class = '';
                });
            } else {
                console.log('CardService -- getCards -- error');
                //to do: message to users: no cards!
            }
        });
    }

    //gets current user's favorites
    self.getMyFavorites = function () {
        self.showPirateverseActions = false;
        self.showMyCardsActions = false;
        self.showMyFavoritesActions = true;
        getRequest('/card/myfavorites')
    }

    //gets pirateverse cards
    self.getCards = function () {
        // console.log('getCards called');
        self.showPirateverseActions = true;
        self.showMyCardsActions = false;
        self.showMyFavoritesActions = false;
        $http.get('/card', { params: { limit: 10 } }).then(function (response) {
            if (response.data) {
                //card(s) returned
                self.cards.list = response.data;
                // console.log('cards.list');
                // console.log(self.cards.list);
            } else {
                console.log('CardService -- getCards -- error');
                //to do: message to users: no cards!
            }
        });
    }

    self.loadMore = function () {
        //modified from https://stackoverflow.com/questions/34463715/mongoose-limit-query-for-more-performance
        $http.get('/card/morepirateverse',
            { params: { limit: 10, skip: self.cards.list.length } })
            .then(function (data) {
                self.cards.list = self.cards.list.concat(data.data);
                console.log('self.cards.list load more');
                console.log(self.cards.list);
                console.log('loadMore data');
                console.log(data);
            });
    }

    self.deleteCard = function (id) {
        self.cards.list.forEach(function (obj, i) {
            if (obj._id == id) {
                self.cards.list[i].class = 'hinge animated';
            }
        });
        $timeout(function () {
            swal({
                title: 'Get your head out of your poop deck!',
                text: "Are you sure you want to feed this card to the croc?",
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Feed to croc'
            }).then(function () {
                swal(
                    'Yum!',
                    'Your file has been eaten',
                    'success'
                )
                $http.delete('/card/' + id).then(function (response) {
                    self.getUsersCards();
                });
            }, function (dismiss) {
                self.getUsersCards();

            });

        }, 1500);
    }
    // FILESTACK
    const apikey = 'A84ELWySuRZ6V4lWbEcn1z';
    self.fileStack = filestack.init(apikey);

    self.pick = function () {
        self.fileStack.pick({
            accept: ['image/*']
            //imageMax: [600, 400]]
            //fromSources: ['imagesearch'],
        }).then(result => {
            //console.log(JSON.stringify(result.filesUploaded));
            console.log(result);
            self.url.url = result.filesUploaded[0].url;
        });
    }

    self.updateACard = function (card) {
        var id = card._id;
        var card = new Card(card.type, card.description, self.url.url, card.savetopirateverse);

        $http.put('/card/mydeck/' + id, card).then(function (response) {
            swal(
                'Blistering barnacles! That card is up to date!',
                'OK',
                'success'
            )
            swal({
                title: 'Blistering barnacles! That card is up to date!',
                type: 'success',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'OK',
                html: $('<div>')
                    .addClass('some-class'),

                animation: false,
                customClass: 'animated bounceInDown'
            })
            self.getUsersCards();
        });
    }

    self.getStoryCards = function () {
        $http.get('/card/story').then(function (response) {
            if (response.data) {
                //card(s) returned
                let cards = response.data;
                let result = sortCards(cards);
                self.storyCards.list = [];
                result.forEach(function (obj, i) {

                    $timeout(function () {
                        self.storyCards.list.push(obj);
                        self.storyCards.list[i].class = 'animated slideInUp';
                    }, 1000 * i);
                });
            } else {
                console.log('CardService -- getCards -- error');
                //to do: message to users: no cards!

            }
        });
    }

    self.removeCard = function (cardId) {
        self.cards.list.forEach(function (obj, i) {
            if (obj._id == cardId) {
                self.cards.list[i].class = 'zoomOutDown animated';
            }
        });
        $timeout(function () {
            swal({
                title: 'Are you sure you\'ll be tossin\'n this card back to the Pirateverse?',

                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Remove this scurvy card!',
                html: $('<div>')
                    .addClass('some-class')
                    .text('You can always go looking for it again.'),
                animation: false,
                customClass: 'animated bounceInDown'
            }).then(function () {
                //runs on clicking 'OK'
                //errror: uncaught promise ???
                $http.put('/register/remove/' + cardId).then(function (response) {
                    self.getMyFavorites();
                    swal(
                        'Removed!',
                        'The pirateverse has absorbed your card.  You\'re next.',
                        'success'
                    )
                });
            }, function (dismiss) {
                //runs on clicking 'cancel'
                console.log('cancel path ran in remove');
                console.log('confirm');

                $http.get('/card/myfavorites').then(function (response) {
                    if (response.data) {
                        //card(s) returned
                        self.cards.list = response.data;

                        self.cards.list.forEach(function (obj, i) {
                            if (obj._id == cardId) {
                                self.cards.list[i].class = 'animated bounceIn';
                            }
                        });

                        // console.log('cards.list');
                        // console.log(self.cards.list);
                    } else {
                        console.log('CardService -- getCards -- error');
                        //to do: message to users: no cards!
                    }
                });

            });
        }, 1000);

    }

    self.addToMyDeck = function (cardId) {
        // console.log('addToMyDeck called, id:');
        // console.log(cardId);
        self.cards.list.forEach(function (obj, i) {
            if (obj._id == cardId) {
                self.cards.list[i].class = 'jello animated';
            }
        });
        $timeout(function () {
            $http.put('/register/mydeck/' + cardId).then(function (response) {
                swal({
                    title: 'It\'s aboard our ship now!',
                    html: $('<div>')
                        .addClass('some-class')
                        .text('You\'d better get aboard too, Captain!'),
                    animation: false,
                    customClass: 'animated bouncInDown'
                });
                self.getCards();
            });
        }, 1000);
    }

    function sortCards(cards) {
        let types = ['Villain', 'Environment', 'Item', 'Creature', 'Goal'];
        let result = [];
        //modified from https://stackoverflow.com/questions/13304543/javascript-sort-array-based-on-another-array
        //sorts based on order in "types" above.
        types.forEach(function (type) {
            let found = false;
            cards = cards.filter(function (card) {
                if (!found && card.type == type) {
                    result.push(card);
                    found = true;
                    return false;
                } else
                    return true;
            });
        });
        return result;
    }

    function getRequest(url) {
        $http.get(url).then(function (response) {
            if (response.data) {
                //card(s) returned
                self.cards.list = response.data;

                // console.log('cards.list');
                // console.log(self.cards.list);
            } else {
                console.log('CardService -- getCards -- error');
                //to do: message to users: no cards!
            }
        });
    }


    // swal({
    //     title: 'Are you sure?',
    //     text: "You won't be able to revert this!",
    //     type: 'warning',
    //     showCancelButton: true,
    //     confirmButtonColor: '#3085d6',
    //     cancelButtonColor: '#d33',
    //     confirmButtonText: 'Yes, delete it!'
    //   }).then(function () {
    //     swal(
    //       'Deleted!',
    //       'Your file has been deleted.',
    //       'success'
    //     )
    //   })

}]);