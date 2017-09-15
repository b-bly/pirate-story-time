myApp.controller('UserController', function(UserService, CardService) {
  console.log('UserController created');
  var self = this;
  self.userService = UserService;
  self.cardService = CardService;
  self.userObject = UserService.userObject;
  CardService.pirateverse = self.pirateverse;
}); //used with settings, about, addAcard, user
