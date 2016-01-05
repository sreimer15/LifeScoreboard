angular.module('signUpFormController',[])
.controller('signUpFormController', function($scope){
  $scope.master = {username: "John", password: "Doe"};

  $scope.add = function() {
    var username =
    localStorage.setItem($scope.user.username, JSON.stringify($scope.user));
    var retrievedObject = localStorage.getItem($scope.user.username);
    console.log('retrievedObject: ', JSON.parse(retrievedObject));
  };
  

});  