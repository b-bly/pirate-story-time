myApp.controller('NavController', function ($http, $location, $rootScope, UserService) {
    console.log('NavController created');
    let self = this;
    self.userService = UserService;
 
    // (function () {
    //     'use strict';
    //     $rootScope.$on('$routeChangeSuccess', function (event, current) {
    //         self.currentLink = getCurrentLinkFromRoute(current);
    //     });
    // });
});