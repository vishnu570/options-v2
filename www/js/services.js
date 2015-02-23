/**
 * Created with options.
 * User: vishnu570
 * Date: 2015-02-04
 * Time: 12:48 PM
 * To change this template use Tools | Templates.
 */
angular.module('zoopApp.services', ['firebase'])
/**
 * Simple Service which returns Stores collection as Array & binds to the Scope in Controller
 */
.factory('Stores', function($firebase) {
  // console.log("Stores Factory initialized");
  // Might use a resource here that returns a JSON array
  var ref = new Firebase(firebaseUrl);
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
  var ref = new Firebase(firebaseUrl);

  var storesRef = ref.child('stores');
  var productsRef =  ref.child('products');

  var items;
  return {
    all: function() {
      return items;
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
      if (storeId) {
        // items = $firebase(ref.child('stores').child(selectedStoreId).child('items')).$asArray();
          productStoresRef.on("value", function(snap) {
              snap.forEach(function(data) {
                console.log("The Key is : " + data.key());
                items.push($firebase(productsRef.child(data.key())).$asObject());
              });
          });
      }
    }
  }
})