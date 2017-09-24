myApp.controller('StoryController', function($timeout, UserService, CardService) {
    var self = this;
    self.userService = UserService;
    self.cardService = CardService;
    self.userObject = UserService.userObject;
    // self.types = ['Villain', 'Environment', 'Item', 'Creature', 'Goal'];
    self.cards = CardService.cards;
    self.usersCards = CardService.storyCards;
    self.storyCards = CardService.storyCards;
    
    // CardService.storyCards.list.forEach(function(obj, i) {
    //     $timeout(function() {
    //         self.storyCards.list[i] = obj;
    //         self.storyCards.list[i].class = 'animated pulse';
    //     }, 500);
    // });
        
  

}).config(function ($mdThemingProvider) {
    $mdThemingProvider.theme('Villain').backgroundPalette('green');
    $mdThemingProvider.theme('Creature').backgroundPalette('brown').dark();
    $mdThemingProvider.theme('Environment').backgroundPalette('deep-purple').dark();
    $mdThemingProvider.theme('Item').backgroundPalette('indigo').dark();
    $mdThemingProvider.theme('Goal', 'default')
        .primaryPalette('blue')
        .primaryPalette('pink')
        .accentPalette('orange')
        .backgroundPalette('grey');
});