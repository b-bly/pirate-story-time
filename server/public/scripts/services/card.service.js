myApp.factory('CardService', function ($http, $location) {
    console.log('CardServoce Loaded');
    let card = new Card();
    let types = ['Villain', 'Environment', 'Item', 'Creature', 'Goal'];    

    return {
        card: card,
        types: types,

        addACard: function (type, description, url) {
            // $http.post('/card', cardObject).then(function (response) {
            //     if (response.data) {
            //         console.log('card service -- post -- success: ', response.data);
            //         // location works with SPA (ng-route)
            //         $location.path('/user'); // http://localhost:5000/#/user
            //     } else {
            //         console.log('', response);
            //         self.message = "Error adding card!!";
            //     }
            // });
            console.log('addCard called');
            
        }
    }
});