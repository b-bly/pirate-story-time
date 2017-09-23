myApp.controller('StoryController', function($http, UserService, CardService) {
    var self = this;
    self.userService = UserService;
    self.cardService = CardService;
    self.userObject = UserService.userObject;
    // self.types = ['Villain', 'Environment', 'Item', 'Creature', 'Goal'];
    self.cards = CardService.cards;
    self.usersCards = CardService.storyCards;
    self.storyCards = CardService.storyCards;
    

}).config(function ($mdThemingProvider) {
    $mdThemingProvider.theme('Villain').backgroundPalette('green').dark();
    $mdThemingProvider.theme('Creature').backgroundPalette('deep-orange').dark();
    $mdThemingProvider.theme('Environment').backgroundPalette('deep-purple').dark();
    $mdThemingProvider.theme('Item').backgroundPalette('indigo').dark();
    $mdThemingProvider.theme('Goal', 'default')
        .primaryPalette('blue')
        .primaryPalette('pink')
        .accentPalette('orange')
        .backgroundPalette('grey');
});