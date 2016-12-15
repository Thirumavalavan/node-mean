var myApp = angular.module('myApp', []);
myApp.controller("AppCtrl", ['$scope', '$http', function($scope, $http) {

  var updateView=function(){
         $http.get('/userlist').success(function(response) {
         $scope.userlist = response; 
         $scope.user="";
        });
  };
    $scope.editUsers = function(id) {
      $http.get('/userlist/' + id).success(function(response) {
      $scope.user = response;
     });
   };
  updateView();
  
    $scope.addUsers = function() {
	console.log($scope.user);
      $http.post('/userlist', $scope.user).success(function(response) {
        updateView();
      });
    };
    
    $scope.removeUsers = function(id) {
      $http.delete('/userlist/' + id).success(function(response) {
          updateView();
      });
    };
    

    
    $scope.updateUsers = function(id) {
     console.log($scope.user._id);
     $http.put('/userlist/' + $scope.user._id, $scope.user).success(function(response) {
       updateView();
     });
    };
    
$scope.calculateAge = function(DOB) { // pass in player.dateOfBirth
    var ageDifMs = Date.now() - new Date(DOB);
    var ageDate = new Date(ageDifMs); // miliseconds from epoch
    return Math.abs(ageDate.getUTCFullYear() - 1970);
}
}]);



