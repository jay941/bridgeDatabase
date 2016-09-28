angular.module('bridgedb')
    .controller('loginCtrl', function($scope, $location, $http, $auth, loginService) {


        $scope.login = function() {

            var formData = {
                'email': this.email,
                'password': this.pwd

            }
            // loginService.login(e).then(function(result) {
            //     // alert("hi");
            //     // if (result == 'incorrect email' || result == 'not found') {
            //     //     alert('Invalid Email and Password');
            //     //     $location.path('login');
            //     // } else if (result == 'correct') {
            //     //     $location.path('profile');
            //     // }

            // });
    // Accessing the Angular $http Service to send data via REST Communication to Node Server.
   $http.post('http://localhost:8091/login', formData).success(function (data, status) {


                if (data == 'incorrect email' || data == 'not found' && status == 200) {
                    alert('Invalid Email and Password');
                    $location.path('login');
                } else if (status == 200) {
                    //passing user id to nav header
                      loginService.login(data.email);

                    $location.path('profile').search({param: data.email});;
                }
            }).catch(function (data) {
                $scope.loading = false;
                alert("internal server error");
            });
            $scope.user = '',
                $scope.password = ''
        }



    })
