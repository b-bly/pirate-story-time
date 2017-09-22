myApp.controller('EditController', function (CardService, UserService) {
    console.log('EditController created');
    var self = this;
    self.userService = UserService;
    self.cardService = CardService;
    self.userObject = UserService.userObject;
    self.types = ['Villain', 'Environment', 'Item', 'Creature', 'Goal'];
    self.cards = CardService.cards;
   
    console.log('EditController cards');
    console.log(self.cards);


    //CardService.getUsersCards();


    self.updateACard = function (card) {
        return CardService.updateACard(card);
    }


}).config(function ($mdThemingProvider) {
    $mdThemingProvider.theme('Villain').backgroundPalette('light-green').dark();
    $mdThemingProvider.theme('Creature').backgroundPalette('orange').dark();
    $mdThemingProvider.theme('Environment').backgroundPalette('deep-purple').dark();
    $mdThemingProvider.theme('Item').backgroundPalette('blue').dark();
    $mdThemingProvider.theme('Goal', 'default')
        .primaryPalette('blue')
        .primaryPalette('pink')
        .accentPalette('orange')
        .backgroundPalette('grey');
});

