var myApp = angular.module('myApp', []);
myApp.controller("AppCtrl", ['$scope', '$http', function($scope, $http) {

  var updateView=function(){
         $http.get('/users').success(function(response) {
         $scope.users = response; 
         $scope.user="";
        });
  };
    $scope.editUsers = function(id) {
      $http.get('/users/' + id).success(function(response) {
      $scope.user = response;
     });
   };
  updateView();
  
    $scope.addUsers = function() {
      $http.post('/users', $scope.users).success(function(response) {
        updateView();
      });
    };
    
    $scope.removeUsers = function(id) {
      $http.delete('/users/' + id).success(function(response) {
          updateView();
      });
    };
    

    
    $scope.updateUsers = function(id) {
     console.log($scope.users._id);
     $http.put('/users/' + $scope.users._id, $scope.users).success(function(response) {
       updateView();
     });
    };
    
$scope.calculateAge = function(DOB) { // pass in player.dateOfBirth
    var ageDifMs = Date.now() - new Date(DOB);
    var ageDate = new Date(ageDifMs); // miliseconds from epoch
    return Math.abs(ageDate.getUTCFullYear() - 1970);
}
}]);



