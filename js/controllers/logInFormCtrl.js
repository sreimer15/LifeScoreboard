angular.module('logInFormController',[])
.controller('logInFormController', function($scope, Authentication){
  console.log(Authentication.storeUser('hello'));

  console.log(Authentication.authStorage);    
  
  $scope.validate = function() {   

    var username = $scope.user.username;
    var password = $scope.user.password;
    var retrievedObject = localStorage.getItem(username);
    console.log(retrievedObject)
    if (retrievedObject){
      console.log(JSON.parse(retrievedObject));
      if (JSON.parse(retrievedObject).password === password ){
        // show them their graph
        alert('youDidIt!')

        Authentication.authStorage = JSON.parse(retrievedObject);
        window.location.href = '/#userGraph';
      }
      else {
        alert ('incorrect password!')
      }
    }
    else {
      alert('incorrect username!')
    }
    console.log('retrievedObject: ', JSON.parse(retrievedObject).password);
  };
  



});  