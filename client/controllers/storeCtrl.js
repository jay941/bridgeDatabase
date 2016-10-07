angular.module('MyApp').controller('storeCtrl', function ($scope, $http, Upload,$stateParams) {
$scope.uploadFiles=function(files){
     $scope.files = files;
     console.log( $scope.files);

        if (files && files.length) {
            Upload.upload({
                url: 'https://angular-file-upload-cors-srv.appspot.com/upload',
                data: {
                    files: files,
                    key:$stateParams.n
                }
            }).then(function (response) {
               
                    $scope.result = response.data;
                    console.log("hii", $scope.result);
               
            });
        }

    }

})