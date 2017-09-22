var myApp = angular.module('myApp', ['ngRoute', 'ngMaterial']);


/// Routes ///
myApp.config(function ($routeProvider, $locationProvider) {
  $locationProvider.hashPrefix('');
  // console.log('myApp -- config');
  $routeProvider
    .when('/login', {
      templateUrl: '/views/templates/logIn.html',
      controller: 'LoginController as lc',
      resolve: {
        getuser: function (UserService) {
          return UserService.getuser();
        }
      }
    })
    .when('/register', {
      templateUrl: '/views/templates/register.html',
      controller: 'LoginController as lc'
    })
    .when('/about', {
      templateUrl: '/views/templates/about.html',
      controller: 'AboutController as ac',
      resolve: {
        getuser: function (UserService) {
          return UserService.getuser();
        }
      }
    })
    .when('/settings', {
      templateUrl: '/views/templates/settings.html',
      controller: 'UserController as vm',
      resolve: {
        getuser: function (UserService) {
          return UserService.getuser();
        }
      }
    })
    .when('/add', {
      templateUrl: '/views/templates/add.html',
      controller: 'CardController as cc',
      resolve: {
        getuser: function (UserService) {
          return UserService.getuser();
        }
      }
    })
    .when('/edit', {
      templateUrl: '/views/templates/edit.html',
      controller: 'EditController as vm',
      resolve: {
        getuser: function (UserService) {
          return UserService.getuser();
        },
        getUsersCards: function (CardService) {
          return CardService.getUsersCards();
        }
      }
    })
    .when('/story', {
      templateUrl: '/views/templates/story.html',
      controller: 'StoryController as vm',
      resolve: {
        getuser: function (UserService) {
          return UserService.getuser();
        },
        getCards: function (CardService) {
          return CardService.getStoryCards();
        }
      }
    })

    .otherwise({
      redirectTo: 'story'
    });
});
