angular.module('HealthDiaryApp', ['defaultPageController', 'logInFormController', 'signUpFormController', 'userGraphController', 'ngRoute'])

.config( ['$routeProvider', function($routeProvider){
  $routeProvider
  .when('/', {
    templateUrl: 'views/mainGraph.html',
    controller: 'defaultPageController'
  })
  .when('/signUpForm', {
    templateUrl: 'views/signUpForm.html',
    controller: 'signUpFormController'
  })
  .when('/logInForm', {
    templateUrl: 'views/logInForm.html',
    controller: 'logInFormController'
  })
  .when('/userGraph', {
    templateUrl: 'views/userGraph.html',
    controller: 'userGraphController'
  })
}]);


  