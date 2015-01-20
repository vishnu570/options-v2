(function () {
    'use strict';

    angular.module('zoopApp').controller('StoreDetailCtrl', ['$stateParams', StoreDetailCtrl]);

    function StoreDetailCtrl($stateParams) {
        var vm = this;
        
        console.log("$stateParams", $stateParams);

    };
})();