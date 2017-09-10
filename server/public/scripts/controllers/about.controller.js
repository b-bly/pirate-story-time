myApp.controller('AboutController', function(UserService) {
  console.log('AboutController created');
  var self = this;
  self.userService = UserService;
});
