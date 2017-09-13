myApp.factory('CardService', function ($http, $location) {
    console.log('CardServoce Loaded');
    let card = {};
    let types = ['Villain', 'Environment', 'Item', 'Creature', 'Goal'];
    let cards = { list: [] };

    return {
        card: card,
        types: types,
        cards: cards,

        addACard: function (type, description, url) {


            card = new Card(type, description, url);
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
        },

        getCards: function () {
            console.log('getCards called');

            $http.get('/card').then(function (response) {
                if (response.data) {
                    //card(s) returned
                    cards.list = response.data;
                    console.log('cards.list');
                    console.log(cards.list);
                } else {
                    console.log('CardService -- getCards -- error');
                    //to do: message to users: no cards!
                }
            });

        }
    }
});