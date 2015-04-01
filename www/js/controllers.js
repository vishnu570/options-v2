var ref = new Firebase(firebaseUrl);
angular.module('zoopApp.controllers', [])
// .controller('CardCtrl', function($scope, $ionicSwipeCardDelegate) {
//   $scope.goAway = function() {
//     var card = $ionicSwipeCardDelegate.getSwipeableCard($scope);
//     card.swipe();
//   };
// })
.controller("SignInCtrl", function($scope, $firebaseAuth, $state) {
  var isNewUser = false;
  // find a suitable name based on the meta info given by each provider

  function getName(authData) {
    switch(authData.provider) {
      case 'password':
        return authData.password.email.replace(/@.*/, '');
      case 'twitter':
        return authData.twitter.displayName;
      case 'facebook':
        return authData.facebook.displayName;
    }
  }
  // Create a callback to handle the result of the authentication

  function authHandler(error, authData) {
    if(error) {
      console.log("Login Failed!", error);
    } else {
      console.log("Authenticated successfully with payload:" + authData.uid);
      $state.go('app.stores');
    }
  }
  // Register the callback to be fired every time auth state changes
  ref.onAuth(function(authData) {
    if(authData && isNewUser) {
      console.log("New User is logged in");
      // save the user's profile into Firebase so we can list users,
      // use them in Security and Firebase Rules, and show profiles
      ref.child("users").child(authData.uid).set({
        provider: authData.provider,
        name: getName(authData),
        favorites: []
      });
    } else if(authData) {
      console.log("Existing User is logged in");
    } else {
      console.log("User is logged out");
    }
  });
  $scope.login = function(username, password) {
    // Authenticate with an email/password combination
    console.log("User login : " + username);
    isNewUser = false;
    ref.authWithPassword({
      email: username,
      password: password
    }, authHandler);    
  }
  $scope.register = function(username, password) {
    console.log("User register : " + username);
    ref.createUser({
      email: username,
      password: password
    }, function(error, userData) {
      if(error) {
        switch(error.code) {
          case "EMAIL_TAKEN":
            console.log("The new user account cannot be created because the email is already in use.");
            break;
          case "INVALID_EMAIL":
            console.log("The specified email is not a valid email.");
            break;
          default:
            console.log("Error creating user:", error);
        }
      } else {
        console.log("Successfully created user account with uid:", userData.uid);
        isNewUser = true;
        ref.authWithPassword({
          email: username,
          password: password
        }, authHandler);
      }
    })
  }  
  
}).controller('StoreCtrl', function($scope, Stores, $state) {
  console.log("Stores Controller initialized");
  $scope.stores = Stores.all();
  $scope.showStoreDetails = function(storeId) {
    //         console.log("showStoreDetails - store id passed: "+storeId);
    $state.go('app.store-detail', {
      storeId: storeId
    });
  }
}).controller('StoreItemsCtrl', function($scope, Items, $state) {
  //   console.log("StoreItems Controller initialized");
  Items.selectStore($state.params.storeId);
  $scope.storeName = Items.getSelectedStoreName();
  $scope.items = Items.all();
  $scope.clearSearch = function() {
    $scope.search = '';
  };
  $scope.addfavorites = function(item) {
    //     alert('Item added to fav : ' + item.$id + " , "+ item.productName);
    Items.addFavorite(item.$id);
// 		$state.go('app.favorites');
  };

  // Slider code starts
  $scope.slider = {};
  $scope.slider.rangeValue = 0;

  $scope.rangeFilter = function(item) {
        return (item.discount >= $scope.slider.rangeValue);
  }
	
	$scope.startSliderCalculation = function(event){
		var x = event.clientX;
    var y = event.clientY;
	
	  $scope.$watch('slider.rangeValue',function(val,old){
	     $scope.slider.rangeValue = parseInt(val);
      //alert(val);
    });
    
	  $scope.left = (x + 82) + "px";
    $scope.hovered = true;
		$scope.isMouseDown = true;
  }
  
  $scope.calculateLeftPosition = function(event, isMouseDown){
    if(isMouseDown == true)
    {
      var x = event.clientX;
      $scope.left = (x + 82) + "px";
    }
  }
  
  $scope.mouseReleased = function()
  {
	  $scope.isMouseDown = false;
  }  
  //   $scope.cardSwiped = function(index) {
  //     $scope.addCard();
  //   };
  //   $scope.cardDestroyed = function(index) {
  //     $scope.items.splice(index, 1);
  //   };
  //   $scope.addCard = function() {
  //     var newCard = Items.all()[Math.floor(Math.random() * Items.all().length)];
  //     newCard.id = Math.random();
  //     $scope.items.push(angular.extend({}, newCard));
  //   }  
}).controller('FavoritesCtrl', function($scope, Items, $state) {
   
	console.log("FavoritesCtrl Controller initialized");
	Items.getFavorites();
  $scope.favList = Items.favList();
  
  $scope.removefavorites = function(item, index) {
    //     alert('Item added to fav : ' + item.$id + " , "+ item.productName);
    Items.removeFavorite(item.$id);
		$scope.favList.splice(index, 1);
  };
});