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
    

}])
.factory('Authentication', function(){
    var authStorage = {};
    var storeUser = function(user){
      return user;
    }

    // var getStorageFromUserName = function(user){
    //     var retrievedObject = localStorage.getItem(user);
    //     var parsedObject = JSON.parse(retrievedObject);
    //     var userDate = parsedObject.date;
    //     var userHappiness = parsedObject.happiness;

    //     userDate.push($scope.entry.date);
    //     userHappiness.push($scope.entry.happiness);

    //     localStorage.setItem('testing', JSON.stringify(parsedObject));
    //     var logging = localStorage.getItem('testing');
    //     console.log('retrievedObject: ', JSON.parse(logging));      

    // };

    return {
      storeUser: storeUser,
      authStorage: authStorage
    }

  });



  