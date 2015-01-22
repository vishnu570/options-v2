angular.module('zoopApp.controllers', [])

.controller('AppCtrl', function($scope) {
})

.controller('StoreCtrl', function($scope) {
  $scope.stores = [
    { title: 'Store1', id: 1 },
    { title: 'Store2', id: 2 },
    { title: 'Store3', id: 3 },
    { title: 'Store4', id: 4 },
    { title: 'Store5', id: 5 },
    { title: 'Store6', id: 6 }
  ];
})