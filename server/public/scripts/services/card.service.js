myApp.service('CardService', ['$http', '$location', function ($http, $location) {
    let self = this;
    self.types = ['Villain', 'Environment', 'Item', 'Creature', 'Goal'];
    self.cards = { list: [] };

    self.addACard = function (type, description, url) {
        let card = new Card(type, description, url);
        console.log('card', card);

        $http.post('/card', card).then(function (response) {
            if (response.data) {
                console.log('card service -- post -- success: ', response.data);
                // location works with SPA (ng-route)
                $location.path('/user'); // http://localhost:5000/#/user
            } else {
                console.log('card service addACard error', response);
                self.message = "Error adding card!!";
            }
        });
    }

    self.getCards = function () {
        console.log('getCards called');

        $http.get('/card').then(function (response) {
            if (response.data) {
                //card(s) returned
                self.cards.list = response.data;
                console.log('cards.list');
                console.log(cards.list);
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
    
}]);