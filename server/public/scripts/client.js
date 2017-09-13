var myApp = angular.module('myApp', ['ngRoute', 'ngMaterial']);


/// Routes ///
myApp.config(function($routeProvider, $locationProvider) {
  $locationProvider.hashPrefix('');
  console.log('myApp -- config')
  $routeProvider
  .when('/login', {
    templateUrl: '/views/templates/logIn.html',
    controller: 'LoginController as lc',
    resolve: {
      getuser : function(UserService) {
        return UserService.getuser();
      }
    }
  })
    .when('/register', {
      templateUrl: '/views/templates/register.html',
      controller: 'LoginController as lc'
    })
    .when('/user', {
      templateUrl: '/views/templates/user.html',
      controller: 'UserController as uc',
      resolve: {
        getuser : function(UserService) {
          return UserService.getuser();
        }
      }
    })
    .when('/about', {
      templateUrl: '/views/templates/about.html',
      controller: 'AboutController as ac',
      resolve: {
        getuser : function(UserService){
          return UserService.getuser();
        }
      }
    })
    .when('/settings', {
      templateUrl: '/views/templates/settings.html',
      controller: 'UserController as uc',
      resolve: {
        getuser : function(UserService){
          return UserService.getuser();
        }
      }
    })    
    .when('/addacard', {
      templateUrl: '/views/templates/addACard.html',
      controller: 'CardController as cc',
      resolve: {
        getuser : function(UserService){
          return UserService.getuser();
        }
      }
    })
    .when('/edit', {
      templateUrl: '/views/templates/edit.html',
      controller: 'EditController as vm',
      resolve: {
        getuser : function(UserService){
          return UserService.getuser();
        },
        getCards : function(CardService){
          return CardService.getCards();
        }
      }
    })
    .otherwise({
      redirectTo: 'home'
    });
});
