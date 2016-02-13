angular.module('HealthDiaryApp', [
  'defaultPageController', 
  'userGraphController', 
  'ui.router',
  'userDataForm',
  'Login',
  'HandleRequests',
  'Logout',
  'Register'])

.config( function($stateProvider, $urlRouterProvider, $httpProvider){
  $urlRouterProvider.otherwise('/');
  $stateProvider
    .state('main', {
      url: '/',
      templateUrl: 'views/mainGraph.html',
      controller: 'defaultPageController'
    })
    .state('register', {
      url: '/register',
      templateUrl: 'auth/register.html',
      controller: 'RegisterController'
    })
  .state('login', {
    url: '/login',
    templateUrl: 'auth/login.html',
    controller: 'LoginController'
  })
  .state('logout', {
    url: '/api/logout',
    templateUrl: 'auth/logout.html',
    controller: 'LogoutController'
  })
  .state('userGraph', {
    url: '/userGraphController',
    templateUrl: 'views/userGraph.html',
    controller: 'userGraphController'
  })
  .state('userDataForm', {
    url: '/userDataForm',
    templateUrl: 'userDataForms/userDataForm.html',
    controller: 'userDataFormController'
  })
    

})
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



  