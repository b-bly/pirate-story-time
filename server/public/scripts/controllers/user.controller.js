myApp.controller('UserController', function (UserService, CardService) {
  console.log('UserController created');
  var self = this;
  self.userService = UserService;
  self.cardService = CardService;
  self.userObject = UserService.userObject;
  CardService.pirateverse = self.pirateverse;
  self.getcardsfrom = ['myCards', 'myFavorites', 'pirateverse'];

  self.setGetFromPirateverse = function () {
    self.userService.setGetFromPirateverse();
  }

}); //used with settings, about, addAcard, user
