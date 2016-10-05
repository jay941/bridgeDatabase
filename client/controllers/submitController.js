angular.module('MyApp').controller('submitController', function ($scope, $http) {
  $scope.uploadFile = function(){

      var file = $scope.myFile;
      var uploadUrl = "http://localhost:3000/fileUpload";
      var fd = new FormData();
      fd.append('file', file);
      console.log($scope.myFile);
      $http.post(uploadUrl,fd, {
          transformRequest: angular.identity,
          headers: {'Content-Type': undefined}
      })
      .success(function(){
        console.log("success!!");
      })
      .error(function(){
        console.log("error!!");
      });
  };

});
