myApp.controller('StoryController', function($http, UserService, CardService) {
    var self = this;
    self.userService = UserService;
    self.cardService = CardService;
    self.userObject = UserService.userObject;
    // self.types = ['Villain', 'Environment', 'Item', 'Creature', 'Goal'];
    self.cards = CardService.cards;
    self.usersCards = CardService.storyCards;
    

});