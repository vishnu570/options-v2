// Zoop App

var firebaseUrl = "https://sizzling-heat-2737.firebaseio.com";

// function onDeviceReady() {
//     angular.bootstrap(document, ["zoopApp"]);
// }
// //console.log("binding device ready");
// // Registering onDeviceReady callback with deviceready event
// document.addEventListener("deviceready", onDeviceReady, false);

angular.module('zoopApp', ['ionic', 'zoopApp.controllers', 'zoopApp.services', 'firebase'])

.run(function ($ionicPlatform, $rootScope, $ionicLoading) {
  
  console.log("inside run method");
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    
    if(window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
    
    $rootScope.firebaseUrl = firebaseUrl;
          
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  console.log("setting config");
  $stateProvider
  
   .state('app', {
      abstract: true,
      url: '/app',
      templateUrl: 'app/layout/menu-layout.html'
    })

   .state('app.favorites', {
      url: '/favorites',
      views: {
        'mainContent': {
          templateUrl: 'app/favorites.html'
        }
      }
    })

    .state('app.settings', {
      url: '/settings',
      views: {
        'mainContent': {
          templateUrl: 'app/settings.html'
        }
      }
    })
    
    .state('app.stores', {
      url: '/stores',
      views: {
        'mainContent': {
          templateUrl: 'app/stores/stores.html',
          controller: 'StoreCtrl'
        }
      }
    })
  
    .state('app.store-detail', {
      url: '/stores/:storeId',
      views: {
        'mainContent': {
          templateUrl: 'app/stores/store-detail.html',
          controller: 'StoreItemsCtrl'
        }
      }
    });

    // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/stores');
});