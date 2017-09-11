myApp.controller('UserController', function(UserService) {
  console.log('UserController created');
  var self = this;
  self.userService = UserService;
  self.userObject = UserService.userObject;
  self.types = userService.cardObject.type;
}); //used with settings, about, addAcard, user
