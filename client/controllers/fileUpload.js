
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
        .controller('fupController', function ($scope, $http) {

            var formdata = new FormData();
            $scope.getTheFiles = function ($files) {
              console.log($files);
                angular.forEach($files, function (value, key) {
                    formdata.append(value,key);
                });
            };

            // NOW UPLOAD THE FILES.
            $scope.uploadFiles = function () {

                // var request = {
                //     method: 'POST',
                //     url: 'http://localhost:3000/fileUpload',
                //     data: formdata,
                //     headers: {
                //         'Content-Type': undefined
                //     }
                // };
                $http.post('http://localhost:3000/fileUpload',formdata)
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
