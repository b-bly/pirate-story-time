myApp.controller('MyCardsController', function (CardService, UserService) {
    console.log('MyCardsController created');
    var self = this;
    self.userService = UserService;
    self.cardService = CardService;
    self.userObject = UserService.userObject;
    self.types = ['Villain', 'Environment', 'Item', 'Creature', 'Goal'];
    self.cards = CardService.cards;
    console.log('MyCardsController cards');
    console.log(self.cards);

    self.deleteCard = function (id) {
        return CardService.deleteCard(id);
    }
    self.updateACard = function (card) {
        return CardService.updateACard(card);
    }
}).config(function ($mdThemingProvider) {
    $mdThemingProvider.theme('dark-grey').backgroundPalette('grey').dark();
    $mdThemingProvider.theme('dark-orange').backgroundPalette('orange').dark();
    $mdThemingProvider.theme('dark-purple').backgroundPalette('deep-purple').dark();
    $mdThemingProvider.theme('dark-blue').backgroundPalette('blue').dark();
    $mdThemingProvider.theme('docs-dark', 'default')
        .primaryPalette('blue')
        .primaryPalette('pink')
        .accentPalette('orange')
        .backgroundPalette('grey');
});

