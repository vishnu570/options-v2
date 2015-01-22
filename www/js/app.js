angular.module("zoopApp", ["ionic", "zoopApp.controllers"])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
 //   if(window.cordova && window.cordova.plugins.Keyboard) {
 //     cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
 //   }
    if(window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider
  
   .state('app', {
      abstract: true,
      url: "/app",
      templateUrl: "app/layout/menu-layout.html",
      controller: 'AppCtrl'
    })

   .state('app.stores', {
      url: "/stores",
      views: {
        "mainContent": {
          templateUrl: "app/stores/stores.html",
          controller: 'StoreCtrl'
        }
      }
    })

  .state('app.favorites', {
      url: "/favorites",
      views: {
        'mainContent': {
          templateUrl: "app/favorites.html"
        }
      }
    })

    .state('app.settings', {
      url: "/settings",
      views: {
        'mainContent': {
          templateUrl: "app/settings.html"
        }
      }
    })
  
    .state('app.store-detail', {
      url: "/stores/:id",
      views: {
        'mainContent': {
          templateUrl: "app/stores/store-detail.html",
          controller: 'StoreCtrl'
        }
      }
    });

    // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/stores');
});