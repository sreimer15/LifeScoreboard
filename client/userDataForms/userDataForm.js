angular.module('userDataForm', [])
.controller('userDataFormController', ['$http', '$scope', function($http, $scope){
  $scope.user = {};
  //Need to make Other actually mean something
  $scope.genderChoices = ['Female','Male','Transgender','Prefer Not to Say', 'Other'];
  $scope.occupation = ['Student','Tech','Finance','Non-Profit', 'Medicine', 'Unemployed','Other'];

  // actually post this to /api/demographics

  $scope.addToDataBase = function(user){
    $http({
      method: 'POST',
      url: '/api/demographics', 
      data: user
    }).success(function(data){
      localStorage.setItem('loginKey', data._id);
      window.location.href = '/userGraphController';
    });
  };

   var slider = document.getElementById('range-input');
    noUiSlider.create(slider, {
     start: [0, 80],
     connect: true,
     step: 1,
     range: {
       'min': 0,
       'max': 100
     },
     format: wNumb({
       decimals: 0
     })
    });


}]);
