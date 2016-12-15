var myApp = angular.module('myApp', []);
myApp.controller("AppCtrl", ['$scope', '$http', function($scope, $http) {

  var updateView=function(){
         $http.get('/userlist').success(function(response) {
         $scope.userlist = response; 
         $scope.users="";
        });
  };
    $scope.editUsers = function(id) {
      $http.get('/userlist/' + id).success(function(response) {
      $scope.users = response;
     });
   };
  updateView();
  
    $scope.addUsers = function() {
	console.log($scope.user);
      $http.post('/userlist', $scope.users).success(function(response) {
        updateView();
      });
    };
    
    $scope.removeUsers = function(id) {
      $http.delete('/userlist/' + id).success(function(response) {
          updateView();
      });
    };
    

    
    $scope.updateUsers = function(id) {
     console.log($scope.users._id);
     $http.put('/userlist/' + $scope.users._id, $scope.users).success(function(response) {
       updateView();
     });
    };
    
$scope.calculateAge = function(DOB) { // pass in player.dateOfBirth
    var ageDifMs = Date.now() - new Date(DOB);
    var ageDate = new Date(ageDifMs); // miliseconds from epoch
    return Math.abs(ageDate.getUTCFullYear() - 1970);
}
}]);



