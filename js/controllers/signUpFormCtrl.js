angular.module('signUpFormController',[])
.controller('signUpFormController', function($scope){
  $scope.master = {username: "John", password: "Doe"};

  $scope.add = function() {
    var newObject = jQuery.extend({}, $scope.user);
    newObject.happiness = [newObject.happiness];
    newObject.date = [newObject.date];
    var username = localStorage.setItem(newObject.username, JSON.stringify(newObject));
    var retrievedObject = localStorage.getItem(newObject.username);
    console.log('retrievedObject: ', JSON.parse(retrievedObject));
    alert('account created!')
  };
  

});  