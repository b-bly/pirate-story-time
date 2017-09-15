myApp.service('CardService', ['$http', '$location', function ($http, $location) {
    let self = this;
    self.types = ['Villain', 'Environment', 'Item', 'Creature', 'Goal'];
    self.cards = { list: [] };
    self.usersCards = { list: [] };
    self.storyCards = { list: [] };

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
                $location.path('/user'); // http://localhost:5000/#/user
            } else {
                console.log('card service addACard error', response);
                self.message = "Error adding card!!";
            }
        });
    }

    self.getCards = function () {
        // console.log('getCards called');

        $http.get('/card').then(function (response) {
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

    self.deleteCard = function (id) {
        console.log('deleteCard clicked, id: ');
        console.log(id);
        //to do: add alert

        $http.delete('/card/' + id).then(function (response) {
            self.getCards();
            $location.path('/edit');
            //why doesn't the location.path loading edit show that the card has been deleted?
        });
    }

    self.updateACard = function (card) {

        var card = new Card(card);
        var id = card._id;
        console.log('updateACard');
        console.log(card);
        
        
        $http.put('/card/' + id, card).then(function (response) {
            alert('Success! card updated!');
            self.getCards();
        });
    }

    self.getUsersCards = function () {
        console.log('getUsersCards called pirateverse: ');
        console.log(self.pirateverse);
        
        if (self.pirateverse == true) {
            //get data from all of pirateverse
            console.log('you\'ve entered the pirateverse!');
            
            $http.get('/card/pirateverse').then(function (response) {
                if (response.data) {
                    //card(s) returned
                    let cards = response.data;
                    let result = sortCards(response.data);
                    self.storyCards.list = result;
                } else {
                    console.log('CardService -- getCards -- error');
                    //to do: message to users: no cards!
                }
            });
        } else {
            console.log('not the pirateverse getusercards');
            
            $http.get('/card/userscards').then(function (response) {
                if (response.data) {
                    //card(s) returned
                    let cards = response.data;
                    let result = sortCards(response.data);
                    self.storyCards.list = result;
                } else {
                    console.log('CardService -- getCards -- error');
                    //to do: message to users: no cards!
                }
            });
        }
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
}]);