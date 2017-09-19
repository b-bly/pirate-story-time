myApp.factory('UserService', function ($http, $location) {
  console.log('UserService Loaded');
  var userObject = { data: {} };

  return {
    userObject: userObject,

    getuser: function () {
      $http.get('/user').then(function (response) {
        if (response.data.username) {
          // user has a curret session on the server
          userObject.data = response.data;
          // console.log('userObject');
          // console.log(userObject);
        } else {
          console.log('UserService -- getuser -- failure');
          // user has no session, bounce them back to the login page
          $location.path("/login");
        }
      }, function (response) {
        console.log('UserService -- getuser -- failure: ', response);
        $location.path("/login");
      });
    },

    logout: function () {
      console.log('UserService -- logout');
      $http.get('/user/logout').then(function (response) {
        console.log('UserService -- logout -- logged out');
        $location.path("/login");
      });
    },

    setGetFromPirateverse: function (saveToPirateverse) {
      $http.put('/register/getfrompirateverse', saveToPirateverse).then(function (response) {
        console.log('user service -- update getfrompirateverse -- success');
        console.log(response);
        
        //send alert of success?
      });
    },

    addToMyDeck: function (cardId) {
      // console.log('addToMyDeck called, id:');
      // console.log(cardId);
      
      $http.put('/register/mydeck/' + cardId).then(function (response) {
        alert('Success! card updated!');
        self.getCards();
      });
    }

  }; //return obj
}); //closing factory

