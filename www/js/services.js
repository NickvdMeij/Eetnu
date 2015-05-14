angular.module('starter.services', ['ngResource'])

.factory('Auth', function($window){
    var prefix = "eetNuAuth."
    return {
        getCurrentUser: function(){
            return $window.localStorage[prefix+'currentUser'] ? JSON.parse($window.localStorage[prefix + 'currentUser']) : undefined;
        },
        setCurrentUser: function(user){
            $window.localStorage[prefix + 'currentUser'] = JSON.stringify(user);
        },
        unsetCurrentUser: function(){
            delete $window.localStorage[prefix + 'currentUser'];
        }
    }
})

.factory('LocalStorage', function($window) {
    var prefix = "eetNuApp.";
  return {
    set: function(key, value) {
      $window.localStorage[prefix + key] = value;
    },
    get: function(key, defaultValue) {
      return $window.localStorage[prefix + key] || defaultValue;
    },
    setObject: function(key, value) {
      $window.localStorage[prefix + key] = JSON.stringify(value);
    },
    getObject: function(key) {
      return JSON.parse($window.localStorage[prefix + key] || '{}');
    }
  }
})

.factory('Venues', function($resource) {
    return $resource('https://api.eet.nu/venues/:id', {
        id: '@_id'
    },{
        query: {isArray: false}
    })
})

.factory('Users', function($resource) {
    return $resource('https://api.eet.nu/users/:id', {
        id: '@_id'
    },{
        query: {isArray: false}
    });
})

.factory('Favorites', function($resource){
    return $resource('https://api.eet.nu/users/:id/favourites', {
        id: '@id'
    },{
        query: {isArray:false}
    });
})

.factory('VenueReview', function($resource){
    return $resource('https://api.eet.nu/venues/:id/reviews', {
        id: '@id'
    },{
        query: {
            isArray: false
        }
    });
})

.factory('Review', function($resource){
    return $resource('https://api.eet.nu/users/:id/reviews', {
        id: '@id'
    },{
        query: {
            isArray: false
        }
    });
});