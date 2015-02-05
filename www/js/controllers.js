angular.module('zoopApp.controllers', [])

// .controller('StoreCtrl', function($scope) {
  
//   console.log("in Store Controller");
//   $scope.storeslist = [
//     { name: 'Store1', id: 1 },
//     { name: 'Store2', id: 2 },
//     { name: 'Store3', id: 3 },
//     { name: 'Store4', id: 4 },
//     { name: 'Store5', id: 5 },
//     { name: 'Store6', id: 6 }
//   ];
// })

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

.controller('StoreItemsCtrl', function($scope, Items, $state) {
  
//   console.log("StoreItems Controller initialized");
  Items.selectStore($state.params.storeId);
  var storeName = Items.getSelectedStoreName();
  $scope.storeName = storeName;
  $scope.items = Items.all();
  
});
