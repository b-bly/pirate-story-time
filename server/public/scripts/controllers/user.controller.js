myApp.controller('UserController', function (UserService, CardService) {
  console.log('UserController created');
  var self = this;
  self.userService = UserService;
  self.cardService = CardService;
  self.userObject = UserService.userObject;
  CardService.pirateverse = self.pirateverse;

  self.setGetFromPirateverse = function () {
    self.userService.setGetFromPirateverse(self.getFromPirateverse);
  }

}); //used with settings, about, addAcard, user
