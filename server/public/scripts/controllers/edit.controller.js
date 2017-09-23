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

// red
// pink
// purple
// deep-purple
// indigo
// blue
// light-blue
// cyan
// teal
// green
// light-green
// lime
// yellow
// amber
// orange
// deep-orange
// brown
// grey
// blue-grey