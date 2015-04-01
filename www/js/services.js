/**
 * Created with options.
 * User: vishnu570
 * Date: 2015-02-04
 * Time: 12:48 PM
 * To change this template use Tools | Templates.
 */
var ref = new Firebase(firebaseUrl);
angular.module('zoopApp.services', ['firebase'])
/**
 * Simple Service which returns Stores collection as Array & binds to the Scope in Controller
 */
.factory('Stores', function($firebase) {
  // console.log("Stores Factory initialized");
  // Might use a resource here that returns a JSON array
  var stores = $firebase(ref.child('stores')).$asArray();
  return {
    all: function() {
      return stores;
    },
    get: function(storeId) {
      // Simple index lookup
      return stores.$getRecord(storeId);
    }
  }
}).factory('Items', function($firebase, Stores) {
  // console.log("Items Factory initialized");
  var selectedStoreId;
  var storesRef = ref.child('stores');
  var productsRef = ref.child('products');
  var items;
  var favList;
  return {
    all: function() {
      return items;
    },
    favList: function() {
			console.log("favlist : "+favList);
      return favList;
    },
    getSelectedStoreName: function() {
      var selectedStore;
      if(selectedStoreId && selectedStoreId != null) {
        selectedStore = Stores.get(selectedStoreId);
        if(selectedStore) return selectedStore.name;
        else return null;
      } else return null;
    },
    selectStore: function(storeId) {
      selectedStoreId = storeId;
      items = [];
      var productStoresRef = storesRef.child(selectedStoreId).child("products");
      // if(!isNaN(storeId)) {
      if(storeId) {
        // items = $firebase(ref.child('stores').child(selectedStoreId).child('items')).$asArray();
        productStoresRef.on("value", function(snap) {
          snap.forEach(function(data) {
            //                 console.log("The Key is : " + data.key());
            items.push($firebase(productsRef.child(data.key())).$asObject());
          });
        });
      }
    },
    getFavorites: function() {
      favList = [];
      var authData = ref.getAuth();
      var favoritesRef = ref.child('users').child(authData.uid).child('favorites');
      if(authData.uid) {
        favoritesRef.once("value", function(snap) {
          snap.forEach(function(data) {
            console.log("The Key is : " + data.key());
            favList.push($firebase(productsRef.child(data.key())).$asObject());
          });
        });
      }
    },
    addFavorite: function(itemId) {
      var authData = ref.getAuth();
      var favoritesRef = ref.child('users').child(authData.uid).child('favorites');
      favoritesRef.child(itemId).set(true);
      console.log("added to favorites : " + authData.uid + " , " + itemId);
			if(!favList) {
				favList = [];
			}
			favList.push($firebase(productsRef.child(itemId)).$asObject());
    },
    removeFavorite: function(itemId) {
      var authData = ref.getAuth();
      var favoritesRef = ref.child('users').child(authData.uid).child('favorites');
      favoritesRef.child(itemId).remove();
      console.log("removed from favorites : " + authData.uid + " , " + itemId);
    }
  }
})