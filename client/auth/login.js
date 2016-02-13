angular.module('Login', [])
.controller('LoginController', ['$http', '$scope', '$stateParams', '$state', function($http, $scope, $stateParams, $state){
  $scope.user = {};
  $scope.login = function(user){
    
    $http({
      method: 'POST',
      url: '/api/login', //Server should have /api/login path defined
      data: user
    }).success(function(data){
      console.log(data)
      localStorage.setItem('loginKey', data._id);
      $state.go('userGraph');
    });
  };
}]);
