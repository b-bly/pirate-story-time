myApp.controller('CardService', 'UserService', function(CardService, UserService) {
    console.log('CardController created');
    var self = this;
    self.userService = UserService;
    self.cardService = CardService;
    self.userObject = UserService.userObject;
    self.types = cardService.card.types;
  }); //used with settings, about, addAcard, user
  