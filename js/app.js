angular.module('HealthDiaryApp', ['defaultPageController', 'logInFormController', 'signUpFormController', 'ngRoute'])

.config( ['$routeProvider', function($routeProvider){
  $routeProvider
  .when('views/signUpForm', {
    templateUrl: 'views/signUpForm.html',
    controller: 'signUpFormController'
  })
  .when('views/logInForm', {
    templateUrl: 'views/logInForm.html',
    controller: 'logInFormController'
  })
}]);


  