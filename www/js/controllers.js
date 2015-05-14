angular.module('starter.controllers', ['ionic', 'base64', 'ngCordova'])


.controller('AppCtrl', function($scope, $ionicModal, $timeout, $http, $rootScope, Auth, $base64) {
  // Form data for the login modal
  $scope.user = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    $http.defaults.headers.common = {"Access-Control-Request-Headers": "accept, origin, authorization"}; //you probably don't need this line.  This lets me connect to my server on a different domain
    $http.defaults.headers.common.Authorization = 'Basic ' + $base64.encode($scope.user.email + ':' + $scope.user.password);
    $http.get('https://api.eet.nu/account')
      .success(function(data, status, headers, config) {
          $rootScope.currentUser = data;
          Auth.setCurrentUser(data);

          $scope.closeLogin();

      })
      .error(function(data, status, headers, config) {
          alert("There was a problem when logging in!");
      });    
  };

  $scope.logout = function(){
    delete $rootScope.currentUser;
    Auth.unsetCurrentUser();
  };
})

.controller('HomeCtrl', function($scope, $cordovaInAppBrowser) {
  $scope.hello = "hello world";

  $scope.openUrl = function(){
    var options = {};

    $cordovaInAppBrowser.open('http://www.google.nl', '_system', options);

  };
})

.controller('ProfileCtrl', function($scope, $cordovaInAppBrowser, $window, $http, $rootScope, Auth, $base64) {
  $scope.mailTo = function(){
    var link = "mailto:" + $rootScope.currentUser.email;

    $window.location.href=link;
  };

  $scope.openUrl = function(){
    var options = {};

    $cordovaInAppBrowser.open($rootScope.currentUser.website_url, '_system', options);

  };

  $scope.refreshUser = function(){
    var user = $rootScope.currentUser;

    $http.defaults.headers.common.Authorization = 'Basic ' + $base64.encode(user.email + ':' + user.password);
    $http.get('https://api.eet.nu/account')
      .success(function(data, status, headers, config) {
          $rootScope.currentUser = data;
          Auth.setCurrentUser(data);
      })
      .error(function(data, status, headers, config) {
          alert("There was a problem when fetching user data!");
      });
  };
})

.controller('FavoritesCtrl', function($scope, Favorites, $stateParams) {
  $scope.loadFavorites = function(){
    Favorites.query({
      id: $stateParams.userId
    }, function(favorites){
      $scope.favorites = favorites;
    });
  }
})

.controller('UsersCtrl', function($scope, $stateParams, Users, LocalStorage) {
  $scope.loadUsers = function(){
    Users.query(function(users){
      LocalStorage.setObject('users', users);
      $scope.users = users;
    });
  };

  $scope.loadUser = function(){
    Users.get({
      id: $stateParams.userId
    }, function(user){
      $scope.singleUser = user;
    })
  };
})

.controller('VenuesCtrl', function($scope, $rootScope, $stateParams, Venues, LocalStorage, $ionicPlatform, $cordovaGeolocation, $window, $cordovaInAppBrowser) {
  $scope.venues = [];
  $scope.loading = false;

  $scope.openMap = function(venue) {
    var url = "geo:" + venue.geolocation.latitude + "," + venue.geolocation.longitude;

    $window.location.href=url;
  };

  $scope.openTel = function(tel){
    var tel = "tel:" + tel;

    $window.location.href=tel;
  }

  $scope.openUrl = function(url){
    var options = {};

    $cordovaInAppBrowser.open(url, '_system', options);
  };

  $scope.searchVenues = function(search){
    $scope.loading = true;
    $scope.venues = [];

    if($scope.useGeolocation){

      $ionicPlatform.ready(function() {
        var posOptions = {timeout: 10000, enableHighAccuracy: false};
        $cordovaGeolocation
          .getCurrentPosition(posOptions)
          .then(function (position) {
              var latitude  = position.coords.latitude;
              var longitude = position.coords.longitude;


              Venues.get({
                query: search,
                max_distance: 5000,
                geolocation: latitude+','+longitude
              }, function(venues){
                $scope.venues = venues;
                $scope.loading = false;
              });
          }, function(err){
            $scope.loading=false;
            $scope.error = "Unable to find venues within 5000 meters"
          });
      });
    }else{

      Venues.get({
        query: search
      }, function(venues){
        $scope.venues = venues;
        $scope.loading = false;
      });
    }

  }

  $scope.loadVenues = function(){
    $scope.loading = true;
    Venues.query(function(venues){
      $scope.venues = venues;
      $scope.loading = false;
    });
  };

  $scope.loadVenue = function(){
    Venues.get({
      id: $stateParams.venueId
    }, function(venue){
      $scope.singleVenue = venue;
    })
  };

  $scope.useGeolocation = false;
  $scope.toggleGeolocation = function(){
    $scope.useGeolocation = $scope.useGeolocation ? false : true
  };

})

.controller('VenueReviewsCtrl', function($scope, $stateParams, VenueReview) {
  $scope.loading = false;
  $scope.error = false;
  $scope.loadReviews = function(){
    $scope.loading = true;
    VenueReview.get({
      id: $stateParams.venueId
    },function(reviews){
      $scope.reviews = reviews;
      $scope.loading = false;
    }, function(error){
      $scope.error = true;
    });
  };
})

.controller('ReviewsCtrl', function($scope, $stateParams, Review) {
  $scope.loading = false;
  $scope.error = false;
  $scope.loadReviews = function(){
    $scope.loading = true;
    Review.get({
      id: $stateParams.userId
    },function(reviews){
      $scope.reviews = reviews;
      $scope.loading = false;
    }, function(error){
      $scope.error = true;
    });
  };
});

