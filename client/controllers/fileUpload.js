
    angular.module('MyApp')
        .directive('ngFiles', ['$parse', function ($parse) {
            function fn_link(scope, element, attrs) {
                var onChange = $parse(attrs.ngFiles);
                element.on('change', function (event) {
                    onChange(scope, { $files: event.target.files });
                });
            };
            return {
                link: fn_link
            }
        } ])
        .controller('fupController', function ($scope, $http,$stateParams) {
          $scope.param=$stateParams.param;
           $scope.n=$stateParams.n;
           console.log($scope.param,$scope.n)


            var formdata = new FormData()          //var formdata = {};
            $scope.getTheFiles = function ($files) {
              console.log($files);

                angular.forEach($files, function (value, key) {
                  formdata.file = value;
                });
            };
            var data ={file: formdata.file }
            // NOW UPLOAD THE FILES.
            $scope.uploadFiles = function () {
                //console.log(JSON.parse(formdata.file));
                // var request = {
                //     method: 'POST',
                //     url: 'http://localhost:3000/fileUpload',
                //     data: {
                //        key: $stateParams.n,
                //        file: "Kim",
                  //      status: "Best Friend"
                //    }
                //     headers: {
                //         'Content-Type': undefined
                //     }
                // };
                $http.post('http://localhost:3000/fileUpload',data)
                .success(function (d) {
                    alert(d);
                })
                .error(function () {
                });
                // SEND THE FILES.
                // $http(request)
                //     .success(function (d) {
                //         alert(d);
                //     })
                //     .error(function () {
                //     });
            }
        });
