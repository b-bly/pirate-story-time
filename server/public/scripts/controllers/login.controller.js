myApp.controller('LoginController', function($http, $location, UserService) {
    console.log('LoginController created');
    
    var self = this;
    self.userService = UserService;
    self.user = {
      username: '',
      email: '',
      password: '',
      passwordConfirm: ''
    };
    self.message = '';

    self.login = function() {
      console.log('LoginController -- login');
      if(self.user.username === '' || self.user.password === '') {
        self.message = "Enter your username and password, ye scurvy dog!";
      }  else {
        console.log('LoginController -- login -- sending to server...', self.user);
        $http.post('/', self.user).then(function(response) {
          if(response.data.username) {
            console.log('LoginController -- login -- success: ', response.data);
            // location works with SPA (ng-route)
            $location.path('/story'); // http://localhost:5000/#/user
          } else {
            console.log('LoginController -- login -- failure: ', response);
            self.message = "Wrong username or password.  Try again!";
          }
        }).catch(function(response){
          console.log('LoginController -- registerUser -- failure: ', response);
          self.message = "Wrong username or password.  Try again.";
        });
        self.message = '';
      }
    };

    self.registerUser = function() {
      console.log('LoginController -- registerUser');
      if(self.user.username === '' || self.user.password === '') {
        self.message = "Choose a username and password!";
      // } else if (self.user.password != self.user.passwordConfirm) {
      //   self.message = "Arr, the passwords don't match!"
      } else {
        console.log('LoginController -- registerUser -- sending to server...', self.user);
        $http.post('/register', self.user).then(function(response) {
          console.log('LoginController -- registerUser -- success');
          $location.path('/login');
        }).catch(function(response) {
          console.log('LoginController -- registerUser -- error');
          self.message = "Please try again."
        });
      }
    }

    self.logout = function() {
      UserService.logout();
    }

 
});
