angular.module('bridgedb')
    .controller('signupCtrl', function($scope, $location, $http) {

        $scope.signup = function() {
            var formData = {
                    'email': this.email,
                    'password': this.pwd
                }
                // Accessing the Angular $http Service to send data via REST Communication to Node Server.
            $http.post('http://localhost:8091/signup', formData).success(function(data, status) {
                console.log(data)
                if (data == 'incorrect email or password' && status == 200) {
                    $location.path('signup');
                } else if (data == 'successfully upload' && status == 200) {
                    console.log(data);
                    $location.path('login');
                }
            }).catch(function(data) {
                $scope.loading = false;
                alert("internal server error");
            });
        }
    })
