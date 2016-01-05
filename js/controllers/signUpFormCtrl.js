angular.module('signUpFormController',[])
.controller('signUpFormController', function($scope){
  $scope.master = {firstName: "John", lastName: "Doe"};

  $scope.reset = function() {
      $scope.user = angular.copy($scope.master);
      console.log('helloman')
  };
  $scope.reset();

});  