// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])

.run(function(Auth, $rootScope){
  $rootScope.currentUser = Auth.getCurrentUser();
})

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('app', {
    abstract: true,
    controller: 'AppCtrl',
    templateUrl: "templates/menu.html"
  })

  .state('app.home', {
    url: "/home",
    views: {
      'menuContent': {
        templateUrl: "templates/home.html",
        controller: "HomeCtrl"
      }
    }
  })

  .state('app.profile', {
    url: "/profile",
    views: {
      'menuContent': {
        templateUrl: "templates/profile.html",
        controller: "ProfileCtrl"
      }
    }
  })

  .state('app.venues', {
    url: '/venues',
    views: {
      'menuContent': {
        templateUrl: "templates/venues.html",
        controller: "VenuesCtrl"
      }
    }      
  })

  .state('app.venue', {
    url: '/venues/:venueId',
    views: {
      'menuContent': {
        templateUrl: "templates/venue.html",
        controller: "VenuesCtrl"
      }
    }      
  })

  .state('app.venuereviews', {
    url: "/venues/:venueId/reviews",
    views: {
      'menuContent': {
        templateUrl: "templates/venue-reviews.html",
        controller: "VenueReviewsCtrl"
      }
    }
  })

  .state('app.users', {
    url: '/users',
    views: {
      'menuContent': {
        templateUrl: "templates/users.html",
        controller: "UsersCtrl"
      }
    }      
  })

  .state('app.user', {
    url: '/users/:userId',
    views: {
      'menuContent': {
        templateUrl: "templates/user.html",
        controller: "UsersCtrl"
      }
    }
  })

  .state('app.favorites', {
    url: "/users/:userId/favorites",
    views: {
      'menuContent': {
        templateUrl: "templates/user-favorites.html",
        controller: "FavoritesCtrl"
      }
    }
  })

  .state('app.reviews', {
    url: "/users/:userId/reviews",
    views: {
      'menuContent': {
        templateUrl: "templates/user-reviews.html",
        controller: "ReviewsCtrl"
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/home');
});
