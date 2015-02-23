angular.module('zoopApp.controllers', [])

.controller('CardCtrl', function($scope, $ionicSwipeCardDelegate) {
  $scope.goAway = function() {
    var card = $ionicSwipeCardDelegate.getSwipeableCard($scope);
    card.swipe();
  };
})

.controller('StoreCtrl', function ($scope, Stores, $state) {
    
    console.log("Stores Controller initialized");
    $scope.stores = Stores.all();
  
    $scope.showStoreDetails = function (storeId) {
//         console.log("showStoreDetails - store id passed: "+storeId);
        $state.go('app.store-detail', {
            storeId: storeId
        });
    }
})

.controller('StoreItemsCtrl', function($scope, Items, $state, $ionicSwipeCardDelegate) {
  
//   console.log("StoreItems Controller initialized");
  Items.selectStore($state.params.storeId);
  $scope.storeName = Items.getSelectedStoreName();
  console.log("storeName : "+ $scope.storeName);

  $scope.items = Items.all();
  console.log("Items : "+Items.all());

  $scope.cardSwiped = function(index) {
    $scope.addCard();
  };

  $scope.cardDestroyed = function(index) {
    $scope.items.splice(index, 1);
  };

  $scope.addCard = function() {
    var newCard = Items.all()[Math.floor(Math.random() * Items.all().length)];
    newCard.id = Math.random();
    $scope.items.push(angular.extend({}, newCard));
  }  
});
