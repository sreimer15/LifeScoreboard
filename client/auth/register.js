angular.module('Register', [])
.controller('RegisterController', ['$http', '$scope', function($http, $scope){
  $scope.user = {};
  $scope.register = function(user){
    $http({
      method: 'POST',
      url: '/api/register',
      data: user
    }).success(function(data){
      localStorage.setItem('loginKey', data._id);     
      window.location.href = '/';
    });
  };
}]);


