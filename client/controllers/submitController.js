angular.module('MyApp').controller('submitController', function ($scope, $http,$stateParams) {
  $scope.uploadFile = function(){

      var file = $scope.myFile;
      var uploadUrl = "http://localhost:3000/fileUpload";
      var fd = new FormData();
      fd.append('file', file);
      console.log($scope.myFile);
      var data ={
        key:$stateParams.n
      };
      fd.append('key',JSON.stringify(data))
      console.log(fd);
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

    $scope.upload=function(){
    $("#fileLoader").click(function(){
      var file = $scope.myFile;
      // var uploadUrl = "http://localhost:3000/fileUpload";
      var fd = new FormData();
      fd.append('file', file);
      console.log($scope.myFile);
    } );
    console.log('hi')
    
    }
});
