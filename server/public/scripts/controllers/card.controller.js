myApp.controller('CardController', function(CardService, UserService) {
    console.log('CardController created');
    var self = this;
    self.userService = UserService;
    self.cardService = CardService;
    self.userObject = UserService.userObject;
    self.usersCards = CardService.usersCards;
    self.types = ['Villain', 'Environment', 'Item', 'Creature', 'Goal'];   
    
    self.addACard = function () {
      return CardService.addACard(self.type, self.description, self.url, self.saveToPirateverse);
    } 
  }); //used with settings, about, addAcard, user
  