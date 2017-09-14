myApp.controller('EditController', function (CardService, UserService) {
    console.log('EditController created');
    var self = this;
    self.userService = UserService;
    self.cardService = CardService;
    self.userObject = UserService.userObject;
    self.types = ['Villain', 'Environment', 'Item', 'Creature', 'Goal'];
    self.cards = CardService.cards;
    
    
    self.deleteCard = function (id) {
        return CardService.deleteCard(id);
      }

    self.updateACard = function (currentCardId) {
        return CardService.updateACard(currentCardId, self.type, self.description, self.url, self.saveToPirateverse);
    }
}).config(function($mdThemingProvider) {
    $mdThemingProvider.theme('dark-grey').backgroundPalette('grey').dark();
    $mdThemingProvider.theme('dark-orange').backgroundPalette('orange').dark();
    $mdThemingProvider.theme('dark-purple').backgroundPalette('deep-purple').dark();
    $mdThemingProvider.theme('dark-blue').backgroundPalette('blue').dark();
  }); 

